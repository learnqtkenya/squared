'use client';

import { Monitor, Cpu, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCard } from '../ui';

interface FeatureCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  const features: FeatureCard[] = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: 'HMI Development',
      description: 'Qt/QML touchscreen interfaces for industrial and consumer applications'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Firmware Engineering',
      description: 'Real-time embedded systems on ARM Cortex, STM32, and embedded Linux'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Hardware Design',
      description: 'Custom PCB design, prototyping, and manufacturing coordination'
    }
  ];

  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950/20"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Use index-based deterministic values to avoid hydration mismatch
          const left = (i * 17 + 13) % 100;
          const top = (i * 23 + 7) % 100;
          const duration = 2 + (i % 3);
          const delay = (i % 5) * 0.4;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-500/30 rounded-full"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
          >
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Embedded Systems Engineering
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Build Smart Products<br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-emerald-600 dark:text-emerald-500 inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent"
            >
              That Work
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            From concept to production-ready devices. Hardware design, firmware development, and complete system integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollToSection('contact')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgb(5, 150, 105)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollToSection('portfolio')}
              className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-500 transition-all duration-300 font-medium text-lg"
            >
              View Case Studies
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((item, idx) => (
            <AnimatedCard key={idx} delay={1 + idx * 0.2}>
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg h-full">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 rounded-lg flex items-center justify-center mb-4 text-white shadow-lg"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
