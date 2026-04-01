import Link from "next/link";
import bannerImage from "@/public/images/dashboard/banner-3d.png"
import posterImage from "@/public/images/dashboard/scholarship-poster.png";
import ScholarshipCard from "@/components/scholarshipCard";

const MOCK_SCHOLARSHIPS = [
    {
        id: 1,
        title: "XYZ Scholarship",
        description: "Lorem ipsum itsa dolor Lorem ipsum itsa dolor Lorem ipsum itsa dolorLorem ipsum its...",
        image: posterImage,
        closes: "12th Feb 2026",
    },
    {
        id: 2,
        title: "XYZ Scholarship",
        description: "Lorem ipsum itsa dolor Lorem ipsum itsa dolor Lorem ipsum itsa dolorLorem ipsum its...",
        image: posterImage,
        closes: "12th Feb 2026",
    },
    {
        id: 3,
        title: "XYZ Scholarship",
        description: "Lorem ipsum itsa dolor Lorem ipsum itsa dolor Lorem ipsum itsa dolorLorem ipsum its...",
        image: posterImage,
        closes: "12th Feb 2026",
    }
];

export default function DashboardHome() {
    const firstName = "Scholar";

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-GB', options);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {firstName}</h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        It's a sunny day today, we hope you're taking good care of your health 😊
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center text-gray-900 font-medium text-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formattedDate}
                </div>
            </div>
            <div className="relative bg-[#4361EE] rounded-3xl p-8 md:p-14 overflow-hidden text-white flex items-center justify-between min-h-[300px]">
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-8 leading-tight">
                        There are over 10 trending<br />scholarships that fits your profile.
                    </h2>
                    <Link
                     href="/user/scholarships"
                        className="inline-block bg-white text-[#4361EE] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Apply now!
                    </Link>
                </div>

                <div className="hidden lg:block absolute right-0 bottom-0 h-full w-1/2">
                    <img
                        src={bannerImage.src}
                        alt="Graduation Hat"
                        className="absolute right-12 bottom-0 h-[110%] w-auto object-contain drop-shadow-2xl transform translate-x-10 translate-y-10"
                    />
                </div>
            </div>
            <section>
                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-900">Trending Scholarships</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {MOCK_SCHOLARSHIPS.map((scholarship) => (
                        <ScholarshipCard key={scholarship.id} data={scholarship} />
                    ))}
                </div>
            </section>

            <section>
                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-900">For you</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {MOCK_SCHOLARSHIPS.map((scholarship, index) => (
                        <ScholarshipCard key={`foryou-${index}`} data={scholarship} />
                    ))}
                </div>
            </section>
        </div>
    );
}

