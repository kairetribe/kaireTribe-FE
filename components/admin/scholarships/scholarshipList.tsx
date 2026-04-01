import { MoreHorizontal } from "lucide-react";

interface Scholarship {
    id: string;
    sn: number;
    name: string;
    sponsor: string;
    closingDate: string;
    status: 'Active';
    imageUrl: string;
}

const scholarships: Scholarship[] = Array(8).fill(null).map((_, i) => ({
    id: `scholarship-${i}`,
    sn: i + 1,
    name: "SNEPCo National University Scholarship",
    sponsor: "NNPC",
    closingDate: "20th, February 2026",
    status: "Active",
    imageUrl: "https://ui-avatars.com/api/?name=SNEPCo&background=random"
}));

export const ScholarshipList = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
            <div className="grid grid-cols-[80px_3fr_1.5fr_1.5fr_1fr_50px] px-8 py-6 border-b border-transparent">
                <div className="text-xs font-medium text-gray-500">S/N</div>
                <div className="text-xs font-medium text-gray-500">Name</div>
                <div className="text-xs font-medium text-gray-500">Sponsor</div>
                <div className="text-xs font-medium text-gray-500">Closing Date</div>
                <div className="text-xs font-medium text-gray-500">Status</div>
                <div className=""></div>
            </div>

            <div className="px-2">
                {scholarships.map((item) => (
                    <div key={item.id} className="grid grid-cols-[80px_3fr_1.5fr_1.5fr_1fr_50px] px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors">
                        <div className="text-sm font-medium text-gray-900 pl-2">{item.sn}</div>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex-shrink-0 bg-yellow-100 rounded flex items-center justify-center text-xs font-bold text-yellow-700 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-red-500 to-yellow-400"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 max-w-[220px] leading-tight">{item.name}</span>
                        </div>
                        <div className="text-sm text-gray-900">{item.sponsor}</div>
                        <div className="text-sm text-gray-900">{item.closingDate}</div>
                        <div className="">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                                {item.status}
                            </span>
                        </div>
                        <div className="flex justify-end pr-2">
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
