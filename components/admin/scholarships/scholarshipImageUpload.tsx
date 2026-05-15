"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { MAX_SCHOLARSHIP_IMAGE_BYTES } from "@/lib/constants/scholarships";

interface ScholarshipImageUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  onError?: (message: string | null) => void;
}

export const ScholarshipImageUpload = ({ file, onChange, onError }: ScholarshipImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (selected: File | null) => {
    onError?.(null);
    if (!selected) {
      onChange(null);
      setPreviewUrl(null);
      return;
    }

    if (!selected.type.startsWith("image/")) {
      onError?.("Please upload an image file.");
      return;
    }

    if (selected.size > MAX_SCHOLARSHIP_IMAGE_BYTES) {
      onError?.("Image must be 5MB or smaller.");
      return;
    }

    onChange(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const clearImage = () => {
    handleFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-500 font-normal">
        Attach image<span className="text-red-500">*</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
      />

      {previewUrl && file ? (
        <div className="relative rounded-md border border-gray-200 overflow-hidden h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Scholarship preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={clearImage}
            aria-label="Remove image"
            className="absolute top-3 right-3 rounded-full bg-white/90 p-1.5 text-gray-600 shadow hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-48 w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-gray-200 bg-white text-gray-400 transition-colors hover:border-indigo-300 hover:bg-gray-50/50"
        >
          <ImageIcon className="h-10 w-10 stroke-[1.25]" />
          <span className="text-sm text-gray-500">Not more than 5mb</span>
        </button>
      )}
    </div>
  );
};
