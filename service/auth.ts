import supabase from "@/lib/supabase";
import type {
  SignUpForm,
  SignUpFormWithPassword,
} from "@/lib/types/auth";
import {
  ensureProfile,
  mapMetaProfile,
  splitName,
  type AuthResult,
} from "@/service/authProfile";

interface GoogleAuthResult {
  error: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_REDIRECT_PATH = "/auth/callback";

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export async function signUpWithEmail(
  formData: SignUpFormWithPassword
): Promise<AuthResult> {
  if (!isValidEmail(formData.email)) {
    return { session: null, error: "Please enter a valid email address." };
  }

  const emailRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}${DEFAULT_REDIRECT_PATH}?next=/user&flow=signup`
      : undefined;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email:    normalizeEmail(formData.email),
    password: formData.password,
    options:  {
      emailRedirectTo,
      data: {
        first_name:       formData.firstName,
        last_name:        formData.lastName,
        gender:           formData.gender,
        education_level:  formData.educationLevel,
        field_of_study:   formData.fieldOfStudy,
        interest:         formData.interest,
        scholarship_type: formData.scholarshipType,
        countries:        formData.countries,
      },
    },
  });

  if (authError || !authData.user) {
    return { session: null, error: authError?.message ?? "Unable to create account." };
  }

  if (!authData.session) {
    return {
      session: null,
      error: "An email has been sent. Please verify your email before using the app.",
    };
  }

  return ensureProfile({
    userId:    authData.user.id,
    email:     formData.email,
    firstName: formData.firstName,
    lastName:  formData.lastName,
    profile:   formData,
  });
}

export async function signInWithEmail(
  email:    string,
  password: string,
): Promise<AuthResult> {
  if (!isValidEmail(email)) return { session: null, error: "Please enter a valid email address." };
  if (!password.trim()) return { session: null, error: "Please enter your password." };

  const normalizedEmail = normalizeEmail(email);
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email:    normalizedEmail,
    password: password.trim(),
  });

  if (authError || !authData.user) {
    if (authError?.message.toLowerCase().includes("email not confirmed")) {
      return {
        session: null,
        error: "Please verify your email before signing in.",
      };
    }
    return { session: null, error: "Invalid email or password." };
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, role, email, first_name, last_name")
    .eq("id", authData.user.id)
    .single();

  if (data) {
    return {
      session: {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.role as "user" | "admin",
      },
      error: null,
    };
  }

  const meta = (authData.user.user_metadata ?? {}) as Record<string, unknown>;
  const fallback = splitName((meta.full_name as string | undefined) ?? undefined);
  const firstName =
    (meta.first_name as string | undefined) ??
    (meta.given_name as string | undefined) ??
    fallback.firstName;
  const lastName =
    (meta.last_name as string | undefined) ??
    (meta.family_name as string | undefined) ??
    fallback.lastName;

  const synced = await ensureProfile({
    userId:    authData.user.id,
    email:     authData.user.email ?? normalizedEmail,
    firstName,
    lastName,
    profile:   mapMetaProfile(meta),
  });

  if (synced.session) return synced;
  return { session: null, error: error?.message ?? "Account profile not found. Please contact support." };
}

export async function signInWithGoogle(
  redirectTo?: string
): Promise<GoogleAuthResult> {
  const computedRedirect =
    redirectTo ??
    (typeof window !== "undefined"
      ? `${window.location.origin}${DEFAULT_REDIRECT_PATH}`
      : undefined);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options:  computedRedirect ? { redirectTo: computedRedirect } : undefined,
  });

  if (error) return { error: error.message };
  return { error: null };
}

export async function finalizeGoogleAuth(
  profile?: Partial<SignUpForm>
): Promise<AuthResult> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;

  if (userError || !user || !user.email) {
    return { session: null, error: "Google authentication failed. Please try again." };
  }

  const metadata = user.user_metadata as Record<string, unknown>;
  const fallback = splitName((metadata.full_name as string | undefined) ?? undefined);
  const firstName =
    profile?.firstName?.trim() ||
    (metadata.first_name as string | undefined) ||
    (metadata.given_name as string | undefined) ||
    fallback.firstName;
  const lastName =
    profile?.lastName?.trim() ||
    (metadata.last_name as string | undefined) ||
    (metadata.family_name as string | undefined) ||
    fallback.lastName;

  return ensureProfile({
    userId:    user.id,
    email:     user.email,
    firstName,
    lastName,
    profile:   profile ?? mapMetaProfile(metadata),
  });
}