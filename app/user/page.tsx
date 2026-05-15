"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import bannerImage from "@/public/images/dashboard/banner-3d.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useScholarshipCardEngagement } from "@/hooks/useScholarshipCardEngagement";
import { fetchUserDashboard } from "@/service/user/fetchUserDashboard";
import { DashboardScholarshipSection } from "@/components/user/dashboard/dashboardScholarshipSection";
import { toScholarshipCardData } from "@/utils/user/dashboard";
import type { ScholarshipCardData } from "@/components/user/scholarshipCard";

export default function DashboardHome() {
  const { session } = useAuthContext();
  const { actionError, clearActionError, engagementLoading, getCardEngagementProps } =
    useScholarshipCardEngagement();

  const [firstName, setFirstName] = useState(session?.firstName ?? "Scholar");
  const [totalActiveCount, setTotalActiveCount] = useState(0);
  const [trending, setTrending] = useState<ScholarshipCardData[]>([]);
  const [forYou, setForYou] = useState<ScholarshipCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchUserDashboard(session?.firstName ?? "Scholar");
    setFirstName(data.firstName);
    setTotalActiveCount(data.totalActiveCount);
    setTrending(data.trending.map(toScholarshipCardData));
    setForYou(data.forYou.map(toScholarshipCardData));
    setError(data.error);
    setIsLoading(false);
  }, [session?.firstName]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const bannerCountLabel =
    totalActiveCount === 0
      ? "No active scholarships right now"
      : totalActiveCount === 1
        ? "There is 1 active scholarship that may fit your profile."
        : `There are ${totalActiveCount} active scholarships that may fit your profile.`;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {firstName}</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            It&apos;s a sunny day today, we hope you&apos;re taking good care of your health 😊
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center text-gray-900 font-medium text-sm">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formattedDate}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          {error}
        </div>
      )}

      {actionError && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between gap-4">
          <p className="text-sm text-red-500">{actionError}</p>
          <button type="button" onClick={clearActionError} className="text-xs text-red-600 underline shrink-0">
            Dismiss
          </button>
        </div>
      )}

      <div className="relative bg-[#4361EE] rounded-3xl p-8 md:p-14 overflow-hidden text-white flex items-center justify-between min-h-[300px]">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 leading-tight">{bannerCountLabel}</h2>
          <Link
            href="/user/scholarships"
            className="inline-block bg-white text-[#4361EE] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Apply now!
          </Link>
        </div>

        <div className="hidden lg:block absolute right-0 bottom-0 h-full w-1/2">
          <img
            src={bannerImage.src}
            alt="Graduation Hat"
            className="absolute right-12 bottom-0 h-[110%] w-auto object-contain drop-shadow-2xl transform translate-x-10 translate-y-10"
          />
        </div>
      </div>

      <DashboardScholarshipSection
        title="Trending Scholarships"
        scholarships={trending}
        isLoading={isLoading}
        emptyMessage="No trending scholarships yet. Check back soon."
        getCardEngagementProps={getCardEngagementProps}
      />

      <DashboardScholarshipSection
        title="For you"
        scholarships={forYou}
        isLoading={isLoading}
        emptyMessage="Complete your scholarship profile in settings to get better recommendations."
        getCardEngagementProps={getCardEngagementProps}
      />

      {engagementLoading && (
        <p className="text-xs text-gray-400 text-center">Loading your saved and applied scholarships…</p>
      )}
    </div>
  );
}
