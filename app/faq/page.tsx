"use client";
import Footer from "@/components/landing_page/footer";
import { FAQHero } from "@/components/landing_page/faq/FAQHero";
import { FAQList } from "@/components/landing_page/faq/FAQList";
import { ContactForm } from "@/components/landing_page/faq/ContactForm";
import { CTA } from "@/components/landing_page/CTA";
import { LandingHeader } from "@/components/landing_page/header";

export default function FAQ() {
    return (
        <div className="min-h-screen bg-white">
            <LandingHeader />
            <main>
                <FAQHero />
                <FAQList />
                <ContactForm />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
