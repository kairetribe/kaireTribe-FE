import { useState, useEffect } from "react";
import { Search, Download } from "lucide-react";
import { useAdminData } from "../../../hooks/useAdminData";
import { exportUsersToCSV } from "../../../utils/exportCSV";
import { filterUsers, sortUsers } from "../../../utils/admin/users";

export const UsersActionBar = () => {
  const { search, setSearch, allUsers, sortField, sortDirection } = useAdminData();
  const [inputValue, setInputValue] = useState(search);
  const [exporting, setExporting]   = useState(false);

  // Debounce input → updates global search state (no backend call)
  useEffect(() => {
    const timer = setTimeout(() => setSearch(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  const handleExport = () => {
    setExporting(true);
    // Export all filtered + sorted users, ignoring pagination
    const exportData = sortUsers(filterUsers(allUsers, search), sortField, sortDirection);
    exportUsersToCSV(exportData);
    setTimeout(() => setExporting(false), 800);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      {/* Search */}
      <div className="relative w-full sm:w-[320px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-blue-600" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-blue-100 rounded-full leading-5 bg-white placeholder-blue-600 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
          placeholder="Search by name or email"
        />
      </div>

      {/* Export */}
      <button
        onClick={handleExport}
        disabled={exporting}
        className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all shadow-indigo-200/50 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Download className="h-4 w-4 mr-2" />
        {exporting ? "Exporting..." : "Export CSV"}
      </button>
    </div>
  );
};