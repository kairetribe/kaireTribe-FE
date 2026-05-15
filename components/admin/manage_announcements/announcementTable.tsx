"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { fetchAnnouncements } from "@/service/admin/fetchAnnouncements";
import type { AnnouncementRow } from "@/lib/types/announcement";
import {
  formatAnnouncementDate,
  formatAnnouncementRecipient,
} from "@/utils/admin/announcements";

const PAGE_SIZE = 10;

function SkeletonRow() {
  return (
    <div className="grid grid-cols-[100px_3fr_2fr_1.5fr_50px] px-6 py-4 border-t border-gray-50 items-center animate-pulse">
      <div className="h-3.5 w-6 bg-gray-100 rounded-full ml-2" />
      <div className="h-3.5 w-48 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-36 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
    </div>
  );
}

export const AnnouncementTable = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / PAGE_SIZE)), [totalCount]);
  const showingFrom = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(page * PAGE_SIZE, totalCount);

  const loadAnnouncements = useCallback(async (targetPage: number) => {
    setIsLoading(true);
    const { data, totalCount: count, error: fetchError } = await fetchAnnouncements(targetPage, PAGE_SIZE);
    const nextTotalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    const nextPage = Math.min(targetPage, nextTotalPages);

    if (nextPage !== targetPage) {
      setPage(nextPage);
      return;
    }

    setAnnouncements(data);
    setTotalCount(count);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadAnnouncements(page);
  }, [loadAnnouncements, page]);

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
      <div className="grid grid-cols-[100px_3fr_2fr_1.5fr_50px] px-8 py-6 border-b border-transparent">
        <div className="text-xs font-medium text-gray-500">S/N</div>
        <div className="text-xs font-medium text-gray-500">Subject</div>
        <div className="text-xs font-medium text-gray-500">Date Created</div>
        <div className="text-xs font-medium text-gray-500">Receipient</div>
        <div />
      </div>

      <div className="px-2 flex-1">
        {error && (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {isLoading && !error && Array.from({ length: PAGE_SIZE }).map((_, index) => <SkeletonRow key={index} />)}

        {!isLoading && !error && announcements.length === 0 && (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm font-medium text-gray-500">No announcements yet</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          announcements.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[100px_3fr_2fr_1.5fr_50px] px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 pl-2">{showingFrom + index}</div>
              <div className="text-sm text-gray-700">{item.subject}</div>
              <div className="text-sm text-gray-700">{formatAnnouncementDate(item.createdAt)}</div>
              <div className="text-sm text-gray-700">
                {formatAnnouncementRecipient(item.sendToEveryone, item.audience)}
              </div>
              <div className="flex justify-end pr-2">
                <button type="button" aria-label="Announcement actions" className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-between px-8 py-4 border-t border-gray-50">
        <p className="text-xs text-gray-400">
          {totalCount === 0 ? "No results" : `Showing ${showingFrom}–${showingTo} of ${totalCount} announcements`}
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
