"use client"
import { UsersActionBar } from "@/components/admin/manage_users/usersActionBar";
import { UsersTable } from "@/components/admin/manage_users/usersTable";

export default function ManageUsers() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Users</h1>
      <UsersActionBar />
      <UsersTable />
    </div>
  );
}