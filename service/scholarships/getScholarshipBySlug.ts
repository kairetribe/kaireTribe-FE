import supabase from "@/lib/supabase";
import type { ScholarshipRecord } from "@/lib/types/scholarship";
import { mapScholarshipRecord, type ScholarshipDbRecord } from "@/utils/scholarships";

const PUBLIC_COLUMNS =
  "id, slug, name, sponsor_name, opening_date, closing_date, scholarship_type, open_to, link, details, image_path, image_url, status, is_verified, created_at";

export async function getScholarshipBySlug(slug: string): Promise<ScholarshipRecord | null> {
  const { data, error } = await supabase
    .from("scholarships")
    .select(PUBLIC_COLUMNS)
    .eq("slug", slug)
    .eq("status", "active")
    .eq("is_verified", true)
    .maybeSingle();

  if (error || !data) return null;
  return mapScholarshipRecord(data as ScholarshipDbRecord);
}
