import {
  EVERYONE_AUDIENCE_OPTION,
  type AudienceFilters,
} from "@/lib/types/announcement";

const EMPTY_AUDIENCE: AudienceFilters = {
  educationLevel: [],
  fieldOfStudy: [],
  interest: [],
  scholarshipType: [],
  role: [],
};

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  const remainder = day % 10;
  if (remainder === 1) return "st";
  if (remainder === 2) return "nd";
  if (remainder === 3) return "rd";
  return "th";
}

export function parseAudience(value: unknown): AudienceFilters {
  if (!value || typeof value !== "object") return { ...EMPTY_AUDIENCE };

  const record = value as Partial<Record<keyof AudienceFilters, unknown>>;
  return {
    educationLevel: Array.isArray(record.educationLevel) ? record.educationLevel.map(String) : [],
    fieldOfStudy: Array.isArray(record.fieldOfStudy) ? record.fieldOfStudy.map(String) : [],
    interest: Array.isArray(record.interest) ? record.interest.map(String) : [],
    scholarshipType: Array.isArray(record.scholarshipType) ? record.scholarshipType.map(String) : [],
    role: Array.isArray(record.role) ? record.role.map(String) : [],
  };
}

export function formatAnnouncementDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  const day = date.getDate();
  const monthYear = date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return `${day}${ordinalSuffix(day)} ${monthYear}`;
}

export function formatAnnouncementRecipient(
  sendToEveryone: boolean,
  audience: AudienceFilters
): string {
  if (sendToEveryone || audience.role.includes(EVERYONE_AUDIENCE_OPTION)) return "Everyone";

  const labels = Object.values(audience).flat().filter((value) => value !== EVERYONE_AUDIENCE_OPTION);
  if (labels.length === 0) return "—";
  if (labels.length <= 3) return labels.join(", ");
  return `${labels.length} filters`;
}
