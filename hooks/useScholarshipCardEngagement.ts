"use client";

import { useCallback, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useScholarshipEngagement } from "@/hooks/useScholarshipEngagement";
import type { ScholarshipCardData } from "@/components/user/scholarshipCard";

export function useScholarshipCardEngagement() {
  const { isAuthenticated } = useAuthContext();
  const {
    isSaved,
    isApplied,
    toggleSave,
    markApplied,
    actionError,
    clearActionError,
    isLoading: engagementLoading,
  } = useScholarshipEngagement();
  const [actingId, setActingId] = useState<string | null>(null);

  const getCardEngagementProps = useCallback(
    (scholarship: ScholarshipCardData) => ({
      showEngagement: isAuthenticated,
      isSaved: isSaved(scholarship.id),
      isApplied: isApplied(scholarship.id),
      isSaving: actingId === scholarship.id,
      isApplying: actingId === scholarship.id,
      onToggleSave: isAuthenticated
        ? () => {
            clearActionError();
            setActingId(scholarship.id);
            void toggleSave(scholarship.id).finally(() => setActingId(null));
          }
        : undefined,
      onApply:
        isAuthenticated && scholarship.link
          ? () => {
              clearActionError();
              setActingId(scholarship.id);
              void markApplied(scholarship.id, scholarship.link!).finally(() => setActingId(null));
            }
          : undefined,
    }),
    [
      actingId,
      clearActionError,
      isApplied,
      isAuthenticated,
      isSaved,
      markApplied,
      toggleSave,
    ]
  );

  return {
    isAuthenticated,
    actionError,
    clearActionError,
    engagementLoading,
    getCardEngagementProps,
  };
}
