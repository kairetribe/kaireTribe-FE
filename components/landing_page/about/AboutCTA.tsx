export const AboutCTA = () => {
    return (
        <section className="py-16 md:py-24 px-4">
            <div className="max-w-6xl mx-auto bg-green-100/60 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                <div className="relative z-10 md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                        Join 50,000+ students on Kaire Tribe today
                    </h2>
                    <div className="flex -space-x-3 mt-4">
                        {[1, 2, 3, 4].map(i => (
                            <img
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-8 md:mt-0 w-full md:w-auto">
                    <div className="bg-white rounded-full p-1 pl-4 flex items-center shadow-sm max-w-sm w-full">
                        <input
                            type="email"
                            placeholder="Enter Your Email Address"
                            className="flex-1 outline-none text-gray-600 text-sm bg-transparent"
                        />
                        <button className="bg-green-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-900 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
