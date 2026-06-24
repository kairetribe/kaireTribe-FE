"use client";

import { useCallback, useState } from "react";

export interface ScholarshipApplyTarget {
  id: string;
  name: string;
  link: string;
}

export interface ScholarshipApplyConfirmModalState {
  isOpen: boolean;
  scholarshipName: string;
  isSubmitting: boolean;
  onConfirmYes: () => void;
  onConfirmNo: () => void;
  onClose: () => void;
}

interface UseScholarshipApplyConfirmOptions {
  markApplied: (scholarshipId: string) => Promise<boolean>;
  isApplied: (scholarshipId: string) => boolean;
  clearActionError: () => void;
}

export function useScholarshipApplyConfirm({
  markApplied,
  isApplied,
  clearActionError,
}: UseScholarshipApplyConfirmOptions) {
  const [pending, setPending] = useState<ScholarshipApplyTarget | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const startApply = useCallback(
    (target: ScholarshipApplyTarget) => {
      clearActionError();
      window.open(target.link, "_blank", "noopener,noreferrer");
      if (!isApplied(target.id)) setPending(target);
    },
    [clearActionError, isApplied]
  );

  const closeConfirm = useCallback(() => {
    if (isConfirming) return;
    setPending(null);
  }, [isConfirming]);

  const handleConfirmYes = useCallback(async () => {
    if (!pending) return;
    setIsConfirming(true);
    const success = await markApplied(pending.id);
    setIsConfirming(false);
    if (success) setPending(null);
  }, [markApplied, pending]);

  const confirmModal: ScholarshipApplyConfirmModalState = {
    isOpen: pending !== null,
    scholarshipName: pending?.name ?? "",
    isSubmitting: isConfirming,
    onConfirmYes: () => void handleConfirmYes(),
    onConfirmNo: closeConfirm,
    onClose: closeConfirm,
  };

  return { startApply, confirmModal, pendingApplyId: pending?.id ?? null };
}
