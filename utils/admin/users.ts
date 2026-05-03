import type { UserRow, SortField, SortDirection } from "@/context/adminData";

export function filterUsers(users: UserRow[], search: string): UserRow[] {
  if (!search.trim()) return users;
  const q = search.toLowerCase();
  return users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(q) ||
      u.last_name.toLowerCase().includes(q)  ||
      u.email.toLowerCase().includes(q)
  );
}

export function sortUsers(
  users: UserRow[],
  field: SortField,
  direction: SortDirection
): UserRow[] {
  return [...users].sort((a, b) => {
    const valA = (a[field] ?? "").toLowerCase();
    const valB = (b[field] ?? "").toLowerCase();
    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function paginateUsers(users: UserRow[], page: number, pageSize: number): UserRow[] {
  const from = (page - 1) * pageSize;
  return users.slice(from, from + pageSize);
}

export function toggleSort(
  currentField: SortField,
  currentDirection: SortDirection,
  newField: SortField
): { sortField: SortField; sortDirection: SortDirection } {
  if (currentField === newField) {
    return { sortField: newField, sortDirection: currentDirection === "asc" ? "desc" : "asc" };
  }
  return { sortField: newField, sortDirection: "asc" };
}