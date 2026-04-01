import { Filter, X } from "lucide-react";

const scholarships = [
    { id: 1, name: "Shell Scholarship", applicants: 600 },
    { id: 2, name: "Shell Scholarship", applicants: 600 },
    { id: 3, name: "Shell Scholarship", applicants: 600 },
    { id: 4, name: "Shell Scholarship", applicants: 600 },
    { id: 5, name: "Shell Scholarship", applicants: 600 },
];

export const TopScholarships = () => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-900 font-semibold">Top Performing Scholarships</h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-1 border border-indigo-100 text-indigo-600 rounded-md text-[10px] font-medium bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                        <Filter className="w-3 h-3" />
                        Filter
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1 border border-indigo-100 text-indigo-600 rounded-md text-[10px] font-medium bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                        All time
                        <X className="w-3 h-3 ml-1" />
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {scholarships.map((item, index) => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-900 font-medium text-sm w-4">{index + 1}.</span>
                            <span className="text-gray-700 text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-gray-900 text-sm font-medium">{item.applicants} Applicants</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
