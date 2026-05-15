import type { ScholarshipRecord } from "@/lib/types/scholarship";
import { ADMIN_SCHOLARSHIP_TYPES, SCHOLARSHIP_OPEN_TO_OPTIONS } from "@/lib/constants/scholarships";

export const USER_OPEN_TO_FILTER_OPTIONS = ["Local", "International"] as const;
export const USER_TYPE_FILTER_OPTIONS = ADMIN_SCHOLARSHIP_TYPES;

export type UserOpenToFilter = (typeof USER_OPEN_TO_FILTER_OPTIONS)[number];
export type UserTypeFilter = (typeof USER_TYPE_FILTER_OPTIONS)[number];

export interface UserScholarshipFilters {
  openTo: UserOpenToFilter[];
  types: UserTypeFilter[];
}

export const EMPTY_USER_SCHOLARSHIP_FILTERS: UserScholarshipFilters = {
  openTo: [],
  types: [],
};

function matchesOpenToFilter(scholarship: ScholarshipRecord, filter: UserOpenToFilter): boolean {
  const { openTo } = scholarship;
  if (openTo === "Everyone") return true;
  if (filter === "Local") {
    return openTo === "Local Only" || openTo === "Local and International";
  }
  return openTo === "International Only" || openTo === "Local and International";
}

function matchesTypeFilter(scholarship: ScholarshipRecord, type: UserTypeFilter): boolean {
  return scholarship.scholarshipType === type;
}

export function filterUserScholarships(
  scholarships: ScholarshipRecord[],
  search: string,
  filters: UserScholarshipFilters
): ScholarshipRecord[] {
  const query = search.trim().toLowerCase();

  return scholarships.filter((scholarship) => {
    const matchesSearch =
      !query ||
      [
        scholarship.title,
        scholarship.sponsor,
        scholarship.summary,
        scholarship.scholarshipType,
        scholarship.openTo,
        ...scholarship.paragraphs,
      ].some((value) => value.toLowerCase().includes(query));

    const matchesOpenTo =
      filters.openTo.length === 0 ||
      filters.openTo.some((filter) => matchesOpenToFilter(scholarship, filter));

    const matchesType =
      filters.types.length === 0 || filters.types.some((type) => matchesTypeFilter(scholarship, type));

    return matchesSearch && matchesOpenTo && matchesType;
  });
}

export function getActiveFilterLabels(filters: UserScholarshipFilters): string[] {
  return [...filters.openTo, ...filters.types];
}

export function removeFilterLabel(
  filters: UserScholarshipFilters,
  label: string
): UserScholarshipFilters {
  return {
    openTo: filters.openTo.filter((value) => value !== label) as UserOpenToFilter[],
    types: filters.types.filter((value) => value !== label) as UserTypeFilter[],
  };
}

export function toggleOpenToFilter(
  filters: UserScholarshipFilters,
  value: UserOpenToFilter
): UserScholarshipFilters {
  const exists = filters.openTo.includes(value);
  return {
    ...filters,
    openTo: exists ? filters.openTo.filter((item) => item !== value) : [...filters.openTo, value],
  };
}

export function toggleTypeFilter(filters: UserScholarshipFilters, value: UserTypeFilter): UserScholarshipFilters {
  const exists = filters.types.includes(value);
  return {
    ...filters,
    types: exists ? filters.types.filter((item) => item !== value) : [...filters.types, value],
  };
}

export { SCHOLARSHIP_OPEN_TO_OPTIONS };
