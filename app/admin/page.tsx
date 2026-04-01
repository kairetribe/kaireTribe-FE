"use client"
import { Header } from "@/components/admin/dashboard/header";
import { StatsGrid } from "@/components/admin/dashboard/statsGrid";
import { GrowthChart } from "@/components/admin/dashboard/growthChart";
import { TopScholarships } from "@/components/admin/dashboard/topScholarships";
import { UserList } from "@/components/admin/dashboard/userList";

export default function AdminHome() {
    return (
        <div className="flex flex-col gap-8">
            <Header />
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
