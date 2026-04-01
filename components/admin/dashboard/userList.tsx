import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminData } from "@/hooks/useAdminData";
import { ViewUserModal } from "@/components/ui/modals/viewUserModal";
import type { UserRow } from "@/context/adminData";

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

export const UserList = () => {
  const { allUsers, isLoading } = useAdminData();
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  // Show only the 6 most recently joined users
  const previewUsers = allUsers.slice(0, 6);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-900 font-semibold">User list</h3>
          <button
            onClick={() => router.push("/admin/users")}
            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          >
            See all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-4 text-xs font-medium text-gray-500 w-[20%] pl-2">Name</th>
                <th className="pb-4 text-xs font-medium text-gray-500 w-[25%]">Email</th>
                <th className="pb-4 text-xs font-medium text-gray-500 w-[15%]">Gender</th>
                <th className="pb-4 text-xs font-medium text-gray-500 w-[20%]">Education Level</th>
                <th className="pb-4 text-xs font-medium text-gray-500 w-[10%]">Status</th>
                <th className="pb-4 text-xs font-medium text-gray-500 w-[10%]"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {/* Loading skeletons */}
              {isLoading && Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gray-100 flex-shrink-0" />
                      <div className="h-3 w-24 bg-gray-100 rounded-full" />
                    </div>
                  </td>
                  <td className="py-4"><div className="h-3 w-36 bg-gray-100 rounded-full" /></td>
                  <td className="py-4"><div className="h-3 w-10 bg-gray-100 rounded-full" /></td>
                  <td className="py-4"><div className="h-3 w-20 bg-gray-100 rounded-full" /></td>
                  <td className="py-4"><div className="h-5 w-12 bg-gray-100 rounded-full" /></td>
                  <td className="py-4" />
                </tr>
              ))}

              {/* Rows */}
              {!isLoading && previewUsers.map((user: UserRow) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  {/* Name + avatar */}
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${avatarColor(user.id)}`}>
                        {getInitials(user.first_name, user.last_name)}
                      </div>
                      <span className="text-gray-900 text-sm font-medium truncate">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4">
                    <span className="text-gray-900 text-sm block max-w-[200px] truncate">
                      {user.email}
                    </span>
                  </td>

                  {/* Gender */}
                  <td className="py-4">
                    <span className="text-gray-900 text-sm">{user.gender ?? "—"}</span>
                  </td>

                  {/* Education */}
                  <td className="py-4">
                    <span className="text-gray-900 text-sm">{user.education_level ?? "—"}</span>
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 text-right pr-2">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {!isLoading && previewUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                    No users yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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