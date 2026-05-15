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
  audience: AudienceFilters;
  sendToEveryone: boolean;
  createdAt: string;
}
