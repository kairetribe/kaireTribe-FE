"use client";

import { Header } from "@/components/admin/dashboard/header";
import { StatsGrid } from "@/components/admin/dashboard/statsGrid";
import { GrowthChart } from "@/components/admin/dashboard/growthChart";
import { TopScholarships } from "@/components/admin/dashboard/topScholarships";
import { UserList } from "@/components/admin/dashboard/userList";
import { useAdminData } from "@/hooks/useAdminData";

export default function AdminHome() {
  const { dashboardError } = useAdminData();

  return (
    <div className="flex flex-col gap-8">
      <Header />

      {dashboardError && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-500">
          {dashboardError}
        </div>
      )}

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>
        <div className="lg:col-span-1">
          <TopScholarships />
        </div>
      </div>

      <UserList />
    </div>
  );
}
