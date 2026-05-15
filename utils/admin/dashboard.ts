import type { UserGrowthPoint, TopScholarshipStat } from "@/lib/types/adminDashboard";

export interface UserCreatedRow {
  created_at: string;
  gender: string | null;
}

interface ApplicationRow {
  scholarship_id: string;
  scholarships: { name: string } | { name: string }[] | null;
}

export function countUsersByGender(users: UserCreatedRow[]) {
  const maleUsers = users.filter((u) => u.gender?.toLowerCase() === "male").length;
  const femaleUsers = users.filter((u) => u.gender?.toLowerCase() === "female").length;
  return { maleUsers, femaleUsers, totalUsers: users.length };
}

export function buildCumulativeUserGrowth(users: UserCreatedRow[], months = 12): UserGrowthPoint[] {
  const now = new Date();
  const points: UserGrowthPoint[] = [];

  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - offset + 1, 0, 23, 59, 59, 999);
    const label = monthDate.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

    const value = users.filter((user) => new Date(user.created_at) <= monthEnd).length;
    points.push({ name: label, value });
  }

  return points;
}

export function buildTopScholarships(applications: ApplicationRow[], limit = 5): TopScholarshipStat[] {
  const counts = new Map<string, { name: string; applicants: number }>();

  for (const row of applications) {
    const scholarship = Array.isArray(row.scholarships) ? row.scholarships[0] : row.scholarships;
    const name = scholarship?.name ?? "Unknown scholarship";
    const current = counts.get(row.scholarship_id);
    if (current) {
      current.applicants += 1;
    } else {
      counts.set(row.scholarship_id, { name, applicants: 1 });
    }
  }

  return [...counts.entries()]
    .map(([id, item]) => ({ id, ...item }))
    .sort((a, b) => b.applicants - a.applicants)
    .slice(0, limit);
}
