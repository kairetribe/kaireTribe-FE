import { ChevronLeft, ChevronRight } from "lucide-react";

export const ScholarshipPagination = () => {
    return (
        <div className="flex items-center justify-end gap-8 mt-8 text-sm text-gray-500">
            <span>Page 1 of 30</span>

            <div className="flex items-center gap-2">
                <button className="p-1 rounded bg-[#5c54a0] text-white hover:bg-[#4a4385] disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                    <button className="w-6 h-7 flex items-center justify-center rounded hover:bg-gray-100">1</button>
                    <button className="w-6 h-7 flex items-center justify-center rounded hover:bg-gray-100">2</button>
                    <button className="w-6 h-7 flex items-center justify-center rounded border border-[#5c54a0] text-[#5c54a0] font-medium">3</button>
                    <span className="px-1">...</span>
                    <button className="w-6 h-7 flex items-center justify-center rounded hover:bg-gray-100">12</button>
                    <button className="w-6 h-7 flex items-center justify-center rounded hover:bg-gray-100">13</button>
                    <button className="w-6 h-7 flex items-center justify-center rounded hover:bg-gray-100">14</button>
                </div>

                <button className="p-1 rounded bg-[#1a237e] text-white hover:bg-indigo-900 disabled:opacity-50">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
