"use client";

import { useState } from "react";
import { Filter, Search, X } from "lucide-react";
import {
  EMPTY_USER_SCHOLARSHIP_FILTERS,
  toggleOpenToFilter,
  toggleTypeFilter,
  USER_OPEN_TO_FILTER_OPTIONS,
  USER_TYPE_FILTER_OPTIONS,
  type UserScholarshipFilters,
} from "@/utils/user/filterScholarships";

interface ScholarshipFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: UserScholarshipFilters;
  onFiltersChange: (filters: UserScholarshipFilters) => void;
  activeLabels: string[];
  onRemoveLabel: (label: string) => void;
}

export const ScholarshipFiltersBar = ({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  activeLabels,
  onRemoveLabel,
}: ScholarshipFiltersBarProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPanelOpen((open) => !open)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <span>Filter</span>
            <Filter className="w-4 h-4" />
          </button>

          {activeLabels.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-2 bg-[#EEF2FF] text-[#4361EE] rounded-lg text-sm font-medium"
            >
              <span>{label}</span>
              <button
                type="button"
                onClick={() => onRemoveLabel(label)}
                className="hover:text-blue-800"
                aria-label={`Remove ${label} filter`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {activeLabels.length > 0 && (
            <button
              type="button"
              onClick={() => onFiltersChange(EMPTY_USER_SCHOLARSHIP_FILTERS)}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search scholarships"
            className="block w-full pl-10 pr-3 py-2.5 border border-blue-100 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm text-gray-700"
          />
        </div>
      </div>

      {isPanelOpen && (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-5">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Open to</p>
            <div className="flex flex-wrap gap-2">
              {USER_OPEN_TO_FILTER_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={filters.openTo.includes(option)}
                  onClick={() => onFiltersChange(toggleOpenToFilter(filters, option))}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Scholarship type</p>
            <div className="flex flex-wrap gap-2">
              {USER_TYPE_FILTER_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={filters.types.includes(option)}
                  onClick={() => onFiltersChange(toggleTypeFilter(filters, option))}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
        active
          ? "bg-[#4361EE] text-white border-[#4361EE]"
          : "bg-white text-gray-600 border-gray-200 hover:border-blue-200"
      }`}
    >
      {label}
    </button>
  );
}
