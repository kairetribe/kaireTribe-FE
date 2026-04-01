const TEAM_MEMBERS = [
    { name: "Chikire Chierika Aku-Ibe", role: "Founder", image: "https://i.pravatar.cc/300?img=5" },
    { name: "Chidinma Ofoegbu", role: "Head of Opportunity Verification Team", image: "https://i.pravatar.cc/300?img=24" },
    { name: "Oputa Olivia Amarachi", role: "Lead Developer", image: "https://i.pravatar.cc/300?img=16" },
    { name: "Ezedike Evan", role: "Volunteer | Developer", image: "https://i.pravatar.cc/300?img=2" },
    { name: "Victor Chigbo", role: "Volunteer | Developer", image: "https://i.pravatar.cc/300?img=13" },
];

export const TeamSection = () => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-black border-l-4 border-l-transparent pl-0">
                        Meet The Team
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {TEAM_MEMBERS.map((member, idx) => (
                        <div key={idx} className="flex flex-col">
                            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-200 mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-tight">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
