"use client";

import { useCallback, useEffect, useState } from "react";
import { User, BookOpen, Lock, Settings, Bookmark, FileCheck } from "lucide-react";
import { SavedScholarships } from "@/components/user/profile/savedScholarships";
import { EditProfile } from "@/components/user/profile/editProfile";
import { EditScholarshipProfile } from "@/components/user/profile/editScholarshipProfile";
import { Security } from "@/components/user/profile/security";
import { AppliedScholarships } from "@/components/user/profile/appliedScholarships";
import { fetchAppliedScholarshipsCount } from "@/service/user/scholarshipEngagement";

export default function Profile() {
    const [activeTab, setActiveTab] = useState<"saved" | "applied-scholarships" | "settings">("saved");
    const [appliedScholarshipsCount, setAppliedScholarshipsCount] = useState(0);
    const [settingsTab, setSettingsTab] = useState<"profile" | "scholarship" | "security">("profile");

    const loadAppliedCount = useCallback(async () => {
        const { count } = await fetchAppliedScholarshipsCount();
        setAppliedScholarshipsCount(count);
    }, []);

    useEffect(() => {
        void loadAppliedCount();
    }, [loadAppliedCount]);
    return (
        <div className="space-y-8 min-h-screen bg-transparent">
            <div className="border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`
                            whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                            ${activeTab === 'saved'
                                ? 'border-[#1a237e] text-[#1a237e]'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                        <Bookmark className="w-4 h-4" />
                        Saved Scholarships
                    </button>
                    <button
                        onClick={() => setActiveTab('applied-scholarships')}
                        className={`
                            whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                            ${activeTab === 'applied-scholarships'
                                ? 'border-[#1a237e] text-[#1a237e]'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                        <FileCheck className="w-4 h-4" />
                        Applied Scholarships ({appliedScholarshipsCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`
                             whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                             ${activeTab === 'settings'
                                ? 'border-[#1a237e] text-[#1a237e]'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </nav>
            </div>
            {activeTab === 'saved' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <SavedScholarships />
                </div>
            ) : activeTab === 'applied-scholarships' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <AppliedScholarships onCountChange={setAppliedScholarshipsCount} />
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-full lg:w-64 space-y-2">
                        <button
                            onClick={() => setSettingsTab('profile')}
                            className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors ${settingsTab === 'profile' ? 'bg-blue-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <User className={`w-4 h-4 ${settingsTab === 'profile' ? 'text-yellow-500' : 'text-gray-500'}`} />
                                Edit Profile
                            </div>
                            <span className="text-blue-700">›</span>
                        </button>

                        <button
                            onClick={() => setSettingsTab('scholarship')}
                            className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors ${settingsTab === 'scholarship' ? 'bg-blue-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className={`w-4 h-4 ${settingsTab === 'scholarship' ? 'text-green-600' : 'text-gray-500'}`} />
                                Edit Scholarship Profile
                            </div>
                            <span className="text-blue-700">›</span>
                        </button>

                        <button
                            onClick={() => setSettingsTab('security')}
                            className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors ${settingsTab === 'security' ? 'bg-blue-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Lock className={`w-4 h-4 ${settingsTab === 'security' ? 'text-purple-500' : 'text-gray-500'}`} />
                                Security
                            </div>
                            <span className="text-blue-700">›</span>
                        </button>
                    </div>
                    <div className="flex-1 max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        {settingsTab === 'profile' && <EditProfile />}
                        {settingsTab === 'scholarship' && <EditScholarshipProfile />}
                        {settingsTab === 'security' && <Security />}
                    </div>
                </div>
            )}
        </div>
    );
}
