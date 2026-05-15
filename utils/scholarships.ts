import type { ScholarshipRecord } from "@/lib/types/scholarship";
import type { ScholarshipRow } from "@/lib/types/scholarship";

export interface ScholarshipDbRecord {
  id: string;
  slug: string;
  name: string;
  sponsor_name: string;
  opening_date: string;
  closing_date: string;
  scholarship_type: string;
  open_to: string;
  link: string;
  details: string;
  image_path: string;
  image_url: string;
  status: "active" | "closed";
  created_at: string;
}

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  const remainder = day % 10;
  if (remainder === 1) return "st";
  if (remainder === 2) return "nd";
  if (remainder === 3) return "rd";
  return "th";
}

export function formatScholarshipDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "—";

  const day = date.getDate();
  const monthYear = date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return `${day}${ordinalSuffix(day)} ${monthYear}`;
}

export function formatPostedDate(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" });
}

function detailsToParagraphs(details: string): string[] {
  const chunks = details
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  return chunks.length > 0 ? chunks : [details.trim()];
}

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function mapScholarshipRow(record: ScholarshipDbRecord): ScholarshipRow {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    sponsorName: record.sponsor_name,
    openingDate: record.opening_date,
    closingDate: record.closing_date,
    scholarshipType: record.scholarship_type,
    openTo: record.open_to,
    link: record.link,
    details: record.details,
    imagePath: record.image_path,
    imageUrl: record.image_url,
    status: record.status,
    createdAt: record.created_at,
  };
}

export function mapScholarshipRecord(record: ScholarshipDbRecord): ScholarshipRecord {
  const paragraphs = detailsToParagraphs(record.details);
  const summary = paragraphs[0]?.slice(0, 200) ?? record.details.slice(0, 200);

  return {
    id: record.id,
    slug: record.slug,
    title: record.name,
    summary,
    sponsor: record.sponsor_name,
    postedDate: formatPostedDate(record.created_at),
    readingMinutes: estimateReadingMinutes(record.details),
    closesLabel: formatScholarshipDate(record.closing_date),
    heroImage: record.image_url,
    paragraphs,
    link: record.link,
    scholarshipType: record.scholarship_type,
    openTo: record.open_to,
  };
}

export function formatScholarshipStatus(status: ScholarshipRow["status"]): string {
  return status === "active" ? "Active" : "Closed";
}
