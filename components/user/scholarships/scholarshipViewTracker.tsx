"use client";

import { useEffect, useRef } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { recordScholarshipView } from "@/service/user/scholarshipEngagement";

interface ScholarshipViewTrackerProps {
  scholarshipId: string;
}

export const ScholarshipViewTracker = ({ scholarshipId }: ScholarshipViewTrackerProps) => {
  const { isAuthenticated } = useAuthContext();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || hasTracked.current) return;
    hasTracked.current = true;
    void recordScholarshipView(scholarshipId);
  }, [isAuthenticated, scholarshipId]);

  return null;
};
