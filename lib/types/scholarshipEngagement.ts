import type { ScholarshipRecord } from "@/lib/types/scholarship";

export interface ScholarshipEngagementIds {
  savedIds: string[];
  appliedIds: string[];
}

export interface UserScholarshipListItem extends ScholarshipRecord {
  engagedAt: string;
}

export interface EngagementActionResult {
  error: string | null;
}
