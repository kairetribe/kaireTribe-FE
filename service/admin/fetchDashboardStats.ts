import supabase from "@/lib/supabase";
import type { AdminDashboardStats } from "@/lib/types/adminDashboard";
import {
  buildCumulativeUserGrowth,
  buildTopScholarships,
  countUsersByGender,
  type UserCreatedRow,
} from "@/utils/admin/dashboard";

export async function fetchAdminDashboardStats(): Promise<{
  data: AdminDashboardStats | null;
  error: string | null;
}> {
  const [scholarshipsResult, usersResult, applicationsResult] = await Promise.all([
    supabase.from("scholarships").select("*", { count: "exact", head: true }),
    supabase.from("users").select("gender, created_at").neq("role", "admin"),
    supabase.from("applied_scholarships").select("scholarship_id, scholarships(name)"),
  ]);

  const error =
    scholarshipsResult.error?.message ??
    usersResult.error?.message ??
    applicationsResult.error?.message ??
    null;

  if (error) return { data: null, error };

  const users = (usersResult.data ?? []) as UserCreatedRow[];
  const { totalUsers, maleUsers, femaleUsers } = countUsersByGender(users);

  return {
    data: {
      totalScholarships: scholarshipsResult.count ?? 0,
      totalUsers,
      maleUsers,
      femaleUsers,
      userGrowth: buildCumulativeUserGrowth(users),
      topScholarships: buildTopScholarships(applicationsResult.data ?? []),
    },
    error: null,
  };
}
