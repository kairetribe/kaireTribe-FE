import type { ScholarshipRecord } from "@/lib/types/scholarship";
import type { ScholarshipCardData } from "@/components/user/scholarshipCard";

export function toScholarshipCardData(scholarship: ScholarshipRecord): ScholarshipCardData {
  return {
    id: scholarship.id,
    title: scholarship.title,
    description: scholarship.summary,
    closes: scholarship.closesLabel,
    image: scholarship.heroImage,
    link: scholarship.link,
    slug: scholarship.slug,
  };
}
