"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Bookmark } from "lucide-react";
import ScholarshipCard from "@/components/user/scholarshipCard";
import { useScholarshipEngagement } from "@/hooks/useScholarshipEngagement";
import { fetchUserSavedScholarships } from "@/service/user/scholarshipEngagement";
import type { UserScholarshipListItem } from "@/lib/types/scholarshipEngagement";

export const SavedScholarships = () => {
  const [saved, setSaved] = useState<UserScholarshipListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { toggleSave, isSaved, refresh } = useScholarshipEngagement();

  const loadSaved = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await fetchUserSavedScholarships();
    setSaved(data);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadSaved();
  }, [loadSaved]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return saved;
    return saved.filter((item) =>
      [item.title, item.sponsor, item.summary].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [saved, search]);

  const handleUnsave = async (scholarshipId: string) => {
    const ok = await toggleSave(scholarshipId);
    if (ok) {
      setSaved((current) =>
        current.filter((item) => item.id !== scholarshipId),
      );
      void refresh();
    }
  };

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
            placeholder="Search saved scholarships"
            className="block w-full pl-10 pr-3 py-2.5 border border-indigo-100 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700 shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-500">
          {error}{" "}
          {!error.includes("Sign in") && (
            <button
              type="button"
              onClick={() => void loadSaved()}
              className="underline ml-1"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-72 rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-gray-100 bg-white">
          <Bookmark className="w-10 h-10 text-[#1a237e] mb-3" />
          <p className="text-sm font-medium text-gray-700">
            No saved scholarships yet
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              data={{
                id: scholarship.id,
                title: scholarship.title,
                description: scholarship.summary,
                closes: scholarship.closesLabel,
                image: scholarship.heroImage,
                link: scholarship.link,
                slug: scholarship.slug,
              }}
              showEngagement
              isSaved={isSaved(scholarship.id)}
              onToggleSave={() => void handleUnsave(scholarship.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
