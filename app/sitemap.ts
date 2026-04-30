import type { MetadataRoute } from "next";
import { SCHOLARSHIPS } from "@/lib/data/scholarships";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kairetribe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/scholarships`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sign-in`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/sign-up`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const scholarshipPages: MetadataRoute.Sitemap = SCHOLARSHIPS.map((scholarship) => ({
    url: `${SITE_URL}/scholarships/${scholarship.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...scholarshipPages];
}
