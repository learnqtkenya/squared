'use client';

import React from 'react';
import { Monitor, Smartphone, Zap, Users, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';
import { ImageCarousel } from '@/components/ImageCarousel';

const HMIDevelopmentPage = () => {
  const hero = {
    title: 'HMI Development',
    description: 'Intuitive touchscreens and displays that make complex products simple to use.',
    capabilities: [
      'Qt/QML and LVGL frameworks',
      'Responsive touch interfaces',
      'Custom UI component design',
      'Animation and transitions',
      'Multi-screen workflows',
      'Branded visual design'
    ]
  };

  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Intuitive User Experience',
      description: 'Interfaces that feel natural from the first touch.',
      points: [
        'Minimal learning curve',
        'Clear visual hierarchy',
        'Contextual feedback',
        'Error prevention design'
      ]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Modern Aesthetics',
      description: 'Premium look and feel that elevates your brand.',
      points: [
        'Custom branded themes',
        'Consistent design language',
        'Smooth animations',
        'Professional polish'
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Optimized Performance',
      description: 'Responsive UIs that run smoothly on embedded hardware.',
      points: [
        '60 FPS rendering',
        'Minimal memory footprint',
        'Hardware acceleration',
        'Battery-efficient rendering'
      ]
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Scalable Architecture',
      description: 'Modular designs that grow with your product.',
      points: [
        'Reusable components',
        'Theme customization',
        'Multi-resolution support',
        'Easy feature additions'
      ]
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: 'Cross-Platform Support',
      description: 'Deploy to multiple display types and resolutions.',
      points: [
        'LVGL for resource-constrained',
        'Qt for high-end displays',
        'Responsive layouts',
        'Orientation flexibility'
      ]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Design-to-Code',
      description: 'Pixel-perfect implementation from mockups.',
      points: [
        'Figma to code workflow',
        'Design system integration',
        'Component libraries',
        'Style consistency'
      ]
    }
  ];

  return (
    <ServicePageLayout hero={hero} benefits={benefits}>
      {/* Featured Project */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Project
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A complete touchscreen experience for secure parcel management
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-emerald-950/20 rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-200 dark:border-emerald-900">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <ImageCarousel
                    images={[
                      '/images/parcel-point/ui/1.png',
                      '/images/parcel-point/ui/2.png',
                      '/images/parcel-point/ui/3.png',
                      '/images/parcel-point/ui/4.png'
                    ]}
                    autoplayDelay={4000}
                  />
                </div>
                <div>
                  <div className="mb-4 inline-block px-4 py-1.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-full text-sm font-medium">
                    Case Study
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    ParcelPoint Touchscreen
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Qt/QML interface designed for outdoor visibility and glove operation. Integrated payment flow, QR scanning, and thermal receipt printing.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Designed for direct sunlight readability',
                      'Touch optimized for gloved hands',
                      '30-second average transaction time',
                      'Multi-language support (English/Swahili)',
                      'Integrated M-PESA payment UI',
                      'Real-time availability updates'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/case-studies/parcelpoint">
                    <button className="inline-flex items-center gap-2 bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <span>Read Full Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Framework Comparison */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Choosing the Right Framework
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We select the optimal UI framework based on your hardware capabilities and requirements
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">LVGL</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">For Resource-Constrained Systems</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Lightweight graphics library perfect for microcontrollers with limited RAM and processing power.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Runs on 64KB RAM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Modern widget library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Hardware-agnostic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">C-based development</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Qt/QML</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">For Rich, High-Performance UIs</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Professional framework for creating sophisticated, desktop-class interfaces on embedded Linux.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">GPU acceleration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Declarative QML syntax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Advanced animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Cross-platform support</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Custom</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">For Specialized Requirements</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Hand-crafted solutions using OpenGL, Vulkan, or custom rendering when you need maximum control.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Minimal overhead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Unique requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Maximum performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Tailored to hardware</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Design Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From concept to deployment, we ensure your interface is both beautiful and functional
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding users, use cases, and hardware constraints'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Creating mockups and interactive prototypes in Figma'
              },
              {
                step: '03',
                title: 'Implement',
                description: 'Building with chosen framework and optimizing performance'
              },
              {
                step: '04',
                title: 'Validate',
                description: 'Testing on actual hardware with real users'
              }
            ].map((phase, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 h-full">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{phase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default HMIDevelopmentPage;
