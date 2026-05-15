import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { fetchAllUsers } from "@/service/admin/fetchUsers";
import { fetchAdminDashboardStats } from "@/service/admin/fetchDashboardStats";
import type { AdminDashboardStats } from "@/lib/types/adminDashboard";
import { filterUsers, sortUsers, paginateUsers, toggleSort } from "@/utils/admin/users";

export type SortField     = "first_name" | "email" | "gender" | "education_level";
export type SortDirection = "asc" | "desc";

export interface UserRow {
  id:              string;
  first_name:      string;
  last_name:       string;
  email:           string;
  gender:          string | null;
  education_level: string | null;
  field_of_study:  string | null;
  interest:        string | null;
  role:            string;
  created_at:      string;
}

interface AdminDataContextType {
  // ── Raw data ──
  allUsers:     UserRow[];
  isLoading:    boolean;
  error:        string | null;
  refetchUsers: () => void;
  dashboardStats: AdminDashboardStats | null;
  isDashboardLoading: boolean;
  dashboardError: string | null;
  refetchDashboard: () => void;

  // ── UI state ──
  search:        string;
  setSearch:     (value: string) => void;
  sortField:     SortField;
  sortDirection: SortDirection;
  setSort:       (field: SortField) => void;
  page:          number;
  setPage:       (page: number) => void;
  pageSize:      number;

  // ── Derived (computed in memory) ──
  pagedUsers:  UserRow[];
  totalCount:  number;
  totalPages:  number;

  // ── Add new resource slices here as admin grows ──
  // e.g. allScholarships: ScholarshipRow[];
}

const PAGE_SIZE = 10;

// ─── Context ──────────────────────────────────────────────────────────────────

export const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers]     = useState<UserRow[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<AdminDashboardStats | null>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [search, setSearchRaw]      = useState("");
  const [sortField, setSortField]   = useState<SortField>("first_name");
  const [sortDirection, setSortDir] = useState<SortDirection>("asc");
  const [page, setPageRaw]          = useState(1);

  // ── Fetch once on mount ───────────────────────────────────────────────────
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchAllUsers();
    setAllUsers(data);
    setError(error);
    setIsLoading(false);
  }, []);

  const loadDashboard = useCallback(async () => {
    setIsDashboardLoading(true);
    const { data, error: statsError } = await fetchAdminDashboardStats();
    setDashboardStats(data);
    setDashboardError(statsError);
    setIsDashboardLoading(false);
  }, []);

  useEffect(() => {
    void loadUsers();
    void loadDashboard();
  }, [loadUsers, loadDashboard]);

  const refetchDashboard = useCallback(() => {
    void loadDashboard();
  }, [loadDashboard]);

  // ── Setters ───────────────────────────────────────────────────────────────
  const setSearch = useCallback((value: string) => {
    setSearchRaw(value);
    setPageRaw(1);
  }, []);

  const setSort = useCallback((field: SortField) => {
    const next = toggleSort(sortField, sortDirection, field);
    setSortField(next.sortField);
    setSortDir(next.sortDirection);
    setPageRaw(1);
  }, [sortField, sortDirection]);

  const setPage = useCallback((p: number) => setPageRaw(p), []);

  const refetchUsers = useCallback(() => loadUsers(), [loadUsers]);

  // ── Derived data (no backend calls) ──────────────────────────────────────
  const filteredAndSorted = useMemo(
    () => sortUsers(filterUsers(allUsers, search), sortField, sortDirection),
    [allUsers, search, sortField, sortDirection]
  );

  const pagedUsers  = useMemo(
    () => paginateUsers(filteredAndSorted, page, PAGE_SIZE),
    [filteredAndSorted, page]
  );

  const totalCount  = filteredAndSorted.length;
  const totalPages  = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <AdminDataContext.Provider value={{
      allUsers, isLoading, error, refetchUsers,
      dashboardStats, isDashboardLoading, dashboardError, refetchDashboard,
      search, setSearch,
      sortField, sortDirection, setSort,
      page, setPage, pageSize: PAGE_SIZE,
      pagedUsers, totalCount, totalPages,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};