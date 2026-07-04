"use client";

import { useCallback, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useScholarshipApplyConfirm } from "@/hooks/useScholarshipApplyConfirm";
import { useScholarshipEngagement } from "@/hooks/useScholarshipEngagement";
import type { ScholarshipCardData } from "@/components/user/scholarshipCard";

export function useScholarshipCardEngagement() {
  const { isAuthenticated } = useAuthContext();
  const {
    isSaved,
    isViewed,
    isApplied,
    toggleSave,
    recordView,
    markApplied,
    actionError,
    clearActionError,
    isLoading: engagementLoading,
  } = useScholarshipEngagement();
  const { startApply, confirmModal, pendingApplyId } = useScholarshipApplyConfirm({
    markApplied,
    isApplied,
    clearActionError,
  });
  const [actingId, setActingId] = useState<string | null>(null);

  const getCardEngagementProps = useCallback(
    (scholarship: ScholarshipCardData) => ({
      showEngagement: isAuthenticated,
      isSaved: isSaved(scholarship.id),
      isViewed: isViewed(scholarship.id),
      isApplied: isApplied(scholarship.id),
      isSaving: actingId === scholarship.id,
      isApplying: actingId === scholarship.id || pendingApplyId === scholarship.id,
      onToggleSave: isAuthenticated
        ? () => {
            clearActionError();
            setActingId(scholarship.id);
            void toggleSave(scholarship.id).finally(() => setActingId(null));
          }
        : undefined,
      onView:
        isAuthenticated && scholarship.link
          ? () => {
              clearActionError();
              setActingId(scholarship.id);
              void recordView(scholarship.id).finally(() => {
                startApply({
                  id: scholarship.id,
                  name: scholarship.title,
                  link: scholarship.link!,
                });
                setActingId(null);
              });
            }
          : undefined,
    }),
    [
      actingId,
      clearActionError,
      isApplied,
      isAuthenticated,
      isSaved,
      isViewed,
      pendingApplyId,
      recordView,
      startApply,
      toggleSave,
    ]
  );

  return {
    isAuthenticated,
    actionError,
    clearActionError,
    engagementLoading,
    getCardEngagementProps,
    confirmModal,
  };
}
