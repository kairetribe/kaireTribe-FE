import Footer from "@/components/landing_page/footer";
import { CTA } from "@/components/landing_page/CTA";
import { LandingHeader } from "@/components/landing_page/header";
import { ServicesHero } from "@/components/landing_page/services/servicesHero";
import { ServicesQuickNav } from "@/components/landing_page/services/servicesQuickNav";
import { ServicesList } from "@/components/landing_page/services/servicesList";
import { ServicesClosing } from "@/components/landing_page/services/servicesClosing";

export const metadata = {
  title: "Our Services | Kaire Tribe",
  description:
    "Scholarship opportunities, document reviews, information sessions, mentorship, and newsletters for Nigerian students.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <ServicesHero />
        <ServicesQuickNav />
        <ServicesList />
        <ServicesClosing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
