import { ChevronDown } from "lucide-react";

export const CreateAnnouncementForm = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[600px]">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500 font-normal">
                            Announcement subject<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue="New Scholarship"
                            className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-500 font-normal">
                            Send to<span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 text-sm appearance-none outline-none shadow-sm bg-white"
                                defaultValue="Everyone"
                            >
                                <option value="Everyone">Everyone</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <ChevronDown className="h-4 w-4 stroke-[2px]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-500 font-normal">
                        Announcement body<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        rows={12}
                        placeholder="Enter body here"
                        className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-900 focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm resize-none"
                    />
                </div>

                <div className="flex justify-center pt-8">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-24 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
                    >
                        Send announcement
                    </button>
                </div>
            </div>
        </div>
    );
};
