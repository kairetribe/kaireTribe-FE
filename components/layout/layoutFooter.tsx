import { LogOut } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";

export const UserProfileFooter = () => {
  const { session, logout } = useAuthContext();

  const firstName = session?.firstName ?? "";
  const lastName  = session?.lastName  ?? "";
  const email     = session?.email     ?? "";
  const fullName  = `${firstName} ${lastName}`.trim();

  return (
    <div className="flex items-center w-full">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full object-cover border border-gray-200"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=dbeafe&color=1a237e`}
          alt={fullName}
        />
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
      </div>

      {/* Name + email */}
      <div className="ml-3 flex-1 overflow-hidden">
        <p className="text-sm font-medium text-gray-700 truncate">{fullName}</p>
        <p className="text-xs text-gray-500 truncate">{email}</p>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
        title="Sign out"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
};