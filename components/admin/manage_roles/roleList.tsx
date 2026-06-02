import { MoreHorizontal } from "lucide-react";
import type { StaffUserRow } from "@/service/admin/fetchStaffUsers";

function formatRoleLabel(role: string): string {
  if (!role) return "—";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

interface RoleListProps {
  users: StaffUserRow[];
  isLoading: boolean;
  error: string | null;
}

export const RoleList = ({ users, isLoading, error }: RoleListProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
      <div className="grid grid-cols-12 px-8 py-6 border-b border-transparent">
        <div className="col-span-4 text-xs font-medium text-gray-500">Name</div>
        <div className="col-span-3 text-xs font-medium text-gray-500">Role</div>
        <div className="col-span-4 text-xs font-medium text-gray-500">Email</div>
        <div className="col-span-1" />
      </div>

      <div className="px-2">
        {isLoading && (
          <p className="px-8 py-12 text-sm text-gray-500">Loading team members…</p>
        )}

        {!isLoading && error && (
          <p className="px-8 py-12 text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && users.length === 0 && (
          <p className="px-8 py-12 text-sm text-gray-500">
            No staff members found. Users with a non-user role will appear here.
          </p>
        )}

        {!isLoading &&
          !error &&
          users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-12 px-6 py-6 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors"
            >
              <div className="col-span-4 text-sm font-medium text-gray-900">
                {user.first_name} {user.last_name}
              </div>
              <div className="col-span-3 text-sm text-gray-900">
                {formatRoleLabel(user.role)}
              </div>
              <div className="col-span-4 text-sm text-gray-900">{user.email}</div>
              <div className="col-span-1 flex justify-end">
                <button
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Actions"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
