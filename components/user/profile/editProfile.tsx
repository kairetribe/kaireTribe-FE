
export const EditProfile = () => {
    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Edit Profile</h2>

            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        placeholder="Enter your First Name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter your Last Name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your Email address"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900"
                    />
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
