import Image from "next/image";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const FILES_BUCKET = "kaire-tribe";

// storage/v1/object/sign/

function fileFromBucket(path: string): string {
  if (!SUPABASE_URL) return `/images/${path}`;
  return `${SUPABASE_URL}/storage/v1/object/sign/${FILES_BUCKET}/${path}`;
}

const TEAM_MEMBERS = [
    {
        name: "Chikire Chierika Aku-Ibe",
        role: "Founder",
        image: fileFromBucket("team-image/Chikire_Chierika_Aku-Ibe.jpg")
    },
    {
        name: "Aku-Ibe Chizuroke Akuwudike",
        role: "Programs and Community Lead",
        image: fileFromBucket("team-image/Aku-Ibe_Chizuroke_Akuwudike.jpg")
    },
    {
        name: "Ofoegbu Chidinma",
        role: "Content Team Lead",
        image: fileFromBucket("team-image/Ofoegbu_Chidinma.jpg")
    },
    {
        name: "Ezike Chigozie Innocent",
        role: "Publicity Lead",
        image: fileFromBucket("team-image/Ezike_Chigozie_Innocent.jpeg")
    },
    {
        name: "Oputa Olivia",
        role: "Head of Technical Operations",
        image: fileFromBucket("team-image/Oputa_Olivia.JPG")
    }
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
                                    sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"
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
