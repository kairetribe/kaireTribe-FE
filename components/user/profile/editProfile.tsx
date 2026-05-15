"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { UserProfile } from "@/lib/types/auth";
import { updateUserBasicProfile } from "@/service/user/userProfile";
import { toSession } from "@/service/authProfile";
import { useAuthContext } from "@/hooks/useAuthContext";

interface EditProfileProps {
  profile: UserProfile | null;
  isLoading: boolean;
  loadError: string | null;
  onSaved: (profile: UserProfile) => void;
}

export const EditProfile = ({ profile, isLoading, loadError, onSaved }: EditProfileProps) => {
  const { saveSession } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setEmail(profile.email);
  }, [profile]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);
    setIsSaving(true);

    const { data, error } = await updateUserBasicProfile({ firstName, lastName, email });
    setIsSaving(false);

    if (error || !data) {
      setFormError(error ?? "Failed to update profile.");
      return;
    }

    saveSession(toSession(data));
    onSaved(data);
    setSuccess("Profile updated successfully.");
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading profile…</p>;
  }

  if (loadError) {
    return <p className="text-sm text-red-500">{loadError}</p>;
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Edit Profile</h2>

      {formError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-500">
          {formError}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          {success}
        </div>
      )}

      <form className="space-y-6" onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Enter your last name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            disabled
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-lg border disabled:opacity-50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#1a237e] text-white py-3 rounded-md font-medium hover:bg-indigo-900 transition-colors shadow-sm disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
