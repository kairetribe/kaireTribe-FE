import { CheckCircle2, Hexagon } from "lucide-react";

export const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a237e] mb-12">
                            How It Works
                        </h2>

                        <div className="space-y-10">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="relative flex items-center justify-center w-6 h-6">
                                        <Hexagon className="w-6 h-6 text-green-100 fill-green-100 absolute" />
                                        <CheckCircle2 className="w-4 h-4 text-green-600 relative z-10" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tell us about you</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-sm">
                                        Share your education level, field of study, and interests so we can match what fits you.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="relative flex items-center justify-center w-6 h-6">
                                        <Hexagon className="w-6 h-6 text-green-100 fill-green-100 absolute" />
                                        <CheckCircle2 className="w-4 h-4 text-green-600 relative z-10" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Get matched</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-sm">
                                        Receive personalized list of scholarships that align with your profile, goals, and eligibility.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="relative flex items-center justify-center w-6 h-6">
                                        <Hexagon className="w-6 h-6 text-green-100 fill-green-100 absolute" />
                                        <CheckCircle2 className="w-4 h-4 text-green-600 relative z-10" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Apply confidently</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-sm">
                                        Get recommended scholarships that align with your profile, goals, and eligibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1a237e] hover:bg-indigo-900 transition-colors shadow-sm">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-full h-full bg-red-50/50 rounded-full blur-3xl opacity-50 z-0"></div>
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-md mx-auto lg:ml-auto">
                            <img
                                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800"
                                alt="Student smiling"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 z-0 opacity-20">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="99.5" stroke="#FF5722" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
