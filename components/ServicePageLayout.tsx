'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard } from './AnimatedSection';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ContactForm } from './ContactForm';

interface ServiceHeroProps {
  title: string;
  description: string;
  capabilities: string[];
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}

interface ServicePageLayoutProps {
  hero: ServiceHeroProps;
  benefits: BenefitCardProps[];
  children?: React.ReactNode;
}

export const ServiceHero = ({ title, description, capabilities }: ServiceHeroProps) => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 mb-8 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg font-medium"
              >
                Get Started
              </motion.a>
              <motion.a
                href="#benefits"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-8 py-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 font-medium"
              >
                Learn More
              </motion.a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-emerald-200 dark:border-emerald-900 hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">What We Deliver</h3>
              <div className="space-y-4">
                {capabilities.map((capability, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                      {capability}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export const BenefitsSection = ({ benefits }: { benefits: BenefitCardProps[] }) => {
  return (
    <section id="benefits" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Why This Matters
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The right solution delivers measurable results for your business
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.1}>
              <div className="group h-full bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-800 dark:to-emerald-950/20 p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-2">
                  {benefit.points.map((point, pointIdx) => (
                    <li key={pointIdx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServicePageLayout = ({ hero, benefits, children }: ServicePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <ServiceHero {...hero} />
      <BenefitsSection benefits={benefits} />
      {children}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Let's Build Something Great
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to get started? Share your project details and we'll get back to you within 24 hours.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>

      <Footer
        sections={[
          {
            title: 'Services',
            links: [
              { label: 'HMI Development', href: '/services/hmi-development' },
              { label: 'Firmware Engineering', href: '/services/embedded-firmware' },
              { label: 'Hardware Design', href: '/services/embedded-systems-design' }
            ]
          },
          {
            title: 'Case Studies',
            links: [
              { label: 'ParcelPoint', href: '/case-studies/parcelpoint' }
            ]
          }
        ]}
      />
    </div>
  );
};
