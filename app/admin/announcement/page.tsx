"use client";
import { useState } from "react";
import { AnnouncementActionBar } from "@/components/admin/manage_announcements/announcementActionBar";
import { AnnouncementTable } from "@/components/admin/manage_announcements/announcementTable";
import { CreateAnnouncementForm } from "@/components/admin/manage_announcements/createAnnouncementForm";
import { ArrowLeft } from "lucide-react";

export default function ManageAnnouncements() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
      {isCreating ? (
        <>
          <div className="flex">
            <button
              className="inline-flex items-center justify-center px-24 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors disabled:opacity-70"
              onClick={() => setIsCreating(false)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>
          <CreateAnnouncementForm onSuccess={() => setIsCreating(false)} />
        </>
      ) : (
        <>
          <AnnouncementActionBar onCreate={() => setIsCreating(true)} />
          <AnnouncementTable />
        </>
      )}
    </div>
  );
}
