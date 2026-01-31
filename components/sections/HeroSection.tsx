'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-[#3a3d42] dark:via-[#3a3d42] dark:to-[#2f3136]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 dark:hidden"></div>
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-0 dark:opacity-100"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const left = (i * 17 + 13) % 100;
          const top = (i * 23 + 7) % 100;
          const duration = 2 + (i % 3);
          const delay = (i % 5) * 0.4;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-500/30 dark:bg-cyan-400/20 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left side - Text content */}
          <div className="text-left py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-4 py-2 bg-emerald-100 dark:bg-cyan-900/20 dark:border dark:border-cyan-500/30 rounded-full"
            >
              <span className="text-sm font-medium text-emerald-700 dark:text-cyan-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Embedded Systems Engineering
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white font-heading italic leading-tight"
            >
              Build Smart Products<br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-emerald-600 dark:text-cyan-400 inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent"
              >
                That Work
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl"
            >
              From concept to production-ready devices. Hardware design, firmware development, and complete system integration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScrollToSection('contact')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 dark:bg-gradient-to-r dark:from-emerald-500 dark:to-cyan-500 dark:hover:from-emerald-400 dark:hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgb(34, 211, 238)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScrollToSection('portfolio')}
                className="border-2 border-gray-300 dark:border-cyan-500/50 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-lg hover:border-emerald-600 dark:hover:border-cyan-400 hover:text-emerald-600 dark:hover:text-cyan-400 transition-all duration-300 font-medium text-lg"
              >
                View Case Studies
              </motion.button>
            </motion.div>
          </div>

          {/* Right side - Banner image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-[600px]">
              {/* Banner image - replace src with your actual image */}
              <img
                src="/products/parcel-point.png"
                alt="Embedded Systems Innovation"
                className="w-full h-full object-contain object-right"
              />
              {/* Optional glow effect behind image */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-cyan-500/10 to-emerald-500/10 dark:via-cyan-500/20 dark:to-emerald-500/20 blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
