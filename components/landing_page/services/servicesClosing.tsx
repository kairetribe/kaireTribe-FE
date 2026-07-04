"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SERVICES_CLOSING } from "./servicesContent";

export function ServicesClosing() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#131DBA] via-[#1a237e] to-[#0d1547] shadow-2xl"
        >
          <div className="absolute inset-0 opacity-20">
            <Image
              src={SERVICES_CLOSING.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#131DBA]/95 via-[#131DBA]/85 to-[#131DBA]/70" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 md:p-14 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-300/90 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Ready to grow with us?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                {SERVICES_CLOSING.title}
              </h2>
              <p className="text-lg text-blue-100/90 leading-relaxed mb-8 max-w-lg">
                {SERVICES_CLOSING.body}
              </p>
              <Link
                href={SERVICES_CLOSING.ctaHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-[#131DBA] bg-white hover:bg-gray-50 shadow-xl transition-all hover:gap-3"
              >
                {SERVICES_CLOSING.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20 hidden lg:block">
              <Image
                src={SERVICES_CLOSING.image}
                alt={SERVICES_CLOSING.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
