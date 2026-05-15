export interface UserGrowthPoint {
  name: string;
  value: number;
}

export interface TopScholarshipStat {
  id: string;
  name: string;
  applicants: number;
}

export interface AdminDashboardStats {
  totalScholarships: number;
  totalUsers: number;
  maleUsers: number;
  femaleUsers: number;
  userGrowth: UserGrowthPoint[];
  topScholarships: TopScholarshipStat[];
}
