import { NextRequest, NextResponse } from "next/server";
import type { Role } from "@/lib/types/auth";
import { buildUserRegistrationMetadata } from "@/lib/userRegistration";
import { canCreateStaff, getSessionFromRequest } from "@/lib/server/adminSession";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/server/supabaseAdmin";

type StaffUpdateAction = "activate" | "deactivate" | "promote_to_admin";

interface UpdateStaffBody {
  userId?: string;
  action?: StaffUpdateAction;
}

interface StaffTargetRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  is_active: boolean;
}

export async function PATCH(request: NextRequest) {
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!canCreateStaff(session.role)) {
    return NextResponse.json({ error: "Only admins can manage staff accounts." }, { status: 403 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Server is missing SUPABASE_SERVICE_ROLE_KEY." },
      { status: 500 }
    );
  }

  let body: UpdateStaffBody;
  try {
    body = (await request.json()) as UpdateStaffBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const userId = body.userId?.trim();
  const action = body.action;

  if (!userId || !action) {
    return NextResponse.json({ error: "User id and action are required." }, { status: 400 });
  }

  if (!["activate", "deactivate", "promote_to_admin"].includes(action)) {
    return NextResponse.json({ error: "Invalid staff action." }, { status: 400 });
  }

  if (userId === session.id) {
    return NextResponse.json({ error: "You cannot change your own staff account." }, { status: 400 });
  }

  try {
    const admin = getSupabaseAdmin();
    const { data: target, error: fetchError } = await admin
      .from("users")
      .select("id, first_name, last_name, email, role, is_active")
      .eq("id", userId)
      .maybeSingle();

    if (fetchError || !target) {
      return NextResponse.json({ error: "Staff member not found." }, { status: 404 });
    }

    const staff = target as StaffTargetRow;

    if (staff.role !== "verifier") {
      return NextResponse.json(
        { error: "Only verifier accounts can be activated, deactivated, or promoted." },
        { status: 400 }
      );
    }

    if (action === "deactivate") {
      if (!staff.is_active) {
        return NextResponse.json({ error: "This verifier is already deactivated." }, { status: 400 });
      }

      const { error: profileError } = await admin
        .from("users")
        .update({ is_active: false })
        .eq("id", userId);

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }

      const { error: authError } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: "876000h",
      });

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 500 });
      }

      return NextResponse.json({ userId, isActive: false, role: staff.role });
    }

    if (action === "activate") {
      if (staff.is_active) {
        return NextResponse.json({ error: "This verifier is already active." }, { status: 400 });
      }

      const { error: profileError } = await admin
        .from("users")
        .update({ is_active: true })
        .eq("id", userId);

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }

      const { error: authError } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: "none",
      });

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 500 });
      }

      return NextResponse.json({ userId, isActive: true, role: staff.role });
    }

    const metadata = buildUserRegistrationMetadata({
      firstName: staff.first_name,
      lastName: staff.last_name,
      role: "admin",
    });

    const { error: profileError } = await admin
      .from("users")
      .update({ role: "admin", is_active: true })
      .eq("id", userId);

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    const { error: authError } = await admin.auth.admin.updateUserById(userId, {
      ban_duration: "none",
      user_metadata: metadata,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    return NextResponse.json({ userId, isActive: true, role: "admin" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
