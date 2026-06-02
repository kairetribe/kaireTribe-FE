"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchWaitlist } from "@/service/admin/fetchWaitlist";
import type { WaitlistEntry } from "@/lib/types/waitlist";
import {
  filterWaitlistEntries,
  formatWaitlistDate,
  paginateWaitlistEntries,
} from "@/utils/admin/waitlist";

const PAGE_SIZE = 10;
const GRID_COLS = "grid-cols-[56px_1.2fr_1.2fr_1.4fr_1fr_1.1fr]";

interface WaitlistTableProps {
  search: string;
}

function SkeletonRow() {
  return (
    <div className={`grid ${GRID_COLS} px-6 py-4 border-t border-gray-50 items-center animate-pulse gap-3`}>
      <div className="h-3.5 w-6 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-36 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-28 bg-gray-100 rounded-full" />
    </div>
  );
}

export const WaitlistTable = ({ search }: WaitlistTableProps) => {
  const [allEntries, setAllEntries] = useState<WaitlistEntry[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      const { data, error: fetchError } = await fetchWaitlist();
      if (cancelled) return;
      setAllEntries(data);
      setError(fetchError);
      setIsLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = useMemo(() => filterWaitlistEntries(allEntries, search), [allEntries, search]);

  const { page: safePage, totalCount, totalPages, data: entries } = useMemo(
    () => paginateWaitlistEntries(filtered, page, PAGE_SIZE),
    [filtered, page]
  );

  useEffect(() => {
    if (safePage !== page) setPage(safePage);
  }, [safePage, page]);

  const showingFrom = totalCount === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(safePage * PAGE_SIZE, totalCount);

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((value) => value === 1 || value === totalPages || Math.abs(value - safePage) <= 1)
        .reduce<(number | "...")[]>((acc, value, index, values) => {
          if (index > 0 && value - (values[index - 1] as number) > 1) acc.push("...");
          acc.push(value);
          return acc;
        }, []),
    [safePage, totalPages]
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
      <div className="overflow-x-auto">
        <div className={`grid ${GRID_COLS} min-w-[800px] px-8 py-6 border-b border-gray-50 gap-3`}>
          <div className="text-xs font-medium text-gray-500">S/N</div>
          <div className="text-xs font-medium text-gray-500">First name</div>
          <div className="text-xs font-medium text-gray-500">Last name</div>
          <div className="text-xs font-medium text-gray-500">Email</div>
          <div className="text-xs font-medium text-gray-500">Phone</div>
          <div className="text-xs font-medium text-gray-500">Joined</div>
        </div>

        <div className="px-2 min-w-[800px]">
          {error && (
            <div className="flex items-center justify-center h-48">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {isLoading && !error && Array.from({ length: PAGE_SIZE }).map((_, index) => <SkeletonRow key={index} />)}

          {!isLoading && !error && entries.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <p className="text-sm font-medium text-gray-500">No waitlist entries found</p>
              <p className="text-xs text-gray-400">
                {search ? "Try a different search term" : "New signups will appear here"}
              </p>
            </div>
          )}

          {!isLoading &&
            !error &&
            entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`grid ${GRID_COLS} px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50/50 gap-3`}
              >
                <div className="text-sm font-medium text-gray-900">{showingFrom + index}</div>
                <div className="text-sm text-gray-900 truncate">{entry.firstName}</div>
                <div className="text-sm text-gray-900 truncate">{entry.lastName}</div>
                <div className="text-sm text-gray-700 truncate">{entry.email}</div>
                <div className="text-sm text-gray-700 truncate">{entry.phone}</div>
                <div className="text-sm text-gray-700">{formatWaitlistDate(entry.createdAt)}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4 border-t border-gray-50">
        <p className="text-xs text-gray-400">
          {totalCount === 0
            ? "No results"
            : `Showing ${showingFrom}–${showingTo} of ${totalCount} on waitlist`}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={safePage === 1 || isLoading}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30"
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
                className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-medium ${
                  safePage === value ? "bg-[#1a237e] text-white" : "text-gray-500 hover:bg-gray-100"
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
            disabled={safePage === totalPages || isLoading}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
