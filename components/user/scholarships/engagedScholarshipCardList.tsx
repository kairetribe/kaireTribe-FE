"use client";

import ScholarshipCard from "@/components/user/scholarshipCard";
import type { ScholarshipCardData } from "@/components/user/scholarshipCard";

interface EngagedScholarshipCardListProps {
  scholarships: ScholarshipCardData[];
  getCardEngagementProps: (scholarship: ScholarshipCardData) => {
    showEngagement: boolean;
    isSaved: boolean;
    isApplied: boolean;
    isSaving: boolean;
    isApplying: boolean;
    onToggleSave?: () => void;
    onApply?: () => void;
  };
  gridClassName?: string;
}

export const EngagedScholarshipCardList = ({
  scholarships,
  getCardEngagementProps,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8",
}: EngagedScholarshipCardListProps) => (
  <div className={gridClassName}>
    {scholarships.map((scholarship) => (
      <ScholarshipCard key={scholarship.id} data={scholarship} {...getCardEngagementProps(scholarship)} />
    ))}
  </div>
);
