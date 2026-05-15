"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchEngagementIds,
  recordScholarshipApplication,
  saveScholarship,
  unsaveScholarship,
} from "@/service/user/scholarshipEngagement";

export function useScholarshipEngagement() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadEngagement = useCallback(async () => {
    setIsLoading(true);
    const { savedIds: saved, appliedIds: applied, error: fetchError } = await fetchEngagementIds();
    setSavedIds(new Set(saved));
    setAppliedIds(new Set(applied));
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadEngagement();
  }, [loadEngagement]);

  const toggleSave = useCallback(async (scholarshipId: string): Promise<boolean> => {
    setActionError(null);
    const isSaved = savedIds.has(scholarshipId);
    const { error: actionErr } = isSaved
      ? await unsaveScholarship(scholarshipId)
      : await saveScholarship(scholarshipId);

    if (actionErr) {
      setActionError(actionErr);
      return false;
    }

    setSavedIds((current) => {
      const next = new Set(current);
      if (isSaved) next.delete(scholarshipId);
      else next.add(scholarshipId);
      return next;
    });
    return true;
  }, [savedIds]);

  const markApplied = useCallback(async (scholarshipId: string, applyUrl?: string): Promise<boolean> => {
    setActionError(null);
    const { error: actionErr } = await recordScholarshipApplication(scholarshipId);
    if (actionErr) {
      setActionError(actionErr);
      return false;
    }

    setAppliedIds((current) => new Set(current).add(scholarshipId));
    if (applyUrl) window.open(applyUrl, "_blank", "noopener,noreferrer");
    return true;
  }, []);

  const isSaved = useCallback((scholarshipId: string) => savedIds.has(scholarshipId), [savedIds]);
  const isApplied = useCallback((scholarshipId: string) => appliedIds.has(scholarshipId), [appliedIds]);

  const counts = useMemo(
    () => ({ saved: savedIds.size, applied: appliedIds.size }),
    [savedIds.size, appliedIds.size]
  );

  return {
    savedIds,
    appliedIds,
    isLoading,
    error,
    actionError,
    counts,
    isSaved,
    isApplied,
    toggleSave,
    markApplied,
    refresh: loadEngagement,
    clearActionError: () => setActionError(null),
  };
}
