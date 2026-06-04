"use client";

import { SERVICES } from "./servicesContent";

export function ServicesQuickNav() {
  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
          Jump to a service
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:border-primary-blue/30 hover:bg-[#F1F2FE] hover:text-primary-blue transition-all"
            >
              {service.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
