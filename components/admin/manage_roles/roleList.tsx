import { MoreHorizontal } from "lucide-react";

interface RoleUser {
    id: string;
    name: string;
    role: string;
    email: string;
}

const users: RoleUser[] = [
    { id: '1', name: 'Aku-Ibe Chikire', role: 'Admin', email: 'chikire@gmail.com' },
    { id: '2', name: 'Aku-Ibe Chikire', role: 'Admin', email: 'chikire@gmail.com' },
    { id: '3', name: 'Aku-Ibe Chikire', role: 'Admin', email: 'chikire@gmail.com' },
    { id: '4', name: 'Aku-Ibe Chikire', role: 'Admin', email: 'chikire@gmail.com' },
];

export const RoleList = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
            <div className="grid grid-cols-12 px-8 py-6 border-b border-transparent">
                <div className="col-span-4 text-xs font-medium text-gray-500">Name</div>
                <div className="col-span-3 text-xs font-medium text-gray-500">Role</div>
                <div className="col-span-4 text-xs font-medium text-gray-500">Email</div>
                <div className="col-span-1"></div>
            </div>

            <div className="px-2">
                {users.map((user) => (
                    <div key={user.id} className="grid grid-cols-12 px-6 py-6 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors">
                        <div className="col-span-4 text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="col-span-3 text-sm text-gray-900">{user.role}</div>
                        <div className="col-span-4 text-sm text-gray-900">{user.email}</div>
                        <div className="col-span-1 flex justify-end">
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
