export interface CreateScholarshipInput {
  image: File;
  name: string;
  sponsor: string;
  openingDate: string;
  closingDate: string;
  scholarshipType: string;
  openTo: string;
  link: string;
  details: string;
}

export interface ScholarshipRow {
  id: string;
  slug: string;
  name: string;
  sponsorName: string;
  openingDate: string;
  closingDate: string;
  scholarshipType: string;
  openTo: string;
  link: string;
  details: string;
  imagePath: string;
  imageUrl: string;
  status: "active" | "closed";
  createdAt: string;
}

export interface CreateScholarshipResult {
  id: string | null;
  slug: string | null;
  error: string | null;
}

export interface ScholarshipRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  sponsor: string;
  postedDate: string;
  readingMinutes: number;
  closesLabel: string;
  heroImage: string;
  paragraphs: string[];
  link: string;
  scholarshipType: string;
  openTo: string;
}
