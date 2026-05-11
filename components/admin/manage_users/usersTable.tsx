import { useState } from "react";
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdminData } from "../../../hooks/useAdminData";
import { ViewUserModal } from "../../ui/modals/viewUserModal";
import type { SortField, SortDirection, UserRow } from "../../../context/adminData";

// ─── Avatar ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-pink-100 text-pink-600",
  "bg-purple-100 text-purple-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

function avatarColor(id: string) {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────
function SortIcon({ field, sortField, sortDirection }: {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}) {
  if (sortField !== field)
    return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300 ml-1" />;
  return sortDirection === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-[#1a237e] ml-1" />
    : <ChevronDown className="w-3.5 h-3.5 text-[#1a237e] ml-1" />;
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="grid grid-cols-[250px_200px_100px_150px_100px_50px] gap-4 px-6 py-4 border-t border-gray-50 items-center animate-pulse">
      <div className="flex items-center gap-3 pl-2">
        <div className="h-9 w-9 rounded-full bg-gray-100 flex-shrink-0" />
        <div className="h-3.5 w-32 bg-gray-100 rounded-full" />
      </div>
      <div className="h-3.5 w-40 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-12 bg-gray-100 rounded-full" />
      <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
      <div className="h-5 w-14 bg-gray-100 rounded-full" />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export const UsersTable = () => {
  const {
    pagedUsers,
    totalCount,
    totalPages,
    isLoading,
    error,
    search,
    sortField,
    sortDirection,
    setSort,
    page,
    setPage,
    pageSize,
  } = useAdminData();

  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const showingFrom = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, totalCount);

  const SortableHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => setSort(field)}
      className="flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
    >
      {label}
      <SortIcon field={field} sortField={sortField} sortDirection={sortDirection} />
    </button>
  );

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">

        {/* ── Column headers ── */}
        <div className="grid grid-cols-[250px_200px_100px_150px_100px_50px] gap-4 px-8 py-6 border-b border-gray-50">
          <div className="pl-2">
            <SortableHeader field="first_name" label="Name" />
          </div>
          <SortableHeader field="email" label="Email" />
          <SortableHeader field="gender" label="Gender" />
          <SortableHeader field="education_level" label="Education Level" />
          <div className="text-xs font-medium text-gray-500">Status</div>
        </div>

        {/* ── Rows ── */}
        <div className="px-2 flex-1">

          {/* Error */}
          {error && (
            <div className="flex items-center justify-center h-48">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Loading skeletons */}
          {isLoading && !error &&
            Array.from({ length: pageSize }).map((_, i) => <SkeletonRow key={i} />)
          }

          {/* Empty state */}
          {!isLoading && !error && pagedUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <p className="text-sm font-medium text-gray-500">No users found</p>
              {search && (
                <p className="text-xs text-gray-400">Try a different search term</p>
              )}
            </div>
          )}

          {/* Rows */}
          {!isLoading && !error && pagedUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="grid grid-cols-[250px_200px_100px_150px_100px_50px] gap-4 px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors cursor-pointer"
            >
              {/* Name + avatar */}
              <div className="flex items-center gap-3 pl-2">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${avatarColor(user.id)}`}>
                  {getInitials(user.first_name, user.last_name)}
                </div>
                <span className="text-sm font-medium text-gray-900 truncate">
                  {user.first_name} {user.last_name}
                </span>
              </div>

              {/* Email */}
              <div className="text-sm text-gray-900 flex flex-col min-w-0">
                <span className="truncate">{user.email.split("@")[0]}</span>
                <span className="text-gray-500 truncate">@{user.email.split("@")[1]}</span>
              </div>

              {/* Gender */}
              <div className="text-sm text-gray-900">{user.gender ?? "—"}</div>

              {/* Education */}
              <div className="text-sm text-gray-900">{user.education_level ?? "—"}</div>

              {/* Status */}
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end pr-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            {totalCount === 0
              ? "No results"
              : `Showing ${showingFrom}–${showingTo} of ${totalCount} users`}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`e-${i}`} className="px-2 text-xs text-gray-400">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-medium transition-colors ${page === p
                        ? "bg-[#1a237e] text-white"
                        : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ViewUserModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </>
  );
};