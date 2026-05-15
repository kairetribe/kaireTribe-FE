import { LandingHeader } from "@/components/landing_page/header";
import { CTA } from "@/components/landing_page/CTA";
import Footer from "@/components/landing_page/footer";
import ScholarshipCard from "@/components/user/scholarshipCard";
import Image from "next/image";
import Link from "next/link";
import { fetchActiveScholarships } from "@/lib/data/scholarships";

export const revalidate = 60;

export default async function ScholarshipsPage() {
  const { data: scholarships, error } = await fetchActiveScholarships();

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <LandingHeader />

      <section className="w-full">
        <Image
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1800&q=80"
          alt="Scholarships banner"
          width={1800}
          height={240}
          className="w-full h-[180px] md:h-[240px] object-cover"
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1b80] mb-10">Available Scholarships</h1>

        {error && (
          <p className="text-sm text-red-500 mb-6">Unable to load scholarships. Please try again later.</p>
        )}

        {!error && scholarships.length === 0 && (
          <p className="text-sm text-gray-600">No scholarships are available right now. Check back soon.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {scholarships.map((scholarship) => (
            <Link key={scholarship.id} href={`/scholarships/${scholarship.slug}`} className="block">
              <ScholarshipCard
                data={{
                  id: scholarship.id,
                  title: scholarship.title,
                  description: scholarship.summary,
                  closes: scholarship.closesLabel,
                  image: scholarship.heroImage,
                  link: scholarship.link,
                  slug: scholarship.slug,
                }}
              />
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <CTA />
      </div>

      <Footer />
    </main>
  );
}
