"use client";

import DashboardLayout from "@/components/layout/adminDashboard";
import { AdminDataProvider } from "@/context/adminData";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return(
        <DashboardLayout>
            <AdminDataProvider>
                {children}
            </AdminDataProvider>
        </DashboardLayout>
    )
}