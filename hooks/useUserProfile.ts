"use client";

import { useCallback, useEffect, useState } from "react";
import type { UserProfile } from "@/lib/types/auth";
import { fetchCurrentUserProfile } from "@/service/user/userProfile";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await fetchCurrentUserProfile();
    setProfile(data);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const setProfileFromServer = useCallback((next: UserProfile) => {
    setProfile(next);
    setError(null);
  }, []);

  return {
    profile,
    isLoading,
    error,
    loadProfile,
    setProfileFromServer,
  };
}
