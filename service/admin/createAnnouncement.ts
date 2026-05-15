import supabase from "@/lib/supabase";
import {
  EVERYONE_AUDIENCE_OPTION,
  type AudienceFilters,
} from "@/lib/types/announcement";

export interface CreateAnnouncementInput {
  subject: string;
  body: string;
  audience: AudienceFilters;
}

export interface CreateAnnouncementResult {
  id: string | null;
  error: string | null;
}

function hasAudienceSelection(audience: AudienceFilters): boolean {
  if (audience.role.includes(EVERYONE_AUDIENCE_OPTION)) return true;
  return Object.values(audience).some((values) => values.length > 0);
}

export async function createAnnouncement(
  input: CreateAnnouncementInput
): Promise<CreateAnnouncementResult> {
  const subject = input.subject.trim();
  const body = input.body.trim();

  if (!subject) return { id: null, error: "Announcement subject is required." };
  if (!body) return { id: null, error: "Announcement body is required." };
  if (!hasAudienceSelection(input.audience)) {
    return { id: null, error: "Select at least one audience filter." };
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;
  if (sessionError || !userId) {
    return { id: null, error: "You must be signed in as an admin to send announcements." };
  }

  const sendToEveryone = input.audience.role.includes(EVERYONE_AUDIENCE_OPTION);
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      subject,
      body,
      audience: input.audience,
      send_to_everyone: sendToEveryone,
      created_by: userId,
    })
    .select("id")
    .single();

  if (error || !data) return { id: null, error: error?.message ?? "Failed to send announcement." };
  return { id: data.id, error: null };
}
