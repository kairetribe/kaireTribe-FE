"use client";

import { ScholarshipApplicationConfirmModal } from "@/components/ui/modals/scholarshipApplicationConfirmModal";
import type { ScholarshipApplyConfirmModalState } from "@/hooks/useScholarshipApplyConfirm";

interface ScholarshipApplyConfirmGateProps {
  confirmModal: ScholarshipApplyConfirmModalState;
}

export const ScholarshipApplyConfirmGate = ({ confirmModal }: ScholarshipApplyConfirmGateProps) => (
  <ScholarshipApplicationConfirmModal {...confirmModal} />
);
