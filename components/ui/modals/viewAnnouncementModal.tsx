"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { CircleX } from "lucide-react";
import type { AnnouncementRow } from "@/lib/types/announcement";
import {
  formatAnnouncementDate,
  formatAnnouncementRecipient,
  getAnnouncementAudienceDetails,
} from "@/utils/admin/announcements";

interface ViewAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: AnnouncementRow | null;
}

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-500 font-normal ml-1">{label}</label>
      <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">{children}</div>
    </div>
  );
}

export const ViewAnnouncementModal = ({ isOpen, onClose, announcement }: ViewAnnouncementModalProps) => {
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

  if (!isOpen || !announcement) return null;

  const audienceDetails = getAnnouncementAudienceDetails(
    announcement.sendToEveryone,
    announcement.audience
  );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-[24px] shadow-xl w-full max-w-[640px] max-h-[90vh] flex flex-col pt-10 pb-12 px-10 animate-scale-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 text-[#1a237e] hover:text-indigo-900 transition-colors focus:outline-none rounded-full"
          aria-label="Close modal"
        >
          <CircleX className="h-7 w-7 stroke-[1.5px]" />
        </button>

        <h2 id="announcement-modal-title" className="text-2xl font-normal text-gray-900 mb-8 ml-1 shrink-0">
          Announcement Details
        </h2>

        <div className="space-y-5 overflow-y-auto pr-1">
          <DetailField label="Subject">{announcement.subject}</DetailField>

          <DetailField label="Date created">{formatAnnouncementDate(announcement.createdAt)}</DetailField>


          {audienceDetails.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 font-normal ml-1">Audience filters</label>
              <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm space-y-3">
                {audienceDetails.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-semibold text-gray-500">{item.label}</p>
                    <p className="mt-1">{item.values.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DetailField label="Message">
            <p className="whitespace-pre-wrap leading-relaxed">{announcement.body}</p>
          </DetailField>
        </div>
      </div>
    </div>,
    document.body
  );
};
