export type AnnouncementKind = "event" | "newsletter";

export type AudienceCategory =
  | "educationLevel"
  | "fieldOfStudy"
  | "interest"
  | "scholarshipType"
  | "role";

export type AudienceFilters = Record<AudienceCategory, string[]>;

export const EVERYONE_AUDIENCE_OPTION = "Everyone";

export interface AnnouncementRow {
  id: string;
  subject: string;
  body: string;
  kind: AnnouncementKind;
  audience: AudienceFilters;
  sendToEveryone: boolean;
  createdAt: string;
}
