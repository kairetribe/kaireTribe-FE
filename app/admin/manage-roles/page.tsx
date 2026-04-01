"use client"
import { RoleActionBar } from "@/components/admin/manage_roles/roleActionBar";
import { RoleList } from "@/components/admin/manage_roles/roleList";

export default function ManageRoles() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Roles</h1>
            <RoleActionBar />
            <RoleList />
        </div>
    );
}
