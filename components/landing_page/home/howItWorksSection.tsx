import { CheckCircle2, Hexagon } from "lucide-react";
import Image from "next/image";
import howItWorksOvverlay from "@/public/images/landingpage/HIWOverlay.svg"
import howItWorksImg from "@/public/images/landingpage/hiwImg.png"

export const HowItWorksSection = () => {
    return (
        <section className="overflow-hidden relative">
            <Image src={howItWorksOvverlay} alt="How it works" className="absolute top-10 scale-120 left-10 w-full h-full z-1 object-cover opacity-80" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center z-30">
                    <div className="lg:col-span-2 py-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-primary-blue mb-12">
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
                            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-blue hover:bg-primary-blue/80 transition-colors shadow-sm">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <Image
                        src={howItWorksImg}
                        alt="Student smiling"
                        className="w-full h-full z-30 object-cover lg:col-span-3"
                    />
                </div>
            </div>
        </section>
    );
};
