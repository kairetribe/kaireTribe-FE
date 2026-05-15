"use client";

import { useAdminData } from "@/hooks/useAdminData";

export const TopScholarships = () => {
  const { dashboardStats, isDashboardLoading } = useAdminData();
  const scholarships = dashboardStats?.topScholarships ?? [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-900 font-semibold">Top Performing Scholarships</h3>
        <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-2.5 py-1 rounded-md">
          By applications
        </span>
      </div>

      {isDashboardLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-5 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : scholarships.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No applications recorded yet</p>
      ) : (
        <div className="space-y-6">
          {scholarships.map((item, index) => (
            <div key={item.id} className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-gray-900 font-medium text-sm w-4 shrink-0">{index + 1}.</span>
                <span className="text-gray-700 text-sm font-medium truncate">{item.name}</span>
              </div>
              <span className="text-gray-900 text-sm font-medium shrink-0">
                {item.applicants.toLocaleString("en-US")} Applicants
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
