"use client";

import { useEffect, useState, type FormEvent } from "react";
import SelectField from "@/components/auth/ui/selectField";
import CountriesSelect from "@/components/auth/ui/countriesSelect";
import {
  EDUCATION_LEVELS,
  FIELDS_OF_STUDY,
  INTEREST_OPTIONS,
  SCHOLARSHIP_TYPES,
} from "@/lib/constants/allCountries";
import type { UserProfile } from "@/lib/types/auth";
import { updateUserScholarshipProfile } from "@/service/user/userProfile";

interface EditScholarshipProfileProps {
  profile: UserProfile | null;
  isLoading: boolean;
  loadError: string | null;
  onSaved: (profile: UserProfile) => void;
}

export const EditScholarshipProfile = ({
  profile,
  isLoading,
  loadError,
  onSaved,
}: EditScholarshipProfileProps) => {
  const [educationLevel, setEducationLevel] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [interest, setInterest] = useState("");
  const [scholarshipType, setScholarshipType] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setEducationLevel(profile.education_level ?? "");
    setFieldOfStudy(profile.field_of_study ?? "");
    setInterest(profile.interest ?? "");
    setScholarshipType(profile.scholarship_type ?? "");
    setCountries(profile.countries ?? []);
  }, [profile]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);
    setIsSaving(true);

    const { data, error } = await updateUserScholarshipProfile({
      educationLevel,
      fieldOfStudy,
      interest,
      scholarshipType,
      countries,
    });
    setIsSaving(false);

    if (error || !data) {
      setFormError(error ?? "Failed to update scholarship profile.");
      return;
    }

    onSaved(data);
    setSuccess("Scholarship profile updated successfully.");
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading scholarship profile…</p>;
  }

  if (loadError) {
    return <p className="text-sm text-red-500">{loadError}</p>;
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Edit Scholarship Profile</h2>

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

      <form className="space-y-2" onSubmit={(event) => void handleSubmit(event)}>
        <SelectField
          label="Education Level"
          value={educationLevel}
          onChange={setEducationLevel}
          options={EDUCATION_LEVELS}
          placeholder="Select your education level"
        />
        <SelectField
          label="Field of Study"
          value={fieldOfStudy}
          onChange={setFieldOfStudy}
          options={FIELDS_OF_STUDY}
          placeholder="Select your field of study"
        />
        <SelectField
          label="Interest"
          value={interest}
          onChange={setInterest}
          options={INTEREST_OPTIONS}
        />
        <SelectField
          label="Scholarship Type"
          value={scholarshipType}
          onChange={setScholarshipType}
          options={SCHOLARSHIP_TYPES}
        />
        <CountriesSelect selected={countries} onChange={setCountries} />

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
