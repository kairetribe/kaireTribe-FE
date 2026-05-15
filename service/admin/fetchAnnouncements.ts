import supabase from "@/lib/supabase";
import type { AnnouncementRow } from "@/lib/types/announcement";
import { parseAudience } from "@/utils/admin/announcements";

interface AnnouncementRecord {
  id: string;
  subject: string;
  body: string;
  audience: unknown;
  send_to_everyone: boolean;
  created_at: string;
}

export interface FetchAnnouncementsResult {
  data: AnnouncementRow[];
  totalCount: number;
  error: string | null;
}

function mapAnnouncement(record: AnnouncementRecord): AnnouncementRow {
  return {
    id: record.id,
    subject: record.subject,
    body: record.body,
    audience: parseAudience(record.audience),
    sendToEveryone: record.send_to_everyone,
    createdAt: record.created_at,
  };
}

export async function fetchAnnouncements(
  page: number,
  pageSize: number
): Promise<FetchAnnouncementsResult> {
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("announcements")
    .select("id, subject, body, audience, send_to_everyone, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { data: [], totalCount: 0, error: error.message };
  return {
    data: (data ?? []).map((record) => mapAnnouncement(record as AnnouncementRecord)),
    totalCount: count ?? 0,
    error: null,
  };
}
