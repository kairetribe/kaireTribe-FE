export type StaffUpdateAction = "activate" | "deactivate" | "promote_to_admin";

export interface UpdateStaffAccountResult {
  userId: string | null;
  isActive: boolean | null;
  role: string | null;
  error: string | null;
}

export async function updateStaffAccount(
  userId: string,
  action: StaffUpdateAction
): Promise<UpdateStaffAccountResult> {
  const response = await fetch("/api/admin/update-staff", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, action }),
  });

  let payload: {
    error?: string;
    userId?: string;
    isActive?: boolean;
    role?: string;
  } = {};

  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    return { userId: null, isActive: null, role: null, error: "Unexpected server response." };
  }

  if (!response.ok) {
    return {
      userId: null,
      isActive: null,
      role: null,
      error: payload.error ?? "Unable to update staff account.",
    };
  }

  return {
    userId: payload.userId ?? userId,
    isActive: payload.isActive ?? null,
    role: payload.role ?? null,
    error: null,
  };
}
