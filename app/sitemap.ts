import type { MetadataRoute } from "next";
import { fetchScholarshipSlugs } from "@/service/scholarships/fetchScholarships";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kairetribe.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchScholarshipSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/scholarships`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sign-in`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/sign-up`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const scholarshipPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/scholarships/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...scholarshipPages];
}
