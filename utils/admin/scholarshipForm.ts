import { MAX_SCHOLARSHIP_IMAGE_BYTES } from "@/lib/constants/scholarships";
import type { CreateScholarshipInput } from "@/lib/types/scholarship";

export function slugifyScholarshipName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return base || "scholarship";
}

export function normalizeScholarshipLink(link: string): string {
  const trimmed = link.trim();
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

export function validateScholarshipInput(input: CreateScholarshipInput): string | null {
  if (!input.image) return "Please attach a scholarship image.";
  if (!input.image.type.startsWith("image/")) return "Please upload an image file.";
  if (input.image.size > MAX_SCHOLARSHIP_IMAGE_BYTES) return "Image must be 5MB or smaller.";
  if (!input.name.trim()) return "Scholarship name is required.";
  if (!input.sponsor.trim()) return "Sponsor's name is required.";
  if (!input.openingDate) return "Opening date is required.";
  if (!input.closingDate) return "Closing date is required.";
  if (new Date(input.closingDate) < new Date(input.openingDate)) {
    return "Closing date must be on or after the opening date.";
  }
  if (!input.link.trim()) return "Scholarship link is required.";
  try {
    new URL(normalizeScholarshipLink(input.link));
  } catch {
    return "Enter a valid scholarship link (e.g. https://example.com/apply).";
  }
  if (!input.details.trim()) return "Scholarship details are required.";
  return null;
}

export function scholarshipStatusFromClosingDate(closingDate: string): "active" | "closed" {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const closing = new Date(`${closingDate}T00:00:00`);
  return closing < today ? "closed" : "active";
}

export function scholarshipImageExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) return fromName;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}
