import supabase from "../lib/supabase";
import type { SignUpFormWithPassword, AuthServiceResponse, LocalSession } from "@/lib/types/auth";

const SESSION_KEY = "kt_session";

export async function signUpWithEmail(
  formData: SignUpFormWithPassword
): Promise<AuthServiceResponse> {
  const {
    firstName,
    lastName,
    email,
    gender,
    educationLevel,
    fieldOfStudy,
    interest,
    scholarshipType,
    countries,
  } = formData;

  const { data, error } = await supabase
    .from("users")
    .insert({
      first_name:       firstName,
      last_name:        lastName,
      email:            email,
      gender:           gender,
      education_level:  educationLevel,
      field_of_study:   fieldOfStudy,
      interest:         interest,
      scholarship_type: scholarshipType,
      countries:        countries,
      role:             "user",
    })
    .select("id, role, email, first_name, last_name")
    .single();

  if (error) return { error: error.message };

  const session: LocalSession = {
    id:        data.id,
    email:     data.email,
    firstName: data.first_name,
    lastName:  data.last_name,
    role:      data.role,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { error: null };
}

export async function signInWithEmail(
  email: string,
  _password: string
): Promise<AuthServiceResponse> {
  const { data, error } = await supabase
    .from("users")
    .select("id, role, email, first_name, last_name")
    .eq("email", email)
    .single();

  if (error || !data) {
    return { error: "No account found with that email address." };
  }

  const session: LocalSession = {
    id:        data.id,
    email:     data.email,
    firstName: data.first_name,
    lastName:  data.last_name,
    role:      data.role,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { error: null };
}

/**
 * Reads the current session from localStorage.
 */
export function getLocalSession(): LocalSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalSession;
  } catch {
    return null;
  }
}

/**
 * Clears the session from localStorage (logout).
 */
export function clearLocalSession(): void {
  localStorage.removeItem(SESSION_KEY);
}