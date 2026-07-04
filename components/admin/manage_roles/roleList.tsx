import type { StaffUserRow } from "@/service/admin/fetchStaffUsers";
import { StaffMemberActions } from "@/components/admin/manage_roles/staffMemberActions";

function formatRoleLabel(role: string): string {
  if (!role) return "—";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatAccountStatus(user: StaffUserRow): string {
  if (user.role === "admin") return "Active";
  return user.is_active ? "Active" : "Deactivated";
}

interface RoleListProps {
  users: StaffUserRow[];
  isLoading: boolean;
  error: string | null;
  currentUserId: string;
  onStaffUpdated: () => void;
}

export const RoleList = ({
  users,
  isLoading,
  error,
  currentUserId,
  onStaffUpdated,
}: RoleListProps) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
    <div className="grid grid-cols-12 px-8 py-6 border-b border-transparent">
      <div className="col-span-3 text-xs font-medium text-gray-500">Name</div>
      <div className="col-span-2 text-xs font-medium text-gray-500">Role</div>
      <div className="col-span-3 text-xs font-medium text-gray-500">Email</div>
      <div className="col-span-2 text-xs font-medium text-gray-500">Status</div>
      <div className="col-span-2 text-xs font-medium text-gray-500 text-right">Actions</div>
    </div>

    <div className="px-2">
      {isLoading && <p className="px-8 py-12 text-sm text-gray-500">Loading team members…</p>}

      {!isLoading && error && <p className="px-8 py-12 text-sm text-red-600">{error}</p>}

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
            <div className="col-span-3 text-sm font-medium text-gray-900">
              {user.first_name} {user.last_name}
            </div>
            <div className="col-span-2 text-sm text-gray-900">{formatRoleLabel(user.role)}</div>
            <div className="col-span-3 text-sm text-gray-900 truncate">{user.email}</div>
            <div className="col-span-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                  formatAccountStatus(user) === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {formatAccountStatus(user)}
              </span>
            </div>
            <div className="col-span-2 flex justify-end">
              <StaffMemberActions
                user={user}
                currentUserId={currentUserId}
                onUpdated={onStaffUpdated}
              />
            </div>
          </div>
        ))}
    </div>
  </div>
);
