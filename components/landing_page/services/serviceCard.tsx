"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import type { ServiceItem } from "./servicesContent";

const accentStyles = {
  blue: {
    title: "text-[#131DBA]",
    badge: "bg-[#F1F2FE] text-[#131DBA] border-indigo-100",
    button: "bg-primary-blue hover:bg-primary-blue/90 shadow-primary-blue/25",
    ring: "ring-indigo-100",
  },
  green: {
    title: "text-[#2A7E40]",
    badge: "bg-[#ECF9EF] text-[#2A7E40] border-emerald-100",
    button: "bg-[#2A7E40] hover:bg-[#236B36] shadow-emerald-900/20",
    ring: "ring-emerald-100",
  },
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const imageFirst = index % 2 === 0;
  const styles = accentStyles[service.accent];

  return (
    <article
      id={service.id}
      className={`scroll-mt-24 py-16 md:py-24 ${
        index % 2 === 0 ? "bg-white" : "bg-gradient-to-b from-[#F8FAFC] to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: imageFirst ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
          >
            <div
              className={`relative aspect-[4/5] max-h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ${styles.ring}`}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div
              className={`absolute -bottom-4 ${imageFirst ? "-right-4 md:right-6" : "-left-4 md:left-6"} w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-bold ${styles.title} opacity-90`}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: imageFirst ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={imageFirst ? "lg:order-2" : "lg:order-1"}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${styles.badge}`}
            >
              Service {index + 1}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${styles.title}`}>
              {service.title}
            </h2>

            <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
              {service.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {service.bullets && service.bullets.length > 0 && (
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {service.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-800 text-sm">
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        service.accent === "green" ? "text-emerald-600" : "text-primary-blue"
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {service.note && (
              <div className="mt-6 flex gap-3 rounded-xl bg-amber-50/80 border border-amber-100 px-4 py-3.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  <span className="font-semibold">Please note:</span> {service.note}
                </p>
              </div>
            )}

            <Link
              href={service.ctaHref}
              className={`mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:gap-3 ${styles.button}`}
            >
              {service.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
