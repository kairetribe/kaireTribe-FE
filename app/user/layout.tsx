"use client";

import DashboardLayout from "@/components/layout/userDashboard";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}