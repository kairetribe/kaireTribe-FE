import type { Role } from "@/lib/types/auth";

/** Metadata shape synced into public.users by sync_auth_user_to_profile */
export interface UserRegistrationMetadata {
  first_name: string;
  last_name: string;
  role: Role;
  gender: string | null;
  education_level: string | null;
  field_of_study: string | null;
  interest: string | null;
  scholarship_type: string | null;
  countries: string[];
}

export function buildUserRegistrationMetadata(params: {
  firstName: string;
  lastName: string;
  role?: Role;
}): UserRegistrationMetadata {
  return {
    first_name: params.firstName.trim(),
    last_name: params.lastName.trim(),
    role: params.role ?? "user",
    gender: null,
    education_level: null,
    field_of_study: null,
    interest: null,
    scholarship_type: null,
    countries: [],
  };
}

/** Row written to public.users for staff / registration */
export function buildUserProfileRow(params: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}) {
  return {
    id: params.id,
    email: params.email.trim().toLowerCase(),
    first_name: params.firstName.trim(),
    last_name: params.lastName.trim(),
    role: params.role,
    gender: null,
    education_level: null,
    field_of_study: null,
    interest: null,
    scholarship_type: null,
    countries: [] as string[],
  };
}
