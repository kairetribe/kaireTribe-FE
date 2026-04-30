export interface ScholarshipRecord {
  id: number;
  slug: string;
  title: string;
  summary: string;
  sponsor: string;
  postedDate: string;
  readingMinutes: number;
  closesLabel: string;
  heroImage: string;
  paragraphs: string[];
}

export const SCHOLARSHIPS: ScholarshipRecord[] = [
  {
    id: 1,
    slug: "xyz-scholarship",
    title: "XYZ Scholarship",
    summary: "Lorem ipsum dolor sit amet consectetur. Elementum sollicitudin sapien faucibus in donec.",
    sponsor: "Shell Nigeria Exploration and Production Company Limited",
    postedDate: "January 1, 2024",
    readingMinutes: 25,
    closesLabel: "April Scholarship",
    heroImage: "/images/dashboard/scholarship-poster.png",
    paragraphs: [
      "Lorem ipsum dolor sit amet consectetur. Elementum sollicitudin sapien faucibus in donec. Urna viverra blandit pharetra amet non purus.",
      "Dolor molestie diam mauris nunc arcu rhoncus. Eu fringilla velit luctus non vitae facilisis nunc libero enim.",
      "Morbi dictum vestibulum morbi nibh. In sit dignissim sit rhoncus ullamcorper felis lorem feugiat. Viverra sed arcu massa elementum aliquet dignissim turpis blandit euismod.",
      "Amet magna vel enim tempor nunc tristique sed lacus in.",
      "Lorem ipsum dolor sit amet consectetur. Elementum sollicitudin sapien faucibus in donec. Urna viverra blandit pharetra amet non purus.",
    ],
  },
  {
    id: 2,
    slug: "federal-merit-grant",
    title: "Federal Merit Grant",
    summary: "Merit-based funding for undergraduate students across priority disciplines in Nigerian universities.",
    sponsor: "Federal Ministry of Education",
    postedDate: "February 10, 2024",
    readingMinutes: 18,
    closesLabel: "May Scholarship",
    heroImage: "/images/dashboard/scholarship-poster.png",
    paragraphs: [
      "The Federal Merit Grant supports high-performing students in accredited institutions.",
      "Applicants are encouraged to provide complete academic transcripts and statement of purpose.",
      "Selection emphasizes impact, consistency, and commitment to community development.",
    ],
  },
  {
    id: 3,
    slug: "stem-future-leaders",
    title: "STEM Future Leaders Scholarship",
    summary: "Scholarship targeted at STEM students with innovation-driven academic and community projects.",
    sponsor: "KaireTribe Education Fund",
    postedDate: "March 2, 2024",
    readingMinutes: 20,
    closesLabel: "June Scholarship",
    heroImage: "/images/dashboard/scholarship-poster.png",
    paragraphs: [
      "This scholarship empowers STEM students building practical solutions in their communities.",
      "Candidates should demonstrate leadership potential and measurable project outcomes.",
      "Finalists may be invited for a short interview and project presentation.",
    ],
  },
];

export function getScholarshipBySlug(slug: string): ScholarshipRecord | undefined {
  return SCHOLARSHIPS.find((scholarship) => scholarship.slug === slug);
}
