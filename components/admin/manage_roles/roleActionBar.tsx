import { Search, CirclePlus } from "lucide-react";
import { useState } from "react";
import { ProfileCreationModal } from "../../ui/modals/profileCreationModal";
import { CreateRoleModal } from "../../ui/modals/createRoleModal";

export const RoleActionBar = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div className="relative w-full sm:w-[320px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-primary" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-blue-100 rounded-lg leading-5 bg-white placeholder-primary focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                        placeholder="Search"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setIsRoleModalOpen(true)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-indigo-100 text-sm font-medium rounded-lg text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-shadow"
                    >
                        <CirclePlus className="h-5 w-5 mr-2" />
                        Create new role
                    </button>
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#002699] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md hover:shadow-lg transition-shadow"
                    >
                        <CirclePlus className="h-5 w-5 mr-2" />
                        Create new profile
                    </button>
                </div>
            </div>

            <ProfileCreationModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />

            <CreateRoleModal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
            />
        </>
    );
};
