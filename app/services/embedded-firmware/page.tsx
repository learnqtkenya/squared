'use client';

import React from 'react';
import { CheckCircle, Zap, Shield, Battery, Code, Cpu, ArrowRight } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';

const EmbeddedFirmwarePage = () => {
  const hero = {
    title: 'Firmware Engineering',
    description: 'Low-level software that makes your hardware reliable, efficient, and intelligent.',
    capabilities: [
      'RTOS and bare-metal development',
      'Power-optimized implementations',
      'Real-time performance',
      'Secure boot and OTA updates',
      'Hardware abstraction layers',
      'Protocol stacks and drivers'
    ]
  };

  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Rock-Solid Reliability',
      description: 'Firmware that works consistently without crashes or unexpected behavior.',
      points: [
        '99.9%+ uptime in production',
        'Comprehensive error handling',
        'Watchdog and fault recovery',
        'Extensive testing coverage'
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Real-Time Performance',
      description: 'Fast, deterministic responses when timing matters.',
      points: [
        'Sub-millisecond response times',
        'Deterministic task scheduling',
        'Interrupt-driven architecture',
        'Optimized execution paths'
      ]
    },
    {
      icon: <Battery className="h-8 w-8" />,
      title: 'Power Efficiency',
      description: 'Maximize battery life through intelligent power management.',
      points: [
        'Deep sleep mode integration',
        'Dynamic frequency scaling',
        'Peripheral power gating',
        'Ultra-low-power protocols'
      ]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security First',
      description: 'Protection against tampering and unauthorized access.',
      points: [
        'Secure boot verification',
        'Encrypted firmware updates',
        'Memory protection units',
        'Cryptographic acceleration'
      ]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Clean Architecture',
      description: 'Maintainable code that scales with your product.',
      points: [
        'Hardware abstraction layers',
        'Modular component design',
        'Version control integration',
        'Comprehensive documentation'
      ]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Platform Expertise',
      description: 'Deep knowledge across embedded platforms.',
      points: [
        'ARM Cortex-M series',
        'ESP32, nRF, STM32',
        'RISC-V architectures',
        'Custom silicon support'
      ]
    }
  ];

  return (
    <ServicePageLayout hero={hero} benefits={benefits}>
      {/* Real-World Applications */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What We Build
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From medical devices to industrial controllers, our firmware powers products in demanding environments
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img
                    src="/images/services/smartthermostat.png"
                    alt="Smart thermostat"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">IoT Devices</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Smart thermostats, sensors, and connected devices that need to run for months on battery while maintaining cloud connectivity.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Battery life optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Wireless protocol stacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Cloud integration</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img
                    src="/images/services/medicalmonitoringdevice.jpg"
                    alt="Medical monitoring device"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Medical Equipment</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Critical monitoring and diagnostic equipment where reliability and precise timing are non-negotiable.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Safety-critical design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Real-time signal processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Regulatory compliance</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img
                    src="/images/services/industrialcontrolpanel.png"
                    alt="Industrial control panel"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Industrial Control</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Factory automation, motor controllers, and PLCs that demand precision and uptime in harsh environments.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Deterministic control loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>Industrial protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                    <span>EMI/EMC hardening</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Project
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-emerald-950/20 rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-200 dark:border-emerald-900">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="/images/parcel-point/locker/1.jpeg"
                    alt="ParcelPoint Smart Locker"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="mb-4 inline-block px-4 py-1.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-full text-sm font-medium">
                    Case Study
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    ParcelPoint Smart Locker
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Multi-processor firmware managing secure access control, payment processing, cloud connectivity, and thermal printing.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      '99.7% uptime across fleet',
                      'Secure boot and encrypted OTA',
                      'Real-time payment processing',
                      'Remote monitoring and diagnostics'
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

      {/* Platform Support */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Platforms We Support
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Deep expertise across major embedded platforms and architectures
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: 'ARM Cortex-M', logo: '/images/services/logos/arm.png' },
              { name: 'STM32', logo: '/images/services/logos/STMicroelectronics.png' },
              { name: 'ESP32', logo: '/images/services/logos/John-Lee.svg' },
              { name: 'Nordic nRF', logo: '/images/services/logos/Nordic-Semiconductor.png' },
              { name: 'RISC-V', logo: '/images/services/logos/RISC-V-International.svg' },
              { name: 'Microchip', logo: '/images/services/logos/Microchip.png' },
              { name: 'TI', logo: '/images/services/logos/Texas-Instruments.png' },
              { name: 'Renesas', logo: '/images/services/logos/Renesas-Electronics.svg' },
              { name: 'NXP', logo: '/images/services/logos/Nordic-Semiconductor.png' },
              { name: 'Infineon', logo: '/images/services/logos/Infineon.svg' }
            ].map((platform, idx) => (
              <AnimatedSection key={platform.name} delay={idx * 0.05}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg flex flex-col items-center justify-center group">
                  <img
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="h-12 mb-3 dark:filter dark:brightness-90 dark:invert group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 text-center font-medium">{platform.name}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default EmbeddedFirmwarePage;
