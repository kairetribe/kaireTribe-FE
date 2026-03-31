"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, GraduationCap, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/logo";
import { UserProfileFooter } from "@/components/layout/layoutFooter";

const navigation = [
  { name: "Dashboard", href: "/user", icon: Home },
  { name: "Scholarships", href: "/user/scholarships", icon: GraduationCap },
  { name: "Profile", href: "/user/profile", icon: User },
] as const;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({
    item,
    isMobile = false,
  }: {
    item: (typeof navigation)[number];
    isMobile?: boolean;
  }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={() => isMobile && setSidebarOpen(false)}
        className={cn(
          isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 rounded-md font-medium",
          isMobile ? "text-base" : "text-sm"
        )}
      >
        <item.icon
          aria-hidden="true"
          className={cn(
            isActive
              ? "text-gray-500"
              : "text-gray-400 group-hover:text-gray-500",
            "flex-shrink-0 h-6 w-6",
            isMobile ? "mr-4" : "mr-3"
          )}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen">

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
          <div className="relative flex-1 h-full flex flex-col max-w-xs w-full bg-white">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <Logo />
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink key={item.name} item={item} isMobile />
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
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-300 lg:pt-5 lg:pb-4 lg:bg-white">
        <Logo />
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 border-t border-gray-300 p-4">
          <UserProfileFooter />
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="lg:pl-64 flex flex-col flex-1">

        {/* Mobile top bar */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 py-1 lg:hidden bg-white border-b border-gray-200">
          <Logo />
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