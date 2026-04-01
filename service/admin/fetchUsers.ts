import supabase  from "../../lib/supabase";
import type { UserRow } from "@/context/adminData";

export async function fetchAllUsers(): Promise<{ data: UserRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from("users")
    .select(
      "id, first_name, last_name, email, gender, education_level, field_of_study, interest, role, created_at"
    )
    .order("first_name", { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}