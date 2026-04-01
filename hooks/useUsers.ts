import { useState, useEffect, useCallback } from "react";
import supabase from "../lib/supabase";

export type SortField = "first_name" | "email" | "gender" | "education_level";
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

interface UseUsersOptions {
  search:        string;
  sortField:     SortField;
  sortDirection: SortDirection;
  page:          number;
  pageSize:      number;
}

interface UseUsersResult {
  users:      UserRow[];
  totalCount: number;
  isLoading:  boolean;
  error:      string | null;
  refetch:    () => void;
}

export function useUsers({
  search,
  sortField,
  sortDirection,
  page,
  pageSize,
}: UseUsersOptions): UseUsersResult {
  const [users, setUsers]           = useState<UserRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const from = (page - 1) * pageSize;
    const to   = from + pageSize - 1;

    let query = supabase
      .from("users")
      .select(
        "id, first_name, last_name, email, gender, education_level, field_of_study, interest, role, created_at",
        { count: "exact" }
      )
      .order(sortField, { ascending: sortDirection === "asc" })
      .range(from, to);

    if (search.trim()) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data, error: fetchError, count } = await query;

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setUsers(data ?? []);
      setTotalCount(count ?? 0);
    }

    setIsLoading(false);
  }, [search, sortField, sortDirection, page, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, totalCount, isLoading, error, refetch: fetchUsers };
}