"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Loader2 } from "lucide-react";
import { useScholarshipEngagement } from "@/hooks/useScholarshipEngagement";
import { useAuthContext } from "@/hooks/useAuthContext";

interface ScholarshipDetailActionsProps {
  scholarshipId: string;
  applyLink: string;
}

export const ScholarshipDetailActions = ({ scholarshipId, applyLink }: ScholarshipDetailActionsProps) => {
  const { isAuthenticated } = useAuthContext();
  const { isSaved, isApplied, toggleSave, markApplied, actionError, clearActionError, isLoading } =
    useScholarshipEngagement();
  const [isSaving, setIsSaving] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const saved = isSaved(scholarshipId);
  const applied = isApplied(scholarshipId);

  const handleSave = async () => {
    if (!isAuthenticated) return;
    clearActionError();
    setIsSaving(true);
    await toggleSave(scholarshipId);
    setIsSaving(false);
  };

  const handleApply = async () => {
    if (!isAuthenticated) return;
    clearActionError();
    setIsApplying(true);
    await markApplied(scholarshipId, applyLink);
    setIsApplying(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
        <p className="text-sm text-gray-600">
          <Link href="/sign-in" className="text-[#1a237e] font-medium hover:underline">
            Sign in
          </Link>{" "}
          to save scholarships and track your applications.
        </p>
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-12 py-2 rounded-full bg-[#1a237e] text-sm text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Apply
        </a>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-3">
      {actionError && <p className="text-sm text-red-500">{actionError}</p>}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving || isLoading}
          className={`inline-flex items-center gap-2 px-7 py-2 rounded-full border text-sm transition-colors disabled:opacity-60 ${
            saved
              ? "border-[#1a237e] bg-blue-50 text-[#1a237e]"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />}
          {saved ? "Saved" : "Save Scholarship"}
        </button>
        <button
          type="button"
          onClick={() => void handleApply()}
          disabled={isApplying || isLoading}
          className="inline-flex items-center gap-2 px-12 py-2 rounded-full bg-[#1a237e] text-sm text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {isApplying && <Loader2 className="w-4 h-4 animate-spin" />}
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};
