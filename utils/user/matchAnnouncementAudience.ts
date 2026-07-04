import {
  EVERYONE_AUDIENCE_OPTION,
  type AnnouncementRow,
} from "@/lib/types/announcement";
import type { UserProfile } from "@/lib/types/auth";

interface ProfileMatchInput {
  education_level: string | null;
  field_of_study: string | null;
  interest: string | null;
  scholarship_type: string | null;
  role: string;
}

export function announcementMatchesUser(
  announcement: AnnouncementRow,
  profile: UserProfile | ProfileMatchInput | null
): boolean {
  if (announcement.sendToEveryone) return true;
  if (!profile) return false;

  const { audience } = announcement;
  if (audience.role.includes(EVERYONE_AUDIENCE_OPTION)) return true;

  const checks = [
    { filters: audience.educationLevel, value: profile.education_level },
    { filters: audience.fieldOfStudy, value: profile.field_of_study },
    { filters: audience.interest, value: profile.interest },
    { filters: audience.scholarshipType, value: profile.scholarship_type },
  ] as const;

  for (const { filters, value } of checks) {
    if (filters.length === 0) continue;
    if (!value || !filters.includes(value)) return false;
  }

  if (audience.role.length > 0 && !audience.role.includes(profile.role)) {
    return false;
  }

  return true;
}
