"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SERVICES_HERO_IMAGE, SERVICES_INTRO } from "./servicesContent";

export function ServicesHero() {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      <Image
        src={SERVICES_HERO_IMAGE}
        alt="Kaire Tribe students community"
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/40 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Built for Nigerian students
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {SERVICES_INTRO.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-4 max-w-2xl">
            {SERVICES_INTRO.lead}
          </p>
          <p className="text-base text-gray-300 leading-relaxed max-w-xl mb-10">
            {SERVICES_INTRO.body}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#services"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-primary-blue hover:bg-primary-blue/90 shadow-lg shadow-primary-blue/30 transition-all hover:scale-[1.02]"
            >
              Explore services
            </Link>
            <Link
              href="/scholarships"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20 transition-all"
            >
              Browse scholarships
            </Link>
          </div>
        </motion.div>

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to services"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
