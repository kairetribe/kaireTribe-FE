"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ScholarshipActionBar } from "@/components/admin/scholarships/scholarshipActionBar";
import { ScholarshipList } from "@/components/admin/scholarships/scholarshipList";
import { CreateScholarshipForm } from "@/components/admin/scholarships/createScholarshipForm";

export default function AdminScholarships() {
  const [isCreating, setIsCreating] = useState(false);
  const [listRefreshKey, setListRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
      {isCreating ? (
        <>
          <div className="flex">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>
          <CreateScholarshipForm
            onSuccess={() => {
              setIsCreating(false);
              setListRefreshKey((key) => key + 1);
            }}
          />
        </>
      ) : (
        <>
          <ScholarshipActionBar onCreate={() => setIsCreating(true)} />
          <ScholarshipList refreshKey={listRefreshKey} />
        </>
      )}
    </div>
  );
}
