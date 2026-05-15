"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { CircleX, ExternalLink } from "lucide-react";
import type { ScholarshipRow } from "@/lib/types/scholarship";
import {
  formatPostedDate,
  formatScholarshipDate,
  formatScholarshipStatus,
} from "@/utils/scholarships";

interface ViewScholarshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholarship: ScholarshipRow | null;
}

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-500 font-normal ml-1">{label}</label>
      <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">{children}</div>
    </div>
  );
}

export const ViewScholarshipModal = ({ isOpen, onClose, scholarship }: ViewScholarshipModalProps) => {
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

  if (!isOpen || !scholarship) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-[24px] shadow-xl w-full max-w-[680px] max-h-[90vh] flex flex-col pt-10 pb-12 px-10 animate-scale-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarship-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 text-[#1a237e] hover:text-indigo-900 transition-colors focus:outline-none rounded-full z-10"
          aria-label="Close modal"
        >
          <CircleX className="h-7 w-7 stroke-[1.5px]" />
        </button>

        <h2 id="scholarship-modal-title" className="text-2xl font-normal text-gray-900 mb-6 ml-1 shrink-0">
          Scholarship Details
        </h2>

        <div className="space-y-5 overflow-y-auto pr-1">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={scholarship.imageUrl}
              alt={scholarship.name}
              fill
              className="object-cover"
              sizes="(max-width: 680px) 100vw, 680px"
            />
          </div>

          <DetailField label="Name">{scholarship.name}</DetailField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Sponsor">{scholarship.sponsorName}</DetailField>
            <DetailField label="Status">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  scholarship.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {formatScholarshipStatus(scholarship.status)}
              </span>
            </DetailField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Scholarship type">{scholarship.scholarshipType}</DetailField>
            <DetailField label="Open to">{scholarship.openTo}</DetailField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Opening date">{formatScholarshipDate(scholarship.openingDate)}</DetailField>
            <DetailField label="Closing date">{formatScholarshipDate(scholarship.closingDate)}</DetailField>
          </div>

          <DetailField label="Date created">{formatPostedDate(scholarship.createdAt)}</DetailField>

          <DetailField label="Application link">
            <a
              href={scholarship.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1a237e] hover:underline break-all"
            >
              {scholarship.link}
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </DetailField>

          <DetailField label="Public page">
            <Link
              href={`/scholarships/${scholarship.slug}`}
              target="_blank"
              className="text-[#1a237e] hover:underline"
            >
              /scholarships/{scholarship.slug}
            </Link>
          </DetailField>

          <DetailField label="Details">
            <p className="whitespace-pre-wrap leading-relaxed">{scholarship.details}</p>
          </DetailField>
        </div>
      </div>
    </div>,
    document.body
  );
};
