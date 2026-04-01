'use client';
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import posterImage from "@/public/images/dashboard/scholarship-poster.png";
import ScholarshipCard from "@/components/scholarshipCard";

const MOCK_SCHOLARSHIPS = Array(9).fill({
    id: "mock-1",
    title: "XYZ Scholarship",
    description: "Lorem ipsum itsa dolor Lorem ipsum itsa dolor Lorem ipsum itsa dolorLorem ipsum itsa dolor...",
    image: posterImage,
    type: "Full Scholarship",
    isFull: true
}).map((item, idx) => ({
    ...item,
    id: `mock-${idx}`,
    type: idx % 2 === 0 ? "Full Scholarship" : "Partial Scholarship",
    isFull: idx % 2 === 0
}));

export default function Scholarships() {
    const [_applyingId, setApplyingId] = useState<string | null>(null);

    const [activeFilters, setActiveFilters] = useState(["Local", "International", "Full Scholarship"]);

    const handleRemoveFilter = (filter: string) => {
        setActiveFilters(activeFilters.filter(f => f !== filter));
    };

    const handleApply = async (scholarshipId: string) => {
        if (!confirm("Confirm application?")) return;
        setApplyingId(scholarshipId);
        setTimeout(() => {
            alert("Application submitted successfully!");
            setApplyingId(null);
        }, 1000);
    };

    return (
        <div className="space-y-8 min-h-screen bg-white md:bg-transparent">
            <div className="flex flex-col space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                            <span>Filter</span>
                            <Filter className="w-4 h-4" />
                        </button>

                        {activeFilters.map(filter => (
                            <div key={filter} className="flex items-center gap-2 px-3 py-2 bg-[#EEF2FF] text-[#4361EE] rounded-lg text-sm font-medium">
                                <span>{filter}</span>
                                <button onClick={() => handleRemoveFilter(filter)} className="hover:text-blue-800">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="block w-full pl-10 pr-3 py-2.5 border border-blue-100 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm text-gray-700"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_SCHOLARSHIPS.map((scholarship) => (
                    <ScholarshipCard key={scholarship.id} data={scholarship} />
                ))}
            </div>
        </div>
    );
}