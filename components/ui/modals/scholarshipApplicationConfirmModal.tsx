"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { CircleX, Loader2 } from "lucide-react";

interface ScholarshipApplicationConfirmModalProps {
  isOpen: boolean;
  scholarshipName: string;
  isSubmitting?: boolean;
  onConfirmYes: () => void;
  onConfirmNo: () => void;
  onClose: () => void;
}

export const ScholarshipApplicationConfirmModal = ({
  isOpen,
  scholarshipName,
  isSubmitting = false,
  onConfirmYes,
  onConfirmNo,
  onClose,
}: ScholarshipApplicationConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isSubmitting, onClose]);

  const handleOverlayClick = (event: MouseEvent) => {
    if (isSubmitting) return;
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-[24px] shadow-xl w-full max-w-md pt-10 pb-10 px-8 animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-confirm-title"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-6 right-6 text-[#1a237e] hover:text-indigo-900 transition-colors focus:outline-none rounded-full disabled:opacity-50"
          aria-label="Close modal"
        >
          <CircleX className="h-6 w-6 stroke-[1.5px]" />
        </button>

        <h2 id="apply-confirm-title" className="text-xl font-semibold text-gray-900 mb-3 pr-8">
          Did you apply?
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          Did you complete your application for{" "}
          <span className="font-medium text-gray-900">{scholarshipName}</span>?
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onConfirmNo}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            No, not yet
          </button>
          <button
            type="button"
            onClick={onConfirmYes}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1a237e] text-sm text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Yes, I applied
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
