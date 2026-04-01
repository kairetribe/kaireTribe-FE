import { EyeOff } from 'lucide-react';

export const Security = () => {
    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Security</h2>

            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter Old Password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 cursor-pointer">
                            <EyeOff className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 cursor-pointer">
                            <EyeOff className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 cursor-pointer">
                            <EyeOff className="w-4 h-4 text-blue-600" />
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
