import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { LandingHeader } from "@/components/landing_page/header";
import { CTA } from "@/components/landing_page/CTA";
import Footer from "@/components/landing_page/footer";
import { SCHOLARSHIPS, getScholarshipBySlug } from "@/lib/data/scholarships";

interface ScholarshipDetailProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kairetribe.com";

export async function generateStaticParams() {
  return SCHOLARSHIPS.map((scholarship) => ({ slug: scholarship.slug }));
}

export async function generateMetadata({ params }: ScholarshipDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = getScholarshipBySlug(slug);
  if (!scholarship) return { title: "Scholarship Not Found | KaireTribe" };

  const canonical = `${SITE_URL}/scholarships/${scholarship.slug}`;
  return {
    title: `${scholarship.title} | KaireTribe Scholarships`,
    description: scholarship.summary,
    alternates: { canonical },
    openGraph: {
      title: scholarship.title,
      description: scholarship.summary,
      url: canonical,
      siteName: "KaireTribe",
      images: [{ url: scholarship.heroImage, width: 1200, height: 630, alt: scholarship.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: scholarship.title,
      description: scholarship.summary,
      images: [scholarship.heroImage],
    },
  };
}

export default async function ScholarshipDetailPage({ params }: ScholarshipDetailProps) {
  const { slug } = await params;
  const scholarship = getScholarshipBySlug(slug);
  if (!scholarship) notFound();

  const similarScholarships = SCHOLARSHIPS.filter((item) => item.slug !== scholarship.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: scholarship.title,
    description: scholarship.summary,
    datePublished: scholarship.postedDate,
    author: { "@type": "Organization", name: "KaireTribe" },
    publisher: { "@type": "Organization", name: "KaireTribe" },
    mainEntityOfPage: `${SITE_URL}/scholarships/${scholarship.slug}`,
  };

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingHeader />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <article>
            <h1 className="text-4xl font-bold text-[#1b1b1b] mb-3">{scholarship.title}</h1>
            <div className="flex items-center gap-5 text-sm text-gray-600 mb-5">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {scholarship.postedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="w-4 h-4" />
                {scholarship.readingMinutes} minutes ago
              </span>
            </div>

            <p className="text-sm font-medium text-gray-800 mb-4">{scholarship.sponsor}</p>
            <Image
              src={scholarship.heroImage}
              alt={scholarship.title}
              width={720}
              height={380}
              className="w-full h-auto rounded-sm mb-6"
            />

            <h2 className="text-3xl font-semibold text-gray-900 mb-4 leading-tight">{scholarship.summary}</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              {scholarship.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button className="px-7 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Save Scholarship
              </button>
              <button className="px-12 py-2 rounded-full bg-[#1a1b80] text-sm text-white font-semibold hover:opacity-90 transition-opacity">
                Apply
              </button>
            </div>
          </article>

          <aside>
            <h3 className="text-2xl font-semibold text-gray-800 mb-5">Similar Scholarship</h3>
            <div className="space-y-4">
              {similarScholarships.map((item) => (
                <Link key={item.id} href={`/scholarships/${item.slug}`} className="flex gap-3 group">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={80}
                    height={58}
                    className="w-20 h-14 object-cover rounded-sm"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-[#1a1b80]">{item.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
