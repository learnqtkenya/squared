'use client';

import React from 'react';
import { Package, Clock, Shield, MapPin, Smartphone, CreditCard, ChevronLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { AnimatedSection, AnimatedCard } from '@/components/AnimatedSection';
import { ImageCarousel } from '@/components/ImageCarousel';
import { motion } from 'framer-motion';

const ParcelPoint = () => {
  const images = [
    '/images/parcel-point/locker/1.jpeg',
    '/images/parcel-point/locker/2.jpeg',
    '/images/parcel-point/locker/3.jpeg'
  ];

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Access',
      description: 'Pick up your parcels anytime, day or night'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Storage',
      description: 'Bank-grade security with unique access codes'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Convenient Locations',
      description: 'Malls, offices, schools, and residential areas'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'SMS Notifications',
      description: 'Instant alerts with your unique pickup code'
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'M-PESA Integration',
      description: 'Quick and easy mobile payments'
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: 'Multiple Sizes',
      description: 'Lockers for packages of all sizes'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-emerald-100 dark:border-emerald-900/50">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Squared Computing</span>
          </Link>
        </div>
      </header>

      {/* Logo Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/parcel-point/parcel_point_dark.png"
              alt="ParcelPoint Logo"
              className="h-16 w-auto dark:hidden"
            />
            <img
              src="/images/parcel-point/parcel_point_light.png"
              alt="ParcelPoint Logo"
              className="h-16 w-auto hidden dark:block"
            />
            <div className="flex flex-col">
              <span className="text-3xl text-gray-900 dark:text-white font-bold">ParcelPoint</span>
              <span className="text-sm tracking-widest text-emerald-600 dark:text-emerald-500">DROP • PAY • PICK</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Carousel */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageCarousel
                images={images}
                autoplayDelay={4000}
              />
            </div>
          </AnimatedSection>

          {/* Hero Content */}
          <AnimatedSection delay={0.4}>
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Smart Parcel Lockers for Last-Mile Delivery
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Secure, convenient, and accessible 24/7. ParcelPoint is revolutionizing parcel delivery and pickup across Kenya.
              </p>
              <div className="pt-4 space-y-4">
                <motion.a
                  href="https://parcelpoint.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-emerald-600 dark:bg-emerald-700 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg font-medium text-lg"
                >
                  <span>Visit ParcelPoint Website</span>
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn more about locations, pricing, and partnership opportunities
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose ParcelPoint?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed for busy lifestyles with security and convenience at the core
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                  <div className="text-emerald-600 dark:text-emerald-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-800 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of Parcel Delivery?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
              Visit our website to find locker locations, explore partnership opportunities, and learn how ParcelPoint can transform your delivery experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://parcelpoint.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl font-semibold text-lg"
              >
                <span>Explore ParcelPoint.co.ke</span>
                <ExternalLink className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/254759777587?text=I'm%20interested%20in%20ParcelPoint"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-emerald-800 dark:bg-emerald-700 text-white px-8 py-4 rounded-lg hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-all duration-300 shadow-xl font-semibold text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Contact Us on WhatsApp</span>
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technical Case Study Link */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-gray-800 dark:to-emerald-950/20 rounded-2xl p-8 sm:p-12 border border-emerald-200 dark:border-emerald-900">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="mb-3 inline-block px-4 py-1.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-full text-sm font-medium">
                    Technical Deep Dive
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    See How We Built ParcelPoint
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Explore the complete technical case study covering hardware design, firmware development, cloud integration, and more.
                  </p>
                  <Link href="/case-studies/parcelpoint">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg font-medium"
                    >
                      <span>View Case Study</span>
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </motion.button>
                  </Link>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="/images/parcel-point/locker/1.jpeg"
                    alt="ParcelPoint Technical Details"
                    className="w-full md:w-64 rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <Footer
        sections={[
          {
            title: 'ParcelPoint',
            links: [
              { label: 'Main Website', href: 'https://parcelpoint.co.ke' },
              { label: 'Case Study', href: '/case-studies/parcelpoint' },
              { label: 'Contact', href: 'https://wa.me/254759777587' }
            ]
          },
          {
            title: 'Squared Computing',
            links: [
              { label: 'About Us', href: '/#about' },
              { label: 'Services', href: '/#services' },
              { label: 'Blog', href: '/blog' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default ParcelPoint;
