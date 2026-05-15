import supabase from "@/lib/supabase";
import type { ScholarshipEngagementIds, UserScholarshipListItem } from "@/lib/types/scholarshipEngagement";
import { mapScholarshipRecord, type ScholarshipDbRecord } from "@/utils/scholarships";

const SCHOLARSHIP_JOIN =
  "id, slug, name, sponsor_name, opening_date, closing_date, scholarship_type, open_to, link, details, image_path, image_url, status, created_at";

async function getAuthenticatedUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user.id) return null;
  return data.session.user.id;
}

function normalizeJoinedScholarship(
  scholarships: ScholarshipDbRecord | ScholarshipDbRecord[] | null
): ScholarshipDbRecord | null {
  if (!scholarships) return null;
  if (Array.isArray(scholarships)) return scholarships[0] ?? null;
  return scholarships;
}

function mapJoinedRow(
  row: { created_at?: string; applied_at?: string; scholarships: ScholarshipDbRecord | ScholarshipDbRecord[] | null },
  dateField: "created_at" | "applied_at"
): UserScholarshipListItem | null {
  const scholarship = normalizeJoinedScholarship(row.scholarships);
  if (!scholarship) return null;
  const engagedAt = row[dateField] ?? scholarship.created_at;
  return { ...mapScholarshipRecord(scholarship), engagedAt };
}

export async function fetchEngagementIds(): Promise<ScholarshipEngagementIds & { error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { savedIds: [], appliedIds: [], error: "Sign in to save or apply for scholarships." };

  const [savedResult, appliedResult] = await Promise.all([
    supabase.from("saved_scholarships").select("scholarship_id").eq("user_id", userId),
    supabase.from("applied_scholarships").select("scholarship_id").eq("user_id", userId),
  ]);

  if (savedResult.error || appliedResult.error) {
    return {
      savedIds: [],
      appliedIds: [],
      error: savedResult.error?.message ?? appliedResult.error?.message ?? "Failed to load scholarship activity.",
    };
  }

  return {
    savedIds: (savedResult.data ?? []).map((row) => row.scholarship_id as string),
    appliedIds: (appliedResult.data ?? []).map((row) => row.scholarship_id as string),
    error: null,
  };
}

export async function saveScholarship(scholarshipId: string): Promise<{ error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { error: "Sign in to save scholarships." };

  const { error } = await supabase.from("saved_scholarships").insert({ user_id: userId, scholarship_id: scholarshipId });
  if (error?.code === "23505") return { error: null };
  if (error) return { error: error.message };
  return { error: null };
}

export async function unsaveScholarship(scholarshipId: string): Promise<{ error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { error: "Sign in to manage saved scholarships." };

  const { error } = await supabase
    .from("saved_scholarships")
    .delete()
    .eq("user_id", userId)
    .eq("scholarship_id", scholarshipId);

  if (error) return { error: error.message };
  return { error: null };
}

export async function recordScholarshipApplication(scholarshipId: string): Promise<{ error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { error: "Sign in to track your applications." };

  const { error } = await supabase.from("applied_scholarships").insert({ user_id: userId, scholarship_id: scholarshipId });
  if (error?.code === "23505") return { error: null };
  if (error) return { error: error.message };
  return { error: null };
}

export async function fetchUserSavedScholarships(): Promise<{
  data: UserScholarshipListItem[];
  error: string | null;
}> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { data: [], error: "Sign in to view saved scholarships." };

  const { data, error } = await supabase
    .from("saved_scholarships")
    .select(`created_at, scholarships (${SCHOLARSHIP_JOIN})`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };

  const items = (data ?? [])
    .map((row) => mapJoinedRow(row as Parameters<typeof mapJoinedRow>[0], "created_at"))
    .filter((item): item is UserScholarshipListItem => item !== null);

  return { data: items, error: null };
}

export async function fetchUserAppliedScholarships(): Promise<{
  data: UserScholarshipListItem[];
  error: string | null;
}> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { data: [], error: "Sign in to view applied scholarships." };

  const { data, error } = await supabase
    .from("applied_scholarships")
    .select(`applied_at, scholarships (${SCHOLARSHIP_JOIN})`)
    .eq("user_id", userId)
    .order("applied_at", { ascending: false });

  if (error) return { data: [], error: error.message };

  const items = (data ?? [])
    .map((row) => mapJoinedRow(row as Parameters<typeof mapJoinedRow>[0], "applied_at"))
    .filter((item): item is UserScholarshipListItem => item !== null);

  return { data: items, error: null };
}
