import supabase from "@/lib/supabase";

async function getAuthenticatedUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user.id) return null;
  return data.session.user.id;
}

export async function updateScholarshipVerification(
  scholarshipId: string,
  isVerified: boolean
): Promise<{ error: string | null }> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return { error: "Sign in as an admin to verify scholarships." };

  const { error } = await supabase
    .from("scholarships")
    .update({ is_verified: isVerified })
    .eq("id", scholarshipId);

  if (error) return { error: error.message };
  return { error: null };
}
