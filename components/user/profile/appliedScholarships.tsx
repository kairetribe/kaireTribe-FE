"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FileCheck } from "lucide-react";

interface AppliedScholarshipsProps {
  onCountChange?: (count: number) => void;
}

export const AppliedScholarships = ({ onCountChange }: AppliedScholarshipsProps) => {
  const appliedCount = 0;

  useEffect(() => {
    onCountChange?.(appliedCount);
  }, [appliedCount, onCountChange]);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 px-6 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
        <FileCheck className="h-7 w-7 text-[#1a237e]" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">No applied scholarships yet</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        When you apply to scholarships, they will appear here so you can track your applications.
      </p>
      <Link
        href="/user/scholarships"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1a237e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-900 transition-colors"
      >
        Browse scholarships
      </Link>
    </div>
  );
};
