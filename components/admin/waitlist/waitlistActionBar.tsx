"use client";

import { useEffect, useState } from "react";
import { Search, Download } from "lucide-react";
import { fetchWaitlist } from "@/service/admin/fetchWaitlist";
import { exportWaitlistToCSV, filterWaitlistEntries } from "@/utils/admin/waitlist";

interface WaitlistActionBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const WaitlistActionBar = ({ search, onSearchChange }: WaitlistActionBarProps) => {
  const [inputValue, setInputValue] = useState(search);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  const handleExport = async () => {
    setExporting(true);
    setExportError(null);
    const { data, error } = await fetchWaitlist();
    if (error) {
      setExportError(error);
      setExporting(false);
      return;
    }
    exportWaitlistToCSV(filterWaitlistEntries(data, search));
    setExporting(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-blue-600" />
          </div>
          <input
            type="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Search by name, email, or phone"
            className="block w-full pl-10 pr-3 py-2.5 border border-blue-100 rounded-full text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={() => void handleExport()}
          disabled={exporting}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 disabled:opacity-70"
        >
          <Download className="h-4 w-4 mr-2" />
          {exporting ? "Exporting…" : "Export CSV"}
        </button>
      </div>

      {exportError && <p className="text-sm text-red-500">{exportError}</p>}
    </div>
  );
};
