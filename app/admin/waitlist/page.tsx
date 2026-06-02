"use client";

import { useState } from "react";
import { WaitlistActionBar } from "@/components/admin/waitlist/waitlistActionBar";
import { WaitlistTable } from "@/components/admin/waitlist/waitlistTable";

export default function AdminWaitlistPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Waitlist</h1>
        <p className="text-sm text-gray-500 mt-1">
          Everyone who signed up before full access — first name, last name, email, and phone.
        </p>
      </div>
      <WaitlistActionBar search={search} onSearchChange={setSearch} />
      <WaitlistTable search={search} />
    </div>
  );
}
