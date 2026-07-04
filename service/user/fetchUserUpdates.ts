import supabase from "@/lib/supabase";
import type { AnnouncementKind, AnnouncementRow } from "@/lib/types/announcement";
import type { UserProfile } from "@/lib/types/auth";
import { parseAudience } from "@/utils/admin/announcements";
import { announcementMatchesUser } from "@/utils/user/matchAnnouncementAudience";

interface AnnouncementRecord {
  id: string;
  subject: string;
  body: string;
  kind: AnnouncementKind;
  audience: unknown;
  send_to_everyone: boolean;
  created_at: string;
}

function mapAnnouncement(record: AnnouncementRecord): AnnouncementRow {
  return {
    id: record.id,
    subject: record.subject,
    body: record.body,
    kind: record.kind,
    audience: parseAudience(record.audience),
    sendToEveryone: record.send_to_everyone,
    createdAt: record.created_at,
  };
}

export async function fetchUserUpdates(profile: UserProfile | null): Promise<{
  events: AnnouncementRow[];
  newsletters: AnnouncementRow[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("announcements")
    .select("id, subject, body, kind, audience, send_to_everyone, created_at")
    .order("created_at", { ascending: false });

  if (error) return { events: [], newsletters: [], error: error.message };

  const matched = (data ?? [])
    .map((record) => mapAnnouncement(record as AnnouncementRecord))
    .filter((item) => announcementMatchesUser(item, profile));

  return {
    events: matched.filter((item) => item.kind === "event"),
    newsletters: matched.filter((item) => item.kind === "newsletter"),
    error: null,
  };
}
