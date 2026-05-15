"use client";

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAdminData } from "@/hooks/useAdminData";

export const GrowthChart = () => {
  const { dashboardStats, isDashboardLoading } = useAdminData();
  const chartData = dashboardStats?.userGrowth ?? [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <h3 className="text-gray-900 font-semibold">User Growth</h3>
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-3 py-1.5 rounded-md">
          Last 12 months
        </span>
      </div>

      {isDashboardLoading ? (
        <div className="h-[250px] w-full bg-gray-50 rounded-xl animate-pulse" />
      ) : chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
          No user growth data yet
        </div>
      ) : (
        <div className="h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical stroke="#f0f0f0" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
                tickMargin={10}
                interval="preserveStartEnd"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
                cursor={{ stroke: "#3B82F6", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#60A5FA"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
