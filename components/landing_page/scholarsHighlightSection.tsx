import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const ScholarsHighlightSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Scholars Highlight</h2>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full border border-blue-100 text-blue-600 hover:bg-blue-50 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full bg-[#1a237e] text-white hover:bg-indigo-900 transition-colors shadow-sm">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#f3e5f5] rounded-xl p-8 flex flex-col items-start h-full">
                        <Quote className="w-8 h-8 text-[#1a237e] mb-6 fill-[#1a237e] opacity-20" />
                        <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-1">
                            "Before Kaire Tribe, I wasted hours applying for scholarships I wasn't eligible for. The matching system saved me so much time and helped me secure full funding for my studies."
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" className="w-10 h-10 rounded-full object-cover" />
                            <div className="text-sm">
                                <p className="font-bold text-gray-900">Chioma N.</p>
                                <p className="text-gray-500 text-xs">University of Lagos</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#f3e5f5] rounded-xl p-8 flex flex-col items-start h-full">
                        <Quote className="w-8 h-8 text-[#1a237e] mb-6 fill-[#1a237e] opacity-20" />
                        <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-1">
                            "The community support is unmatched. I got help with my essay reviews and interview prep from mentors who had already won the same scholarships."
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="User" className="w-10 h-10 rounded-full object-cover" />
                            <div className="text-sm">
                                <p className="font-bold text-gray-900">David O.</p>
                                <p className="text-gray-500 text-xs">Covenant University</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#f3e5f5] rounded-xl p-8 flex flex-col items-start h-full">
                        <Quote className="w-8 h-8 text-[#1a237e] mb-6 fill-[#1a237e] opacity-20" />
                        <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-1">
                            "I found an international opportunity in Canada that perfectly matched my profile. The application process was straightforward thanks to Kaire Tribe's guidance."
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100" alt="User" className="w-10 h-10 rounded-full object-cover" />
                            <div className="text-sm">
                                <p className="font-bold text-gray-900">Sarah A.</p>
                                <p className="text-gray-500 text-xs">University of Toronto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
