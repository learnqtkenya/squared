'use client';

import Link from 'next/link';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { ImageCarousel } from '../ImageCarousel';
import { AnimatedSection } from '../AnimatedSection';
import { motion } from 'framer-motion';

interface Feature {
  text: string;
}

interface CaseStudySectionProps {
  title: string;
  description: string;
  features: Feature[];
  images: string[];
  linkUrl: string;
}

export const CaseStudySection = ({
  title = 'ParcelPoint Smart Locker System',
  description = 'We developed an automated parcel management solution that has significantly reduced deliveries and improved customer satisfaction.',
  features = [
    { text: 'Custom hardware design and manufacturing' },
    { text: 'Secure, reliable control system' },
    { text: 'Intuitive touchscreen interface' },
    { text: 'Mobile and desktop app integration' },
    { text: 'Cloud-based management system' },
    { text: 'M-PESA payment integration' }
  ],
  images = [
    '/images/parcel-point/locker/1.jpeg',
    '/images/parcel-point/locker/2.jpeg',
    '/images/parcel-point/locker/3.jpeg',
    '/images/parcel-point/ui/1.png',
    '/images/parcel-point/ui/2.png'
  ],
  linkUrl = '/case-studies/parcelpoint'
}: Partial<CaseStudySectionProps>) => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Case Study</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our solutions make a real business impact
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-10 border border-emerald-200 dark:border-emerald-900 shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-block px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-semibold"
                >
                  Success Story
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  {title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                  {description}
                </motion.p>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      className="flex items-center space-x-3 group"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link href={linkUrl}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 text-white px-8 py-3.5 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg font-medium"
                    >
                      <span>View Full Case Study</span>
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-emerald-600 dark:to-emerald-800 rounded-2xl opacity-20 blur-xl"></div>
                <ImageCarousel images={images} className="relative z-10" />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
