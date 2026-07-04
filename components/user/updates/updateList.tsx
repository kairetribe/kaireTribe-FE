"use client";

import type { AnnouncementRow } from "@/lib/types/announcement";
import { formatAnnouncementDate } from "@/utils/admin/announcements";

interface UpdateListProps {
  items: AnnouncementRow[];
  emptyMessage: string;
  onSelect: (item: AnnouncementRow) => void;
}

export const UpdateList = ({ items, emptyMessage, onSelect }: UpdateListProps) => {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className="w-full text-left rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 mb-1">
                {item.kind === "event" ? "Event" : "Newsletter"}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.subject}</h3>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">{item.body}</p>
            </div>
            <span className="shrink-0 text-xs text-gray-400">{formatAnnouncementDate(item.createdAt)}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
