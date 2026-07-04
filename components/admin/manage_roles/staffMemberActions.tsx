"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";
import type { StaffUserRow } from "@/service/admin/fetchStaffUsers";
import {
  updateStaffAccount,
  type StaffUpdateAction,
} from "@/service/admin/updateStaffAccount";

interface StaffMemberActionsProps {
  user: StaffUserRow;
  currentUserId: string;
  onUpdated: () => void;
}

export const StaffMemberActions = ({
  user,
  currentUserId,
  onUpdated,
}: StaffMemberActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isVerifier = user.role === "verifier";
  const isSelf = user.id === currentUserId;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const runAction = async (action: StaffUpdateAction) => {
    setError(null);
    setIsSubmitting(true);
    const { error: updateError } = await updateStaffAccount(user.id, action);
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError);
      return;
    }

    setIsOpen(false);
    onUpdated();
  };

  if (!isVerifier || isSelf) {
    return <span className="text-xs text-gray-400">—</span>;
  }

  return (
    <div className="relative flex flex-col items-end" ref={menuRef}>
      {error && <p className="mb-1 max-w-[180px] text-right text-[10px] text-red-500">{error}</p>}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        disabled={isSubmitting}
        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-60"
        aria-label="Staff actions"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <MoreHorizontal className="h-5 w-5" />}
      </button>

      {isOpen && !isSubmitting && (
        <div className="absolute right-0 top-8 z-20 min-w-[180px] rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
          {user.is_active ? (
            <button
              type="button"
              onClick={() => void runAction("deactivate")}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Deactivate
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void runAction("activate")}
              className="block w-full px-4 py-2 text-left text-sm text-emerald-700 hover:bg-emerald-50"
            >
              Activate
            </button>
          )}
          <button
            type="button"
            onClick={() => void runAction("promote_to_admin")}
            className="block w-full px-4 py-2 text-left text-sm text-[#1a237e] hover:bg-indigo-50"
          >
            Promote to admin
          </button>
        </div>
      )}
    </div>
  );
};
