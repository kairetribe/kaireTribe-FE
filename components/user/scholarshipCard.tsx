"use client";

import Link from "next/link";
import { Bookmark, Loader2 } from "lucide-react";
import { ScholarshipVerificationBadge } from "@/components/user/scholarships/scholarshipVerificationBadge";

export interface ScholarshipCardData {
  id: string;
  title: string;
  description: string;
  closes?: string;
  image: string;
  link?: string;
  slug?: string;
  scholarshipType?: string;
  openTo?: string;
  sponsor?: string;
  isVerified?: boolean;
}

interface ScholarshipCardProps {
  data: ScholarshipCardData;
  isSaved?: boolean;
  isViewed?: boolean;
  isApplied?: boolean;
  isSaving?: boolean;
  isApplying?: boolean;
  showEngagement?: boolean;
  onToggleSave?: () => void;
  onView?: () => void;
}

function getViewButtonLabel(isViewed: boolean): string {
  if (isViewed) return "Viewed";
  return "View";
}

function buildScholarshipTags(data: ScholarshipCardData): string[] {
  const tags: string[] = [];
  if (data.scholarshipType) tags.push(`Type: ${data.scholarshipType}`);
  if (data.openTo) tags.push(`Open to: ${data.openTo}`);
  if (data.sponsor) tags.push(data.sponsor);
  return tags;
}

export default function ScholarshipCard({
  data,
  isSaved = false,
  isViewed = false,
  isApplied = false,
  isSaving = false,
  isApplying = false,
  showEngagement = false,
  onToggleSave,
  onView,
}: ScholarshipCardProps) {
  const detailHref = data.slug ? `/scholarships/${data.slug}` : null;
  const viewButtonLabel = getViewButtonLabel(isViewed);
  const scholarshipTags = buildScholarshipTags(data);

  return (
    <div>
      <Link href={detailHref ?? ""}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
          {detailHref ? (
            <Link href={detailHref} className="aspect-[4/3] bg-gray-50 relative block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {data.isVerified && <ScholarshipVerificationBadge isVerified />}
              </div>
              {isApplied ? (
                <div className="absolute top-3 right-3 bg-green-200/80 text-green-600 text-[10px] font-semibold px-2 z-10 py-[1.5px] rounded-lg">
                  Applied
                </div>
              ) : null}
            </Link>
          ) : (
            <div className="aspect-[4/3] bg-gray-50 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {data.isVerified && <ScholarshipVerificationBadge isVerified />}
              </div>
              {isApplied ? (
                <div className="absolute top-3 right-3 bg-green-200/80 text-green-600 text-[10px] font-semibold px-2 z-10 py-[1.5px] rounded-lg">
                  Applied
                </div>
              ) : null}
            </div>
          )}

          <div className="p-5 flex flex-col flex-1">
            {detailHref ? (
              <Link
                href={detailHref}
                className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-[#1a1b80] block"
              >
                {data.title}
              </Link>
            ) : (
              <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{data.title}</h4>
            )}
            {scholarshipTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {scholarshipTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-500 text-xs text-justify mb-4 leading-relaxed line-clamp-4 flex-1">
              {data.description}
            </p>

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
                      isSaved
                        ? "border-[#1a237e] bg-blue-50 text-[#1a237e]"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    )}
                  </button>
                )}
                {data.link && showEngagement && onView ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onView();
                    }}
                    className="bg-[#1a237e] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-blue-900 transition-colors shrink-0 disabled:opacity-60"
                  >
                    {viewButtonLabel}
                  </button>
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
      </Link>
    </div>
  );
}
