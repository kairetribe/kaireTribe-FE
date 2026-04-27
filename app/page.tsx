"use client"

import { HeroSection } from "@/components/landing_page/home/hero";
import { HowItWorksSection } from "@/components/landing_page/home/howItWorksSection";
import { FeatureSection } from "@/components/landing_page/home/featureSection";
import { ScholarsHighlightSection } from "@/components/landing_page/scholarsHighlightSection";
import Footer from "@/components/landing_page/footer";
import { CTA } from "@/components/landing_page/CTA";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <main>
                <HeroSection />
                <HowItWorksSection />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pt-10 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-blue">Why Kaire Tribe</h2>
                </div>

                <FeatureSection
                    title="Personalized recommendations"
                    description="Our tech-driven matching ensures you barely encounter scholarships you're not eligible for. Get recommendations that align with your course, level, and goals."
                    bgClass="bg-[#ECF9EF]"
                    imageSrc="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student with backpack"
                    imageOnLeft={false}
                />
                <FeatureSection
                    title="Built for Nigerian students"
                    description="Here are resources tailored specifically for real needs. No fluff, just relevant guides, requirements, and pathways that work here."
                    bgClass="bg-[#F1F2FE]"
                    imageSrc="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student smiling"
                    imageOnLeft={true}
                />
                <FeatureSection
                    title="Local & international opportunities"
                    description="From Nigerian-based funding to full ride scholarships abroad, we bring different opportunities together in one place."
                    bgClass="bg-[#ECF9EF]"
                    imageSrc="https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student with blue folder"
                    imageOnLeft={false}
                />
                <FeatureSection
                    title="Updated & relevant listings"
                    description="Scholarships expire and requirements change. We verify opportunities regularly so you're not applying to expired programs."
                    bgClass="bg-[#F1F2FE]"
                    imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student with yellow folder"
                    imageOnLeft={true}
                    hasButton
                />

                <ScholarsHighlightSection />

                <CTA />
            </main>

            <Footer />
        </div>
    );
}
