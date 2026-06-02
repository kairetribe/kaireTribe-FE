import Image from "next/image";

const TEAM_MEMBERS = [
    { name: "Chikire Chierika Aku-Ibe", role: "Founder", image: "/images/Chikire_Chierika_Aku-Ibe.JPG" },
    {name:"Aku-Ibe Chizuroke Akuwudike", role: "Head of Programs and Community",image:"/images/Aku-Ibe_Chizuroke_Akuwudike.jpeg"},
    {name:"Oputa Olivia",role:"Head of Technical Operations",image:"/images/Oputa_Olivia.JPG"},
    {name:"Ezike Chigozie Innocent",role:"Head of publicity",image:"/images/Ezike_Chigozie_Innocent.jpeg"},
    {name:"Ofoegbu Chidinma", role: "Head of content",image :"/images/Ofoegbu_Chidinma.jpg"},
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
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={360}
                                    height={480}
                                    className="w-full h-full object-cover transition-all duration-300"
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
