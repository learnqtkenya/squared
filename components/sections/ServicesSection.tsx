'use client';

import Link from 'next/link';
import { Monitor, Code, Layers, ChevronRight } from 'lucide-react';
import { AnimatedSection, AnimatedCard } from '../ui';
import { motion } from 'framer-motion';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
}

export const ServicesSection = () => {
  const services: Service[] = [
    {
      icon: <Monitor className="h-7 w-7 text-white" />,
      title: 'HMI Development',
      description: 'Qt/QML touchscreen interfaces for industrial control panels, medical devices, and consumer electronics.',
      href: '/services/hmi-development'
    },
    {
      icon: <Code className="h-7 w-7 text-white" />,
      title: 'Firmware Engineering',
      description: 'Real-time embedded software on STM32, ARM Cortex, and embedded Linux platforms with proven reliability.',
      href: '/services/embedded-firmware'
    },
    {
      icon: <Layers className="h-7 w-7 text-white" />,
      title: 'Hardware Design',
      description: 'Custom PCB design, schematic capture, and manufacturing support for production-ready electronics.',
      href: '/services/embedded-systems-design'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete embedded systems development from hardware to software
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.2}>
              <Link href={service.href}>
                <div className="group relative h-full bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-500/5 group-hover:to-emerald-600/10 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:shadow-emerald-500/50"
                    >
                      {service.icon}
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 group-hover:gap-3 transition-all font-medium">
                      <span>Learn More</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
