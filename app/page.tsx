"use client"

import { HeroSection } from "@/components/landing_page/home/hero";
import { HowItWorksSection } from "@/components/landing_page/howItWorksSection";
import { FeatureSection } from "@/components/landing_page/featureSection";
import { ScholarsHighlightSection } from "@/components/landing_page/scholarsHighlightSection";
import Footer from "@/components/landing_page/footer";
import { CTA } from "@/components/landing_page/CTA";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <main>
                <HeroSection />
                <HowItWorksSection />

                <div className="bg-[#e8f5e9]/30 pt-16 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e]">Why Kaire Tribe</h2>
                    </div>
                </div>

                <FeatureSection
                    title="Personalized recommendations"
                    description="Our tech-driven matching ensures you barely encounter scholarships you're not eligible for. Get recommendations that align with your course, level, and goals."
                    bgClass="bg-[#e8f5e9]/30"
                    imageSrc="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student with backpack"
                    imageOnLeft={false}
                    buttonColorClass="bg-[#2e7d32]"
                />
                <FeatureSection
                    title="Built for Nigerian students"
                    description="Here are resources tailored specifically for real needs. No fluff, just relevant guides, requirements, and pathways that work here."
                    bgClass="bg-[#f3e5f5]/50"
                    imageSrc="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student smiling"
                    imageOnLeft={true}
                    buttonColorClass="bg-[#1a237e]"
                />
                <FeatureSection
                    title="Local & international opportunities"
                    description="From Nigerian-based funding to full ride scholarships abroad, we bring different opportunities together in one place."
                    bgClass="bg-[#e8f5e9]/30"
                    imageSrc="https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student with blue folder"
                    imageOnLeft={false}
                    buttonColorClass="bg-[#2e7d32]"
                />
                <FeatureSection
                    title="Updated & relevant listings"
                    description="Scholarships expire and requirements change. We verify opportunities regularly so you're not applying to expired programs."
                    bgClass="bg-[#f3e5f5]/50"
                    imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
                    imageAlt="Student with yellow folder"
                    imageOnLeft={true}
                    buttonColorClass="bg-[#1a237e]"
                />

                <ScholarsHighlightSection />

                <CTA />
            </main>

            <Footer />
        </div>
    );
}
