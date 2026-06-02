import supabase from "@/lib/supabase";
import type { WaitlistEntry } from "@/lib/types/waitlist";

type WaitlistRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
};

function mapRow(row: WaitlistRow): WaitlistEntry {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at,
  };
}

export async function fetchWaitlist(): Promise<{
  data: WaitlistEntry[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: (data ?? []).map((row) => mapRow(row as WaitlistRow)), error: null };
}
