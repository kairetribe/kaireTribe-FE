import supabase from "@/lib/supabase";
import { fetchActiveScholarships } from "@/service/scholarships/fetchScholarships";
import type { ScholarshipRecord } from "@/lib/types/scholarship";
import {
  pickScholarshipsForUser,
  pickTrendingScholarships,
  type UserProfileMatchInput,
} from "@/utils/user/matchScholarshipsForUser";

export interface UserDashboardData {
  firstName: string;
  totalActiveCount: number;
  trending: ScholarshipRecord[];
  forYou: ScholarshipRecord[];
  error: string | null;
}

interface UserProfileRow {
  first_name: string;
  education_level: string | null;
  interest: string | null;
}

async function fetchUserProfile(userId: string): Promise<{
  profile: UserProfileRow | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("users")
    .select("first_name, education_level, interest")
    .eq("id", userId)
    .maybeSingle();

  if (error) return { profile: null, error: error.message };
  return { profile: data as UserProfileRow | null, error: null };
}

export async function fetchUserDashboard(fallbackFirstName = "Scholar"): Promise<UserDashboardData> {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;

  const { data: scholarships, error: scholarshipsError } = await fetchActiveScholarships();
  if (scholarshipsError) {
    return {
      firstName: fallbackFirstName,
      totalActiveCount: 0,
      trending: [],
      forYou: [],
      error: scholarshipsError,
    };
  }

  if (!userId || sessionError) {
    return {
      firstName: fallbackFirstName,
      totalActiveCount: scholarships.length,
      trending: pickTrendingScholarships(scholarships),
      forYou: pickTrendingScholarships(scholarships),
      error: null,
    };
  }

  const { profile, error: profileError } = await fetchUserProfile(userId);
  const firstName = profile?.first_name ?? fallbackFirstName;

  const matchInput: UserProfileMatchInput = {
    educationLevel: profile?.education_level ?? null,
    interest: profile?.interest ?? null,
  };

  return {
    firstName,
    totalActiveCount: scholarships.length,
    trending: pickTrendingScholarships(scholarships),
    forYou: pickScholarshipsForUser(scholarships, matchInput),
    error: profileError,
  };
}
