import { ChevronDown } from 'lucide-react';

export const EditScholarshipProfile = () => {
    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Edit Scholarship Profile</h2>

            <form className="space-y-6">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                    <div className="relative">
                        <select className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-500">
                            <option>Enter your education Level</option>
                            <option>Undergraduate</option>
                            <option>Postgraduate</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-blue-800">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <div className="relative">
                        <select className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-500">
                            <option>Enter your Field of Study</option>
                            <option>Engineering</option>
                            <option>Medicine</option>
                            <option>Arts</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-blue-800">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                    <div className="relative">
                        <select className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-500">
                            <option>Local and International</option>
                            <option>Local Only</option>
                            <option>International Only</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-blue-800">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Type</label>
                    <div className="relative">
                        <select className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-500">
                            <option>Full Scholarship</option>
                            <option>Partial Scholarship</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-blue-800">
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-[#1a237e] text-white py-3 rounded-md font-medium hover:bg-indigo-900 transition-colors shadow-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};
