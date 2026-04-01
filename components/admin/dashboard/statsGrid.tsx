import { BookOpen, Users, User, UserCheck } from "lucide-react";
import { useAdminData } from "../../../hooks/useAdminData";

interface StatCardProps {
  title:   string;
  value:   string;
  icon:    React.ElementType;
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-green-500 rounded-r-full" />
      <div className="ml-4">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className="p-2 rounded-lg bg-blue-50">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  );
};

const formatCount = (n: number): string => n.toLocaleString("en-US");

export const StatsGrid = () => {
  const { allUsers, isLoading } = useAdminData();

  const totalUsers  = allUsers.length;
  const maleUsers   = allUsers.filter((u) => u.gender?.toLowerCase() === "male").length;
  const femaleUsers = allUsers.filter((u) => u.gender?.toLowerCase() === "female").length;

  const stats = [
    { title: "Total Scholarships", value: "800",                         icon: BookOpen  },
    { title: "Total Users",        value: formatCount(totalUsers),        icon: Users     },
    { title: "Male Users",         value: formatCount(maleUsers),         icon: User      },
    { title: "Female Users",       value: formatCount(femaleUsers),       icon: UserCheck },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
            <div className="flex items-center justify-between">
              <div className="ml-4 space-y-2">
                <div className="h-3 w-28 bg-gray-100 rounded-full" />
                <div className="h-7 w-16 bg-gray-100 rounded-full" />
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};