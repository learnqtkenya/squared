'use client';

import React from 'react';
import { CheckCircle, ChevronLeft, Cpu, Monitor, Code, Layers, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection, AnimatedCard } from '@/components/AnimatedSection';
import { ImageCarousel } from '@/components/ImageCarousel';
import { motion } from 'framer-motion';

const ParcelPointCaseStudyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center text-emerald-600 dark:text-emerald-500 mb-8 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Home</span>
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2}>
              <div className="mb-4 inline-block px-4 py-1.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-full text-sm font-medium shadow-lg">
                Case Study
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                ParcelPoint Smart Locker
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                A complete embedded solution for automated parcel management - from custom hardware to cloud-connected software.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg font-medium"
                >
                  Start Similar Project
                </motion.a>
                <motion.a
                  href="#technical"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-8 py-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 font-medium"
                >
                  View Details
                </motion.a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageCarousel
                  images={[
                    '/images/parcel-point/locker/1.jpeg',
                    '/images/parcel-point/locker/2.jpeg',
                    '/images/parcel-point/locker/3.jpeg',
                    '/images/parcel-point/ui/1.png',
                    '/images/parcel-point/ui/2.png'
                  ]}
                  autoplayDelay={5000}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Project Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              An automated locker system that streamlines package delivery and collection in urban areas
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Project Duration', value: '3 months' },
              { label: 'Team Size', value: '4 engineers' },
              { label: 'System Uptime', value: '99.7%' }
            ].map((stat, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-emerald-950/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-900 text-center">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.2}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">The Challenge</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Develop a secure, reliable automated locker system that works 24/7 in outdoor environments, handles payment processing, provides real-time status updates, and offers an intuitive user experience.
              </p>
              <div className="space-y-4">
                {[
                  'Secure unattended package management',
                  'Industrial-grade hardware for outdoor use',
                  'Seamless payment integration (M-PESA)',
                  'Real-time cloud connectivity',
                  'Intuitive touchscreen interface'
                ].map((challenge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">The Solution</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We designed and delivered a complete end-to-end solution covering hardware, firmware, user interface, and cloud integration.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-emerald-950/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900">
                <ul className="space-y-3">
                  {[
                    'Qt/QML touchscreen interface',
                    'Cloud-connected backend',
                    'Mobile and desktop app integration',
                  ].map((solution, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section id="technical" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Technical Implementation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A multi-disciplinary approach combining hardware, firmware, and software expertise
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="h-8 w-8" />,
                title: 'Hardware Design',
                description: 'Custom PCB design with industrial-grade components',
                features: [
                  'Multi-board architecture',
                  'Power supply design (12V/5V/3.3V)',
                  'EM control circuits',
                  'Payment integration',
                  '4G LTE connectivity'
                ]
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: 'Firmware Development',
                description: 'Robust embedded software for reliable operation',
                features: [
                  'Linux-based embedded OS',
                  'Multi-threaded architecture',
                  'OTA update capability',
                  'Real-time monitoring',
                  'Error recovery mechanisms'
                ]
              },
              {
                icon: <Monitor className="h-8 w-8" />,
                title: 'User Interface',
                description: 'Intuitive Qt/QML touchscreen application',
                features: [
                  'Multi-language support',
                  'Responsive touch design',
                  'QR code scanning',
                  'M-PESA integration',
                  'Status indicators'
                ]
              },
              {
                icon: <Cpu className="h-8 w-8" />,
                title: 'System Integration',
                description: 'Seamless component coordination',
                features: [
                  'Lock mechanism control',
                  'Sensor monitoring',
                  'Power monitoring',
                  'Diagnostic logging',
                  'Remote configuration'
                ]
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Security Features',
                description: 'Multi-layer security implementation',
                features: [
                  'Encrypted communications',
                  'Access control lists',
                  'Audit logging',
                  'Data encryption at rest'
                ]
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Performance',
                description: 'Optimized for reliability and efficiency',
                features: [
                  '< 30s transaction time',
                  '99.7% uptime SLA',
                  'Low power idle mode',
                  'Fast boot < 60s',
                  'Concurrent operations',
                  'Automatic failover'
                ]
              }
            ].map((area, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{area.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{area.description}</p>
                  <ul className="space-y-2">
                    {area.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Results & Impact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Measurable success in real-world deployment
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: '99.7%', label: 'System Uptime', icon: <CheckCircle className="h-6 w-6" /> },
              { metric: '< 30s', label: 'Transaction Time', icon: <Zap className="h-6 w-6" /> },
              { metric: '2', label: 'Units Deployed', icon: <Layers className="h-6 w-6" /> },
              { metric: '24/7', label: 'Operation', icon: <Shield className="h-6 w-6" /> }
            ].map((result, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-emerald-950/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-900 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {result.icon}
                  </div>
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">{result.metric}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{result.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.6}>
            <div className="mt-16 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 border border-emerald-200 dark:border-emerald-900 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Client Feedback</h3>
              <blockquote className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                  "The team delivered a complete solution that exceeded our expectations. The system has been incredibly reliable, and the user feedback has been overwhelmingly positive. Their expertise in embedded systems was evident throughout the project."
                </p>
                <footer className="text-gray-600 dark:text-gray-400 font-medium">
                  — ParcelPoint Partners
                </footer>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Let's discuss how we can bring your embedded systems project to life with the same level of expertise and dedication.
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

export default ParcelPointCaseStudyPage;
