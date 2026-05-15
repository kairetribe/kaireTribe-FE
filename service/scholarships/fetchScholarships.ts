import supabase from "@/lib/supabase";
import type { ScholarshipRecord } from "@/lib/types/scholarship";
import { mapScholarshipRecord, type ScholarshipDbRecord } from "@/utils/scholarships";

const PUBLIC_COLUMNS =
  "id, slug, name, sponsor_name, opening_date, closing_date, scholarship_type, open_to, link, details, image_path, image_url, status, created_at";

export async function fetchActiveScholarships(): Promise<{
  data: ScholarshipRecord[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("scholarships")
    .select(PUBLIC_COLUMNS)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };

  return {
    data: (data ?? []).map((record) => mapScholarshipRecord(record as ScholarshipDbRecord)),
    error: null,
  };
}

export async function fetchScholarshipSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("scholarships").select("slug").eq("status", "active");

  if (error || !data) return [];
  return data.map((row) => row.slug as string);
}
