"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    MicVocal,
    GraduationCap,
    X,
    Menu,
    ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfileFooter } from "@/components/layout/layoutFooter";
import Logo from "@/components/ui/logo";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Roles", href: "/admin/manage-roles", icon: ShieldCheck },
    { name: "Scholarships", href: "/admin/scholarships", icon: GraduationCap },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Announcements", href: "/admin/announcement", icon: MicVocal },
] as const;

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const NavLink = ({ item }: { item: (typeof navigation)[number] }) => {
        const isActive = pathname === item.href;

        return (
            <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                    isActive
                        ? "bg-[#002699] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-md mx-3 transition-colors"
                )}
            >
                <item.icon
                    aria-hidden="true"
                    className={cn(
                        isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-5 w-5"
                    )}
                />
                {item.name}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* ── Mobile sidebar drawer ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Drawer panel */}
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">

                        {/* Close button */}
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X aria-hidden="true" className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            {/* Standardized to use shared Logo component (was inline img + span) */}
                            <div className="px-4 mb-4">
                                <Logo />
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <NavLink key={item.name} item={item} />
                                ))}
                            </nav>
                        </div>

                        <div className="flex-shrink-0 border-t border-gray-200 p-4">
                            <UserProfileFooter />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Desktop sidebar ── */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-white">
                <Logo />
                <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
                    <nav className="flex-1 px-2 space-y-1">
                        {navigation.map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                    </nav>
                </div>
                <div className="flex-shrink-0 p-4 mb-4">
                    <UserProfileFooter />
                </div>
            </div>

            {/* ── Main content area ── */}
            <div className="lg:pl-64 flex flex-col flex-1">

                {/* Mobile top bar */}
                <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                {/* Page content — replaces <Outlet /> */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}