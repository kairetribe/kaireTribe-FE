"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { updateScholarshipVerification } from "@/service/admin/updateScholarshipVerification";

interface ScholarshipVerifyActionProps {
  scholarshipId: string;
  isVerified: boolean;
  onUpdated?: (isVerified: boolean) => void;
}

export const ScholarshipVerifyAction = ({
  scholarshipId,
  isVerified,
  onUpdated,
}: ScholarshipVerifyActionProps) => {
  const { role } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (role !== "admin" || isVerified) return null;

  const handleVerify = async () => {
    setError(null);
    setIsSubmitting(true);
    const { error: updateError } = await updateScholarshipVerification(scholarshipId, true);
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError);
      return;
    }

    onUpdated?.(true);
  };

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="button"
        onClick={() => void handleVerify()}
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-[#1a237e] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Mark as verified
      </button>
    </div>
  );
};
