"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, FileCheck, ExternalLink } from "lucide-react";
import { fetchUserAppliedScholarships } from "@/service/user/scholarshipEngagement";
import type { UserScholarshipListItem } from "@/lib/types/scholarshipEngagement";
import { formatPostedDate } from "@/utils/scholarships";

interface AppliedScholarshipsProps {
  onCountChange?: (count: number) => void;
}

export const AppliedScholarships = ({ onCountChange }: AppliedScholarshipsProps) => {
  const [applied, setApplied] = useState<UserScholarshipListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadApplied = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await fetchUserAppliedScholarships();
    setApplied(data);
    setError(fetchError);
    setIsLoading(false);
    onCountChange?.(data.length);
  }, [onCountChange]);

  useEffect(() => {
    void loadApplied();
  }, [loadApplied]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return applied;
    return applied.filter((item) =>
      [item.title, item.sponsor, item.summary].some((value) => value.toLowerCase().includes(query))
    );
  }, [applied, search]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applications"
            className="block w-full pl-10 pr-3 py-2.5 border border-indigo-100 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700 shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-500">{error}</div>
      )}

      {isLoading && !error && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 px-6 text-center shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <FileCheck className="h-7 w-7 text-[#1a237e]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">No applied scholarships yet</h2>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            When you apply to scholarships, they will appear here so you can track your applications.
          </p>
          <Link
            href="/user/scholarships"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1a237e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-900 transition-colors"
          >
            Browse scholarships
          </Link>
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((scholarship) => (
            <div
              key={scholarship.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scholarship.heroImage}
                alt={scholarship.title}
                className="h-20 w-28 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link href={`/scholarships/${scholarship.slug}`} className="font-semibold text-gray-900 hover:text-[#1a237e]">
                  {scholarship.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{scholarship.sponsor}</p>
                <p className="text-xs text-gray-400 mt-1">Applied {formatPostedDate(scholarship.engagedAt)}</p>
              </div>
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a237e] px-5 py-2 text-sm font-medium text-[#1a237e] hover:bg-blue-50 shrink-0"
              >
                View application
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
