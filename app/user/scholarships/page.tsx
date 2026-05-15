"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ScholarshipCard from "@/components/user/scholarshipCard";
import { ScholarshipFiltersBar } from "@/components/user/scholarships/scholarshipFiltersBar";
import { fetchActiveScholarships } from "@/service/scholarships/fetchScholarships";
import type { ScholarshipRecord } from "@/lib/types/scholarship";
import {
  EMPTY_USER_SCHOLARSHIP_FILTERS,
  filterUserScholarships,
  getActiveFilterLabels,
  removeFilterLabel,
  type UserScholarshipFilters,
} from "@/utils/user/filterScholarships";

function ScholarshipCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 bg-gray-100 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 rounded" />
        <div className="flex justify-between pt-2">
          <div className="h-3 w-20 bg-gray-100 rounded" />
          <div className="h-8 w-20 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function UserScholarshipsPage() {
  const [scholarships, setScholarships] = useState<ScholarshipRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<UserScholarshipFilters>(EMPTY_USER_SCHOLARSHIP_FILTERS);

  const loadScholarships = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await fetchActiveScholarships();
    setScholarships(data);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadScholarships();
  }, [loadScholarships]);

  const filteredScholarships = useMemo(
    () => filterUserScholarships(scholarships, search, filters),
    [scholarships, search, filters]
  );

  const activeLabels = useMemo(() => getActiveFilterLabels(filters), [filters]);

  const handleRemoveLabel = (label: string) => {
    setFilters((current) => removeFilterLabel(current, label));
  };

  return (
    <div className="space-y-8 min-h-screen bg-white md:bg-transparent">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>

        <ScholarshipFiltersBar
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFiltersChange={setFilters}
          activeLabels={activeLabels}
          onRemoveLabel={handleRemoveLabel}
        />
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ScholarshipCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && !error && filteredScholarships.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-gray-600">No scholarships match your search or filters.</p>
          {(search || activeLabels.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilters(EMPTY_USER_SCHOLARSHIP_FILTERS);
              }}
              className="mt-3 text-sm text-[#4361EE] hover:underline"
            >
              Clear search and filters
            </button>
          )}
        </div>
      )}

      {!isLoading && !error && filteredScholarships.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
