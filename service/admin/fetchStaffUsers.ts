import supabase from "@/lib/supabase";

export interface StaffUserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export async function fetchStaffUsers(): Promise<{
  data: StaffUserRow[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("users")
    .select("id, first_name, last_name, email, role")
    .neq("role", "user")
    .order("first_name", { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: (data ?? []) as StaffUserRow[], error: null };
}
