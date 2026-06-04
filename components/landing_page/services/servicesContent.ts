export interface ServiceItem {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  accent: "blue" | "green";
}

export const SERVICES_HERO_IMAGE = "/images/bannerImg.jpg";

export const SERVICES_INTRO = {
  title: "Our Services",
  lead:
    "We know how overwhelming scholarships and applications can feel when information is scattered everywhere.",
  body: "Services designed to make your path clearer, simpler, and more achievable.",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "scholarships",
    title: "Scholarship Opportunities",
    image: "/images/home.jpg",
    imageAlt: "Student ready for scholarship opportunities",
    accent: "green",
    paragraphs: [
      "Finding the right scholarship shouldn't feel like searching for a needle in a haystack.",
      "We carefully curate verified local and international opportunities tailored to students and graduates across different fields and levels of study.",
      "No noise. No confusing information. Just opportunities that matter.",
    ],
    bullets: [
      "Fully funded scholarships",
      "Undergraduate & postgraduate opportunities",
      "Fellowships, grants, and academic programs",
      "Clear eligibility and application guidance",
    ],
    ctaLabel: "Browse Opportunities",
    ctaHref: "/scholarships",
  },
  {
    id: "document-reviews",
    title: "Document Reviews",
    image: "/images/home2.jpg",
    imageAlt: "Students collaborating on applications",
    accent: "blue",
    paragraphs: [
      "Sometimes, one essay, CV, or statement can make the difference between a rejection and an acceptance.",
      "Our document review support helps you strengthen your application materials with practical, honest feedback—so you stand out while still sounding like you.",
    ],
    bullets: [
      "Personal statements",
      "Motivation letters",
      "CVs and resumes",
      "Scholarship essays",
      "Applications",
    ],
    note: "Document review slots are limited to ensure every student receives thoughtful and quality feedback.",
    ctaLabel: "Request a Review",
    ctaHref: "/sign-up",
  },
  {
    id: "information-sessions",
    title: "Information Sessions",
    image: "/images/home3.jpg",
    imageAlt: "Students learning together in a session",
    accent: "green",
    paragraphs: [
      "You shouldn't have to figure everything out alone.",
      "Through webinars, live sessions, workshops, and Q&As, we break down complicated processes into clear, practical steps you can actually follow.",
      "From application strategies to productivity tips and student experiences—designed to leave you informed and empowered.",
    ],
    ctaLabel: "View Upcoming Events",
    ctaHref: "/faq",
  },
  {
    id: "mentorship",
    title: "One-On-One Mentorship",
    image: "/images/about-different.png",
    imageAlt: "Student receiving mentorship support",
    accent: "blue",
    paragraphs: [
      "Sometimes, what you really need is someone who understands where you are and can guide you personally.",
      "Our mentorship support connects students with guidance, encouragement, and practical direction tailored to their goals and challenges.",
      "Whether you’re confused about where to start, stuck on an application, or trying to plan your next move, you don't have to navigate it alone."
    ],
    note: "Mentorship sessions are offered in limited slots to ensure meaningful and personalized support for each student.",
    ctaLabel: "Book a Mentorship Session",
    ctaHref: "/sign-up",
  },
  {
    id: "newsletters",
    title: "Newsletters",
    image: "/images/about-mission.png",
    imageAlt: "Community and mission at Kaire Tribe",
    accent: "green",
    paragraphs: [
      "Opportunities move fast, and we don't want you missing out.",
      "Our newsletter keeps you updated—simple, practical, and straight to your inbox.",
    ],
    bullets: [
      "Verified scholarship opportunities",
      "Important deadlines",
      "Application tips",
      "Upcoming events and resources",
      "Community updates",
    ],
    ctaLabel: "Join the Newsletter",
    ctaHref: "/sign-up",
  },
];

export const SERVICES_CLOSING = {
  title: "More Than a Platform",
  body: "Kaire Tribe is more than a place to find opportunities. We're building a community where students access support, clarity, and guidance without feeling overwhelmed or alone.",
  ctaLabel: "Join the Community",
  ctaHref: "/sign-up",
  image: "/images/about-hero.png",
  imageAlt: "Kaire Tribe community",
};
