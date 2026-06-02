"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleActionBar } from "@/components/admin/manage_roles/roleActionBar";
import { RoleList } from "@/components/admin/manage_roles/roleList";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  fetchStaffUsers,
  type StaffUserRow,
} from "@/service/admin/fetchStaffUsers";

export default function ManageRoles() {
  const router = useRouter();
  const { role, isLoading: isAuthLoading } = useAuthContext();
  const [users, setUsers] = useState<StaffUserRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    if (role !== "admin") {
      router.replace("/admin");
    }
  }, [role, isAuthLoading, router]);

  const loadStaffUsers = () => {
    setIsLoading(true);
    fetchStaffUsers().then(({ data, error: fetchError }) => {
      setUsers(data);
      setError(fetchError);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isAuthLoading || role !== "admin") return;

    let cancelled = false;

    fetchStaffUsers().then(({ data, error: fetchError }) => {
      if (cancelled) return;
      setUsers(data);
      setError(fetchError);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [isAuthLoading, role]);

  if (isAuthLoading || role !== "admin") {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-gray-900">Manage Roles</h1>
      <RoleActionBar onStaffCreated={loadStaffUsers} />
      <RoleList users={users} isLoading={isLoading} error={error} />
    </div>
  );
}
