import { MoreHorizontal } from "lucide-react";

interface Announcement {
    id: string;
    sn: number;
    subject: string;
    date: string;
    recipient: 'Everyone';
}

const announcements: Announcement[] = Array(12).fill(null).map((_, i) => ({
    id: `announcement-${i}`,
    sn: i + 1,
    subject: "New Scholarship Available",
    date: "12th February, 2026",
    recipient: "Everyone"
}));

export const AnnouncementTable = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
            <div className="grid grid-cols-[100px_3fr_2fr_1.5fr_50px] px-8 py-6 border-b border-transparent">
                <div className="text-xs font-medium text-gray-500">S/N</div>
                <div className="text-xs font-medium text-gray-500">Subject</div>
                <div className="text-xs font-medium text-gray-500">Date Created</div>
                <div className="text-xs font-medium text-gray-500">Receipient</div>
                <div className=""></div>
            </div>

            <div className="px-2">
                {announcements.map((item) => (
                    <div key={item.id} className="grid grid-cols-[100px_3fr_2fr_1.5fr_50px] px-6 py-4 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors">
                        <div className="text-sm font-medium text-gray-900 pl-2">{item.sn}</div>
                        <div className="text-sm text-gray-700">{item.subject}</div>
                        <div className="text-sm text-gray-700">{item.date}</div>
                        <div className="text-sm text-gray-700">{item.recipient}</div>
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
