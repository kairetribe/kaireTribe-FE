import { Search, CirclePlus } from "lucide-react";

interface ScholarshipActionBarProps {
  onCreate: () => void;
}

export const ScholarshipActionBar = ({ onCreate }: ScholarshipActionBarProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-[320px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-blue-600" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-blue-100 rounded-full leading-5 bg-white placeholder-blue-600 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                    placeholder="Search"
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={onCreate}
                    className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all shadow-indigo-200/50"
                >
                    <CirclePlus className="h-5 w-5 mr-2" />
                    Add new scholarship
                </button>
            </div>
        </div>
    );
};
