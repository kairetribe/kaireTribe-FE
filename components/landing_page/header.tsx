"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     href: "/"      },
  { label: "Scholarships", href: "/scholarships"},
  { label: "About us", href: "/about" },
  { label: "FAQ",      href: "/faq"   },
] as const;

interface LandingHeaderProps {
  /** Pass true only on pages that have a full-screen hero image so nav text
   *  starts white and transitions to dark after the user scrolls past 100vh. */
  heroMode?: boolean;
}

export const LandingHeader = ({ heroMode = false }: LandingHeaderProps) => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [pastHero, setPastHero]       = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const threshold = heroMode ? window.innerHeight : 20;
    const onScroll = () => {
      const past = window.scrollY >= threshold;
      setScrolled(past);
      if (heroMode) setPastHero(past);
    };
    onScroll(); // sync on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroMode]);

  // True while the header sits over the hero image and should use light colours
  const isLight = heroMode && !pastHero;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ${
          scrolled
            ? "bg-white/20 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/logo.svg" alt="KaireTribe" className="h-8 w-auto" />
              </motion.div>
              <motion.span
                className={`text-xl font-bold tracking-tight transition-colors duration-500 ${isLight ? "text-white" : "text-gray-900"}`}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                KaireTribe
              </motion.span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                    style={{
                      color:
                        active || hoveredLink === link.href
                          ? "#131DBA"
                          : isLight ? "#ffffff" : "#1b1b1b",
                      transition: "color 0.5s",
                    }}
                  >
                    {/* Animated hover / active background pill */}
                    <AnimatePresence>
                      {(hoveredLink === link.href || active) && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-primary-blue/15"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10">{link.label}</span>

                    {/* Active indicator dot */}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-blue"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/sign-up"
                  className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg text-white bg-primary-blue overflow-hidden group"
                >
                  {/* Shimmer sweep animation on hover */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  <span className="relative">Get Started</span>
                </Link>
              </motion.div>
            </div>

            {/* ── Mobile Menu Toggle ── */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen((o) => !o)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className={`p-2 rounded-lg transition-colors duration-500 ${isLight ? "text-white" : "text-black"}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0,  opacity: 1 }}
                      exit={{ rotate: 90,   opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90,  opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{ rotate: -90,  opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? "text-primary-blue bg-primary-blue/15"
                            : "text-[#1b1b1b]"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mobile-dot"
                            className="w-1.5 h-1.5 rounded-full bg-primary-blue"
                          />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="pt-3 pb-1"
                >
                  <Link
                    href="/sign-up"
                    className="w-full flex items-center justify-center px-5 py-3.5 text-sm font-semibold rounded-xl text-white bg-primary-blue "
                                    >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer — prevents page content from hiding beneath the fixed header */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
};