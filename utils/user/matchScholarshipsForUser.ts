import type { ScholarshipRecord } from "@/lib/types/scholarship";

export interface UserProfileMatchInput {
  educationLevel: string | null;
  interest: string | null;
}

const EDUCATION_TO_SCHOLARSHIP_TYPE: Record<string, string> = {
  "High School": "High School",
  "Associate's Degree": "Undergraduate",
  "Bachelor's Degree": "Undergraduate",
  "Master's Degree": "Postgraduate",
  PhD: "PhD",
  "Vocational / Technical": "Other",
  Other: "Other",
};

function matchesInterest(scholarship: ScholarshipRecord, interest: string | null): boolean {
  if (!interest) return true;
  const { openTo } = scholarship;
  if (openTo === "Everyone") return true;
  if (interest === "Local Only") {
    return openTo === "Local Only" || openTo === "Local and International";
  }
  if (interest === "International Only") {
    return openTo === "International Only" || openTo === "Local and International";
  }
  return true;
}

function scoreScholarship(scholarship: ScholarshipRecord, profile: UserProfileMatchInput): number {
  let score = 0;
  const preferredType = profile.educationLevel
    ? EDUCATION_TO_SCHOLARSHIP_TYPE[profile.educationLevel]
    : null;

  if (preferredType && scholarship.scholarshipType === preferredType) score += 3;
  if (matchesInterest(scholarship, profile.interest)) score += 2;
  if (scholarship.openTo === "Everyone") score += 1;
  return score;
}

export function pickScholarshipsForUser(
  scholarships: ScholarshipRecord[],
  profile: UserProfileMatchInput,
  limit = 3
): ScholarshipRecord[] {
  const ranked = scholarships
    .map((scholarship) => ({ scholarship, score: scoreScholarship(scholarship, profile) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked: ScholarshipRecord[] = [];
  const usedIds = new Set<string>();

  for (const entry of ranked) {
    if (picked.length >= limit) break;
    picked.push(entry.scholarship);
    usedIds.add(entry.scholarship.id);
  }

  for (const scholarship of scholarships) {
    if (picked.length >= limit) break;
    if (usedIds.has(scholarship.id)) continue;
    picked.push(scholarship);
    usedIds.add(scholarship.id);
  }

  return picked.slice(0, limit);
}

export function pickTrendingScholarships(scholarships: ScholarshipRecord[], limit = 3): ScholarshipRecord[] {
  return scholarships.slice(0, limit);
}
