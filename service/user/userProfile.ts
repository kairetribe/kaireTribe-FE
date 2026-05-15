import supabase from "@/lib/supabase";
import type { UserProfile } from "@/lib/types/auth";

const PROFILE_SELECT =
  "id, first_name, last_name, email, gender, education_level, field_of_study, interest, scholarship_type, countries, role, created_at, updated_at";

async function getAuthenticatedUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user.id) return null;
  return data.session.user.id;
}

export async function fetchCurrentUserProfile(): Promise<{
  data: UserProfile | null;
  error: string | null;
}> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { data: null, error: "Sign in to view your profile." };

  const { data, error } = await supabase
    .from("users")
    .select(PROFILE_SELECT)
    .eq("id", userId)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  if (!data) return { data: null, error: "Profile not found." };
  return { data: data as UserProfile, error: null };
}

export interface UpdateBasicProfileInput {
  firstName: string;
  lastName: string;
  email: string;
}

export async function updateUserBasicProfile(
  input: UpdateBasicProfileInput
): Promise<{ data: UserProfile | null; error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { data: null, error: "Sign in to update your profile." };

  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();

  if (!firstName || !lastName || !email) {
    return { data: null, error: "First name, last name, and email are required." };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const currentEmail = sessionData.session?.user.email?.toLowerCase();

  if (currentEmail && email !== currentEmail) {
    const { error: authError } = await supabase.auth.updateUser({ email });
    if (authError) return { data: null, error: authError.message };
  }

  const { data, error } = await supabase
    .from("users")
    .update({ first_name: firstName, last_name: lastName, email })
    .eq("id", userId)
    .select(PROFILE_SELECT)
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as UserProfile, error: null };
}

export interface UpdateScholarshipProfileInput {
  educationLevel: string;
  fieldOfStudy: string;
  interest: string;
  scholarshipType: string;
  countries: string[];
}

export async function updateUserScholarshipProfile(
  input: UpdateScholarshipProfileInput
): Promise<{ data: UserProfile | null; error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { data: null, error: "Sign in to update your scholarship profile." };

  const { data, error } = await supabase
    .from("users")
    .update({
      education_level: input.educationLevel || null,
      field_of_study: input.fieldOfStudy || null,
      interest: input.interest || null,
      scholarship_type: input.scholarshipType || null,
      countries: input.countries,
    })
    .eq("id", userId)
    .select(PROFILE_SELECT)
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as UserProfile, error: null };
}

export async function updateUserPassword(params: {
  email: string;
  currentPassword: string;
  newPassword: string;
}): Promise<{ error: string | null }> {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: params.email.trim().toLowerCase(),
    password: params.currentPassword,
  });

  if (signInError) {
    return { error: "Current password is incorrect." };
  }

  if (params.newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  const { error } = await supabase.auth.updateUser({ password: params.newPassword });
  if (error) return { error: error.message };
  return { error: null };
}
