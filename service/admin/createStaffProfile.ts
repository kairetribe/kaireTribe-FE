import type { Role } from "@/lib/types/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STAFF_ROLES: Role[] = ["admin", "verifier"];

export interface CreateStaffProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface CreateStaffProfileResult {
  error: string | null;
  needsEmailVerification: boolean;
}

export async function createStaffProfile(
  input: CreateStaffProfileInput
): Promise<CreateStaffProfileResult> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!firstName || !lastName) {
    return { error: "First and last name are required.", needsEmailVerification: false };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { error: "Please enter a valid email address.", needsEmailVerification: false };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters.", needsEmailVerification: false };
  }
  if (!STAFF_ROLES.includes(input.role)) {
    return { error: "Please select a valid staff role.", needsEmailVerification: false };
  }

  const response = await fetch("/api/admin/create-staff", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      role: input.role,
    }),
  });

  let payload: { error?: string; needsEmailVerification?: boolean } = {};
  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    return {
      error: "Unexpected server response. Please try again.",
      needsEmailVerification: false,
    };
  }

  if (!response.ok) {
    return {
      error: payload.error ?? "Unable to create staff account.",
      needsEmailVerification: false,
    };
  }

  return {
    error: null,
    needsEmailVerification: payload.needsEmailVerification ?? false,
  };
}
