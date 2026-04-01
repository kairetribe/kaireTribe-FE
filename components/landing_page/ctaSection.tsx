import { MoveRight } from "lucide-react";

export const CtaSection = () => {
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-[#e8f5e9] overflow-hidden p-8 sm:p-12 md:p-16 relative">
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #c8e6c9 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b5e20] mb-6 leading-tight">
                            Join 50,000+ students on Kaire Tribe today
                        </h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <img
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=60&h=60`}
                                        alt=""
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-transparent">
                        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md ml-auto">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="flex-1 px-5 py-3.5 rounded-full border-none outline-none focus:ring-2 focus:ring-green-500 shadow-sm text-gray-900"
                            />
                            <button className="px-8 py-3.5 rounded-full bg-[#2e7d32] text-white font-medium hover:bg-green-800 transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap">
                                Join now
                                <MoveRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
