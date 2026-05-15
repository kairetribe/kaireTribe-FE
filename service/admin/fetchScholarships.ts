import supabase from "@/lib/supabase";
import type { ScholarshipRow } from "@/lib/types/scholarship";
import { mapScholarshipRow, type ScholarshipDbRecord } from "@/utils/scholarships";

const SCHOLARSHIP_COLUMNS =
  "id, slug, name, sponsor_name, opening_date, closing_date, scholarship_type, open_to, link, details, image_path, image_url, status, created_at";

export interface FetchScholarshipsResult {
  data: ScholarshipRow[];
  totalCount: number;
  error: string | null;
}

export async function fetchScholarships(
  page: number,
  pageSize: number
): Promise<FetchScholarshipsResult> {
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("scholarships")
    .select(SCHOLARSHIP_COLUMNS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { data: [], totalCount: 0, error: error.message };

  return {
    data: (data ?? []).map((record) => mapScholarshipRow(record as ScholarshipDbRecord)),
    totalCount: count ?? 0,
    error: null,
  };
}
