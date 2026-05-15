"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  EDUCATION_LEVELS,
  FIELDS_OF_STUDY,
  INTEREST_OPTIONS,
  SCHOLARSHIP_TYPES,
} from "@/lib/constants/allCountries";
import {
  EVERYONE_AUDIENCE_OPTION,
  type AudienceCategory,
  type AudienceFilters,
} from "@/lib/types/announcement";

export { EVERYONE_AUDIENCE_OPTION, type AudienceCategory, type AudienceFilters };
const ROLE_OPTIONS = [EVERYONE_AUDIENCE_OPTION, "User", "Admin"];

const EMPTY_FILTERS: AudienceFilters = {
  educationLevel: [],
  fieldOfStudy: [],
  interest: [],
  scholarshipType: [],
  role: [],
};

const CATEGORIES: { key: AudienceCategory; label: string; options: string[] }[] = [
  { key: "role", label: "Role", options: ROLE_OPTIONS },
  { key: "educationLevel", label: "Education level", options: EDUCATION_LEVELS },
  { key: "fieldOfStudy", label: "Field of study", options: FIELDS_OF_STUDY },
  { key: "interest", label: "Interest", options: INTEREST_OPTIONS },
  { key: "scholarshipType", label: "Scholarship type", options: SCHOLARSHIP_TYPES },
];

interface AudienceMultiSelectProps {
  value?: AudienceFilters;
  onChange?: (value: AudienceFilters) => void;
}

function selectionCount(filters: AudienceFilters): number {
  return Object.values(filters).reduce((total, items) => total + items.length, 0);
}

export function AudienceMultiSelect({ value, onChange }: AudienceMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<AudienceFilters>(value ?? EMPTY_FILTERS);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateFilters = (next: AudienceFilters) => {
    setFilters(next);
    onChange?.(next);
  };

  const isEveryoneSelected = filters.role.includes(EVERYONE_AUDIENCE_OPTION);

  const toggleOption = (category: AudienceCategory, option: string) => {
    if (category === "role" && option === EVERYONE_AUDIENCE_OPTION) {
      updateFilters(
        isEveryoneSelected
          ? { ...EMPTY_FILTERS }
          : { ...EMPTY_FILTERS, role: [EVERYONE_AUDIENCE_OPTION] }
      );
      return;
    }

    if (isEveryoneSelected) return;

    const current = filters[category];
    const nextValues = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    updateFilters({ ...filters, [category]: nextValues });
  };

  const removeSelection = (category: AudienceCategory, option: string) => {
    if (category === "role" && option === EVERYONE_AUDIENCE_OPTION) {
      updateFilters({ ...EMPTY_FILTERS });
      return;
    }

    updateFilters({
      ...filters,
      [category]: filters[category].filter((item) => item !== option),
    });
  };

  const isOptionDisabled = (category: AudienceCategory, option: string) =>
    isEveryoneSelected && !(category === "role" && option === EVERYONE_AUDIENCE_OPTION);

  const selectedCount = selectionCount(filters);
  const categoryLabel = (key: AudienceCategory) =>
    CATEGORIES.find((category) => category.key === key)?.label ?? key;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500"
      >
        <span className={selectedCount === 0 ? "text-gray-400" : "text-gray-900"}>
          {isEveryoneSelected
            ? EVERYONE_AUDIENCE_OPTION
            : selectedCount === 0
              ? "Select audience categories"
              : `${selectedCount} audience filter${selectedCount === 1 ? "" : "s"} selected`}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {selectedCount > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.flatMap((category) =>
            filters[category.key].map((option) => (
              <span
                key={`${category.key}-${option}`}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-[#1a237e]"
              >
                {categoryLabel(category.key)}: {option}
                <button
                  type="button"
                  onClick={() => removeSelection(category.key, option)}
                  className="text-[#1a237e] hover:opacity-70"
                  aria-label={`Remove ${option}`}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white p-3 shadow-lg">
          {CATEGORIES.map((category) => (
            <div key={category.key} className="border-b border-gray-100 py-3 last:border-b-0">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.options.map((option) => {
                  const isSelected = filters[category.key].includes(option);
                  const disabled = isOptionDisabled(category.key, option);
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleOption(category.key, option)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        disabled
                          ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                          : isSelected
                            ? "border-[#1a237e] bg-[#1a237e] text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
