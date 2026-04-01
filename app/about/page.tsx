import { AboutHero } from "@/components/landing_page/about/aboutHero";
import { TheProblem } from "@/components/landing_page/about/theProblem";
import { MissionVision } from "@/components/landing_page/about/missionVision";
import { WhatMakesUsDifferent } from "@/components/landing_page/about/whatMakesUsDifferent";
import { TeamSection } from "@/components/landing_page/about/teamSection";
import { CTA } from "@/components/landing_page/CTA";
import { LandingHeader } from "@/components/landing_page/header";
import Footer from "@/components/landing_page/footer";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <LandingHeader />
            <main>
                <AboutHero />
                <TheProblem />
                <MissionVision />
                <WhatMakesUsDifferent />
                <TeamSection />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
