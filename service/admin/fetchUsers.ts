import supabase from "@/lib/supabase";
import type { UserRow } from "@/context/adminData";
import { buildApplicationCountMap } from "@/utils/admin/userApplications";

const USER_COLUMNS =
  "id, first_name, last_name, email, gender, education_level, field_of_study, interest, role, created_at";

export async function fetchAllUsers(): Promise<{ data: UserRow[]; error: string | null }> {
  const [usersResult, applicationsResult] = await Promise.all([
    supabase.from("users").select(USER_COLUMNS).neq("role", "admin").order("first_name", { ascending: true }),
    supabase.from("applied_scholarships").select("user_id"),
  ]);

  const error = usersResult.error?.message ?? applicationsResult.error?.message ?? null;
  if (error) return { data: [], error };

  const applicationCounts = buildApplicationCountMap(applicationsResult.data ?? []);

  const data = (usersResult.data ?? []).map((user) => ({
    ...user,
    applied_count: applicationCounts.get(user.id) ?? 0,
  })) as UserRow[];

  return { data, error: null };
}
