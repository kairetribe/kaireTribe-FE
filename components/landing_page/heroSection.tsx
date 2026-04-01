import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import heroImg from "@/public/images/hero-img.jpg"

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
      className="relative bg-gray-900 h-[600px] overflow-hidden"
    >
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-8"
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
              className="inline-block mr-4 relative pb-3"
              variants={{
                hidden: { opacity: 0, y: 48, rotateX: -25 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
                scholarships
              </span>
              {/* Squiggle underline draws itself in after word lands */}
              <motion.svg
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                style={{ height: "20px" }}
              >
                <motion.path
                  d="M2 8 Q75 2 150 8 Q225 14 298 8"
                  stroke="url(#squiggle-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="squiggle-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a5b4fc" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                </defs>
              </motion.svg>
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
              className="inline-block mr-4 mt-2"
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
            Over 1,000 active Nigerian undergraduate and graduate scholarships
            available. Get matched and apply in minutes.
          </motion.p>

        </div>
      </div>
    </section>
  );
};