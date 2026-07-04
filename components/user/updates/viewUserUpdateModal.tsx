"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { CircleX } from "lucide-react";
import type { AnnouncementRow } from "@/lib/types/announcement";
import { formatAnnouncementDate } from "@/utils/admin/announcements";

interface ViewUserUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  update: AnnouncementRow | null;
}

export const ViewUserUpdateModal = ({ isOpen, onClose, update }: ViewUserUpdateModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !update) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px]"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-[24px] shadow-xl w-full max-w-[680px] max-h-[90vh] flex flex-col pt-10 pb-12 px-10 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-update-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 text-[#1a237e] hover:text-indigo-900"
          aria-label="Close modal"
        >
          <CircleX className="h-7 w-7 stroke-[1.5px]" />
        </button>

        <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 mb-2">
          {update.kind === "event" ? "Event" : "Newsletter"}
        </p>
        <h2 id="user-update-title" className="text-2xl font-semibold text-gray-900 mb-2 pr-8">
          {update.subject}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{formatAnnouncementDate(update.createdAt)}</p>

        <div className="overflow-y-auto pr-1 text-gray-600 leading-relaxed whitespace-pre-wrap">
          {update.body}
        </div>
      </div>
    </div>,
    document.body
  );
};
