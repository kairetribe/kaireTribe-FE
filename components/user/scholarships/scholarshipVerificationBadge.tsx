interface ScholarshipVerificationBadgeProps {
  isVerified: boolean;
  className?: string;
}

export const ScholarshipVerificationBadge = ({
  isVerified,
  className = "",
}: ScholarshipVerificationBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
      isVerified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
    } ${className}`}
  >
    {isVerified ? "Verified" : "Unverified"}
  </span>
);
