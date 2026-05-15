"use client";

import { useState } from "react";
import { AdminFormSelect } from "@/components/admin/scholarships/adminFormSelect";
import { ScholarshipImageUpload } from "@/components/admin/scholarships/scholarshipImageUpload";
import {
  ADMIN_SCHOLARSHIP_TYPES,
  SCHOLARSHIP_OPEN_TO_OPTIONS,
} from "@/lib/constants/scholarships";
import { createScholarship } from "@/service/admin/createScholarship";
import { validateScholarshipInput } from "@/utils/admin/scholarshipForm";

const fieldClassName =
  "block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm";

interface CreateScholarshipFormProps {
  onSuccess?: () => void;
}

export const CreateScholarshipForm = ({ onSuccess }: CreateScholarshipFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [scholarshipType, setScholarshipType] = useState(ADMIN_SCHOLARSHIP_TYPES[1]);
  const [openTo, setOpenTo] = useState(SCHOLARSHIP_OPEN_TO_OPTIONS[0]);
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setInfoMessage(null);

    if (!image) {
      setError("Please attach a scholarship image.");
      return;
    }

    const payload = {
      image,
      name,
      sponsor,
      openingDate,
      closingDate,
      scholarshipType,
      openTo,
      link,
      details,
    };

    const validationError = validateScholarshipInput(payload);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    const { id, error: submitError } = await createScholarship(payload);
    setIsSubmitting(false);

    if (submitError || !id) {
      setError(submitError ?? "Failed to upload scholarship.");
      return;
    }

    setInfoMessage("Scholarship uploaded successfully.");
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

        <ScholarshipImageUpload file={image} onChange={setImage} onError={setError} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-normal">
              Scholarship name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter scholarship name"
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-normal">
              Sponsor&apos;s name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sponsor}
              onChange={(event) => setSponsor(event.target.value)}
              placeholder="Enter sponsor's name"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-normal">
              Opening date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={openingDate}
              onChange={(event) => setOpeningDate(event.target.value)}
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-normal">
              Closing date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={closingDate}
              onChange={(event) => setClosingDate(event.target.value)}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AdminFormSelect
            label="Scholarship type"
            value={scholarshipType}
            onChange={setScholarshipType}
            options={ADMIN_SCHOLARSHIP_TYPES}
          />
          <AdminFormSelect
            label="Open to"
            value={openTo}
            onChange={setOpenTo}
            options={SCHOLARSHIP_OPEN_TO_OPTIONS}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500 font-normal">
            Scholarship link<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder="https://example.com/apply"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500 font-normal">
            Scholarship details<span className="text-red-500">*</span>
          </label>
          <textarea
            rows={10}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Enter scholarship details"
            className={`${fieldClassName} resize-none`}
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
            className="inline-flex w-full max-w-xl items-center justify-center px-8 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Uploading..." : "Upload Scholarship"}
          </button>
        </div>
      </div>
    </div>
  );
};
