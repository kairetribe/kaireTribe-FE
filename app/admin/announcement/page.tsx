"use client"
import { useState } from "react";
import { AnnouncementActionBar } from "@/components/admin/manage_announcements/announcementActionBar";
import { AnnouncementTable } from "@/components/admin/manage_announcements/announcementTable";
import { CreateAnnouncementForm } from "@/components/admin/manage_announcements/createAnnouncementForm";
import { ScholarshipPagination } from "@/components/admin/pagination";

export default function ManageAnnouncements() {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            {isCreating ? (
                <CreateAnnouncementForm />
            ) : (
                <>
                    <AnnouncementActionBar onCreate={() => setIsCreating(true)} />
                    <AnnouncementTable />
                    <ScholarshipPagination />
                </>
            )}
        </div>
    );
}
