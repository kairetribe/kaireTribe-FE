import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CircleX } from "lucide-react";
import type { UserRow } from "@/context/adminData";

interface ViewUserModalProps {
  isOpen:  boolean;
  onClose: () => void;
  user:    UserRow | null;
}

export const ViewUserModal = ({ isOpen, onClose, user }: ViewUserModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  const fullName = `${user.first_name} ${user.last_name}`;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-[24px] shadow-xl w-full max-w-[550px] flex flex-col pt-10 pb-12 px-10 animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-[#1a237e] hover:text-indigo-900 transition-colors focus:outline-none rounded-full"
          aria-label="Close modal"
        >
          <CircleX className="h-7 w-7 stroke-[1.5px]" />
        </button>

        <h2 className="text-2xl font-normal text-gray-900 mb-8 ml-1">
          View User
        </h2>

        <div className="space-y-5">
          {/* Full name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">Full name</label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {fullName}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">Email address</label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {user.email}
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">Gender</label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {user.gender ?? "—"}
            </div>
          </div>

          {/* Education Level */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">Education Level</label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {user.education_level ?? "—"}
            </div>
          </div>

          {/* Field of Study */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">Field of Study</label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {user.field_of_study ?? "—"}
            </div>
          </div>

          {/* Interest */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">Interest</label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {user.interest ?? "—"}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-normal ml-1">
              Number of scholarships applied
            </label>
            <div className="w-full px-4 py-3 rounded-md bg-[#f8f9fa] text-gray-900 text-sm">
              {user.applied_count}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};