"use client";

import Link from "next/link";
import type { ScholarshipCardData } from "@/components/user/scholarshipCard";
import { EngagedScholarshipCardList } from "@/components/user/scholarships/engagedScholarshipCardList";

interface DashboardScholarshipSectionProps {
  title: string;
  scholarships: ScholarshipCardData[];
  isLoading?: boolean;
  emptyMessage?: string;
  getCardEngagementProps: (scholarship: ScholarshipCardData) => {
    showEngagement: boolean;
    isSaved: boolean;
    isApplied: boolean;
    isSaving: boolean;
    isApplying: boolean;
    onToggleSave?: () => void;
    onApply?: () => void;
  };
}

function CardSkeleton() {
  return <div className="h-80 rounded-xl bg-gray-100 animate-pulse" />;
}

export const DashboardScholarshipSection = ({
  title,
  scholarships,
  isLoading = false,
  emptyMessage = "No scholarships available right now.",
  getCardEngagementProps,
}: DashboardScholarshipSectionProps) => (
  <section>
    <div className="mb-6 flex items-center justify-between gap-4">
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      <Link href="/user/scholarships" className="text-sm font-medium text-[#4361EE] hover:underline">
        View all
      </Link>
    </div>

    {isLoading && (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )}

    {!isLoading && scholarships.length === 0 && (
      <p className="text-sm text-gray-500">{emptyMessage}</p>
    )}

    {!isLoading && scholarships.length > 0 && (
      <EngagedScholarshipCardList scholarships={scholarships} getCardEngagementProps={getCardEngagementProps} />
    )}
  </section>
);
