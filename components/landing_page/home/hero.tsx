import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import heroImg from "@/public/images/hero-img.jpg"
import { LandingHeader } from "../header";

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse parallax on the background image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const imgX = useTransform(springX, [-1, 1], [-12, 12]);
  const imgY = useTransform(springY, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-gray-900 h-screen overflow-hidden"
    >
      <LandingHeader heroMode />
      {/* ── Background image with parallax ── */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImg.src}
          alt="Students group"
          className="w-full h-full object-cover object-center opacity-60 scale-110"
          style={{ x: imgX, y: imgY }}
          onError={(e) => {
            // Fallback to a known-working image if primary fails
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1800&q=80&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="absolute top-0 max-w-7xl mx-auto p-4 sm:p-6 lg:py-8 lg:px-24 h-full flex items-center sm:items-end">
        <div className="max-w-3xl">

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-4 text-center lg:text-left"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09 } },
            }}
          >
            {/* "Find" */}
            <motion.span
              className="inline-block mr-4"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              Find
            </motion.span>

            {/* "scholarships" — gradient highlight + animated squiggle */}
            <motion.span
              className="inline-block mr-4"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              scholarships
            </motion.span>

            {/* "you" + line break */}
            <motion.span
              className="inline-block mr-4"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              you
            </motion.span>

            <br className="hidden sm:block" />

            {/* "actually" */}
            <motion.span
              className="inline-block mr-4"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              actually
            </motion.span>

            {/* "qualify" */}
            <motion.span
              className="inline-block mr-4"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              qualify
            </motion.span>

            {/* "for" */}
            <motion.span
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              for
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Kaire Tribe helps Nigerian undergraduate and graduate students discover local and international scholarships.
          </motion.p>

        </div>
      </div>
    </section>
  );
};