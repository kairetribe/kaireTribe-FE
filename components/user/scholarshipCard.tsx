"use client";

import Link from "next/link";
import { Bookmark, Loader2 } from "lucide-react";

export interface ScholarshipCardData {
  id: string;
  title: string;
  description: string;
  closes?: string;
  image: string;
  link?: string;
  slug?: string;
}

interface ScholarshipCardProps {
  data: ScholarshipCardData;
  isSaved?: boolean;
  isApplied?: boolean;
  isSaving?: boolean;
  isApplying?: boolean;
  showEngagement?: boolean;
  onToggleSave?: () => void;
  onApply?: () => void;
}

export default function ScholarshipCard({
  data,
  isSaved = false,
  isApplied = false,
  isSaving = false,
  isApplying = false,
  showEngagement = false,
  onToggleSave,
  onApply,
}: ScholarshipCardProps) {
  const detailHref = data.slug ? `/scholarships/${data.slug}` : undefined;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {detailHref ? (
        <Link href={detailHref} className="aspect-[4/3] bg-gray-50 relative block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        </Link>
      ) : (
        <div className="aspect-[4/3] bg-gray-50 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {detailHref ? (
          <Link href={detailHref} className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-[#1a1b80] block">
            {data.title}
          </Link>
        ) : (
          <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{data.title}</h4>
        )}
        <p className="text-gray-500 text-xs text-justify mb-4 leading-relaxed line-clamp-4 flex-1">{data.description}</p>

        <div className="flex items-center justify-between mt-auto gap-2 flex-wrap">
          {data.closes ? (
            <span className="text-xs font-semibold text-yellow-600">Closes {data.closes}</span>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2 ml-auto">
            {showEngagement && onToggleSave && (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onToggleSave();
                }}
                disabled={isSaving}
                aria-label={isSaved ? "Unsave scholarship" : "Save scholarship"}
                className={`p-2 rounded-full border transition-colors disabled:opacity-60 ${
                  isSaved ? "border-[#1a237e] bg-blue-50 text-[#1a237e]" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />}
              </button>
            )}
            {data.link && showEngagement && onApply ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onApply();
                }}
                disabled={isApplying}
                className="bg-[#1a237e] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-blue-900 transition-colors shrink-0 disabled:opacity-60"
              >
                {isApplying ? "..." : isApplied ? "Applied" : "Apply"}
              </button>
            ) : data.link ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a237e] text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-blue-900 transition-colors shrink-0"
              >
                Apply
              </a>
            ) : detailHref ? (
              <Link
                href={detailHref}
                className="bg-[#1a237e] text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-blue-900 transition-colors shrink-0"
              >
                View
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
