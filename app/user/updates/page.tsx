"use client";

import { useCallback, useEffect, useState } from "react";
import { UpdateList } from "@/components/user/updates/updateList";
import { ViewUserUpdateModal } from "@/components/user/updates/viewUserUpdateModal";
import { fetchCurrentUserProfile } from "@/service/user/userProfile";
import { fetchUserUpdates } from "@/service/user/fetchUserUpdates";
import type { AnnouncementRow } from "@/lib/types/announcement";

type UpdatesTab = "events" | "newsletters";

export default function UserUpdatesPage() {
  const [activeTab, setActiveTab] = useState<UpdatesTab>("events");
  const [events, setEvents] = useState<AnnouncementRow[]>([]);
  const [newsletters, setNewsletters] = useState<AnnouncementRow[]>([]);
  const [selectedUpdate, setSelectedUpdate] = useState<AnnouncementRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUpdates = useCallback(async () => {
    setIsLoading(true);
    const { data: profile } = await fetchCurrentUserProfile();
    const { events: eventItems, newsletters: newsletterItems, error: fetchError } =
      await fetchUserUpdates(profile);

    setEvents(eventItems);
    setNewsletters(newsletterItems);
    setError(fetchError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadUpdates();
  }, [loadUpdates]);

  const visibleItems = activeTab === "events" ? events : newsletters;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events & Newsletters</h1>
        <p className="mt-2 text-sm text-gray-500">
          Stay up to date with KaireTribe events and newsletters relevant to your profile.
        </p>
      </div>

      <div className="inline-flex rounded-full bg-gray-100 p-1">
        <TabButton
          label={`Events (${events.length})`}
          isActive={activeTab === "events"}
          onClick={() => setActiveTab("events")}
        />
        <TabButton
          label={`Newsletters (${newsletters.length})`}
          isActive={activeTab === "newsletters"}
          onClick={() => setActiveTab("newsletters")}
        />
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-500">
          {error}
        </div>
      )}

      {isLoading && !error && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && !error && (
        <UpdateList
          items={visibleItems}
          emptyMessage={
            activeTab === "events"
              ? "No events are available for you right now."
              : "No newsletters are available for you right now."
          }
          onSelect={setSelectedUpdate}
        />
      )}

      <ViewUserUpdateModal
        isOpen={selectedUpdate !== null}
        onClose={() => setSelectedUpdate(null)}
        update={selectedUpdate}
      />
    </div>
  );
}

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive ? "bg-white text-[#1a237e] shadow-sm" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );
}
