import { NextRequest, NextResponse } from "next/server";
import type { Role } from "@/lib/types/auth";
import {
  buildUserProfileRow,
  buildUserRegistrationMetadata,
} from "@/lib/userRegistration";
import { canCreateStaff, getSessionFromRequest } from "@/lib/server/adminSession";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/server/supabaseAdmin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STAFF_ROLES: Role[] = ["admin", "verifier"];

interface CreateStaffBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!canCreateStaff(session.role)) {
    return NextResponse.json(
      { error: "Only admins can create staff profiles." },
      { status: 403 }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Server is missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  let body: CreateStaffBody;
  try {
    body = (await request.json()) as CreateStaffBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const role = body.role;

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "First and last name are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if (!role || !STAFF_ROLES.includes(role)) {
    return NextResponse.json(
      { error: "Please select a valid staff role." },
      { status: 400 }
    );
  }

  try {
    const admin = getSupabaseAdmin();
    const metadata = buildUserRegistrationMetadata({ firstName, lastName, role });

    const { data: authData, error: authError } =
      await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: metadata,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message ?? "Unable to create auth account." },
        { status: 400 }
      );
    }

    const profileRow = buildUserProfileRow({
      id: authData.user.id,
      email,
      firstName,
      lastName,
      role,
    });

    const { error: profileError } = await admin
      .from("users")
      .upsert(profileRow, { onConflict: "id" });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({
      userId: authData.user.id,
      needsEmailVerification: false,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
