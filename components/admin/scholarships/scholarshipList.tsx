"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { fetchScholarships } from "@/service/admin/fetchScholarships";
import type { ScholarshipRow } from "@/lib/types/scholarship";
import { formatScholarshipDate, formatScholarshipStatus } from "@/utils/scholarships";

const PAGE_SIZE = 10;

interface ScholarshipListProps {
  refreshKey?: number;
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-[80px_3fr_1.5fr_1.5fr_1fr_50px] px-6 py-4 border-t border-gray-50 items-center animate-pulse">
      <div className="h-3.5 w-6 bg-gray-100 rounded-full ml-2" />
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded bg-gray-100" />
        <div className="h-3.5 w-40 bg-gray-100 rounded-full" />
      </div>
      <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-28 bg-gray-100 rounded-full" />
      <div className="h-5 w-14 bg-gray-100 rounded-full" />
    </div>
  );
}

export const ScholarshipList = ({ refreshKey = 0 }: ScholarshipListProps) => {
  const [scholarships, setScholarships] = useState<ScholarshipRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / PAGE_SIZE)), [totalCount]);
  const showingFrom = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(page * PAGE_SIZE, totalCount);

  const loadScholarships = useCallback(async (targetPage: number) => {
    setIsLoading(true);
    const { data, totalCount: count, error: fetchError } = await fetchScholarships(targetPage, PAGE_SIZE);
    const nextTotalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    const nextPage = Math.min(targetPage, nextTotalPages);

    if (nextPage !== targetPage) {
      setPage(nextPage);
      return;
    }

    setScholarships(data);
    setTotalCount(count);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadScholarships(page);
  }, [loadScholarships, page, refreshKey]);

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1)
        .reduce<(number | "...")[]>((acc, value, index, values) => {
          if (index > 0 && value - (values[index - 1] as number) > 1) acc.push("...");
          acc.push(value);
          return acc;
        }, []),
    [page, totalPages]
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
      <div className="grid grid-cols-[80px_3fr_1.5fr_1.5fr_1fr_50px] px-8 py-6 border-b border-transparent">
        <div className="text-xs font-medium text-gray-500">S/N</div>
        <div className="text-xs font-medium text-gray-500">Name</div>
        <div className="text-xs font-medium text-gray-500">Sponsor</div>
        <div className="text-xs font-medium text-gray-500">Closing Date</div>
        <div className="text-xs font-medium text-gray-500">Status</div>
        <div />
      </div>

      <div className="px-2 flex-1">
        {error && (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {isLoading && !error && Array.from({ length: PAGE_SIZE }).map((_, index) => <SkeletonRow key={index} />)}

        {!isLoading && !error && scholarships.length === 0 && (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm font-medium text-gray-500">No scholarships yet</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          scholarships.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[80px_3fr_1.5fr_1.5fr_1fr_50px] px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 pl-2">{showingFrom + index}</div>
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="40px" />
                </div>
                <span className="text-sm font-medium text-gray-900 truncate">{item.name}</span>
              </div>
              <div className="text-sm text-gray-900 truncate">{item.sponsorName}</div>
              <div className="text-sm text-gray-900">{formatScholarshipDate(item.closingDate)}</div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                    item.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {formatScholarshipStatus(item.status)}
                </span>
              </div>
              <div className="flex justify-end pr-2">
                <button type="button" aria-label="Scholarship actions" className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-between px-8 py-4 border-t border-gray-50">
        <p className="text-xs text-gray-400">
          {totalCount === 0 ? "No results" : `Showing ${showingFrom}–${showingTo} of ${totalCount} scholarships`}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1 || isLoading}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pageNumbers.map((value, index) =>
            value === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-xs text-gray-400">
                …
              </span>
            ) : (
              <button
                key={value}
                type="button"
                onClick={() => setPage(value)}
                disabled={isLoading}
                className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-medium transition-colors ${
                  page === value ? "bg-[#1a237e] text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {value}
              </button>
            )
          )}

          <button
            type="button"
            aria-label="Next page"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages || isLoading}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
