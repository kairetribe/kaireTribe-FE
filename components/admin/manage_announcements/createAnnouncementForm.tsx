"use client";

import { useState } from "react";
import { AudienceMultiSelect } from "@/components/admin/manage_announcements/audienceMultiSelect";
import { createAnnouncement } from "@/service/admin/createAnnouncement";
import type { AudienceFilters } from "@/lib/types/announcement";

const EMPTY_AUDIENCE: AudienceFilters = {
  educationLevel: [],
  fieldOfStudy: [],
  interest: [],
  scholarshipType: [],
  role: [],
};

interface CreateAnnouncementFormProps {
  onSuccess?: () => void;
}

export const CreateAnnouncementForm = ({ onSuccess }: CreateAnnouncementFormProps) => {
  const [subject, setSubject] = useState("New Announcement");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<AudienceFilters>(EMPTY_AUDIENCE);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setInfoMessage(null);
    setIsSubmitting(true);

    const { id, error: submitError } = await createAnnouncement({ subject, body, audience });
    setIsSubmitting(false);

    if (submitError || !id) {
      setError(submitError ?? "Failed to send announcement.");
      return;
    }

    setInfoMessage("Announcement sent successfully.");
    onSuccess?.();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[600px]">
      <div className="max-w-4xl mx-auto space-y-8">
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        {infoMessage && (
          <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{infoMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-normal">
              Announcement subject<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-normal">
              Send to<span className="text-red-500">*</span>
            </label>
            <AudienceMultiSelect value={audience} onChange={setAudience} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500 font-normal">
            Announcement body<span className="text-red-500">*</span>
          </label>
          <textarea
            rows={12}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Enter body here"
            className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-900 focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm resize-none"
          />
        </div>

        <div className="flex justify-center pt-8">
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-24 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send announcement"}
          </button>
        </div>
      </div>
    </div>
  );
};
