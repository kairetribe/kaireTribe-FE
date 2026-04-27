import supabase from "@/lib/supabase";
import type { LocalSession, SignUpForm } from "@/lib/types/auth";

export interface AuthResult {
  session: LocalSession | null;
  error: string | null;
}

export function toSession(data: {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}): LocalSession {
  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    role: data.role as LocalSession["role"],
  };
}

export function splitName(fullName: string | undefined): { firstName: string; lastName: string } {
  const trimmed = (fullName ?? "").trim();
  if (!trimmed) return { firstName: "Kaire", lastName: "User" };
  const [firstName, ...rest] = trimmed.split(" ");
  return { firstName, lastName: rest.join(" ") || "User" };
}

export function mapMetaProfile(meta: Record<string, unknown>): Partial<SignUpForm> {
  return {
    gender: (meta.gender as string | undefined) ?? "Prefer not to say",
    educationLevel: (meta.education_level as string | undefined) ?? "",
    fieldOfStudy: (meta.field_of_study as string | undefined) ?? "",
    interest: (meta.interest as string | undefined) ?? "",
    scholarshipType: (meta.scholarship_type as string | undefined) ?? "",
    countries: Array.isArray(meta.countries) ? (meta.countries as string[]) : [],
  };
}

export async function ensureProfile(params: {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: Partial<SignUpForm>;
}): Promise<AuthResult> {
  const { data, error } = await supabase
    .from("users")
    .upsert({
      id: params.userId,
      first_name: params.firstName,
      last_name: params.lastName,
      email: params.email.trim().toLowerCase(),
      gender: params.profile?.gender ?? "Prefer not to say",
      education_level: params.profile?.educationLevel || null,
      field_of_study: params.profile?.fieldOfStudy || null,
      interest: params.profile?.interest || null,
      scholarship_type: params.profile?.scholarshipType || null,
      countries: params.profile?.countries ?? [],
      role: "user",
    })
    .select("id, role, email, first_name, last_name")
    .single();

  if (error || !data) {
    if (error?.message.toLowerCase().includes("row-level security")) {
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id, role, email, first_name, last_name")
        .eq("id", params.userId)
        .single();
      if (existingProfile) return { session: toSession(existingProfile), error: null };
    }
    return { session: null, error: error?.message ?? "Failed to save user profile." };
  }

  return { session: toSession(data), error: null };
}
