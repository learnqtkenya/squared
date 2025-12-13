'use client';

import React from 'react';
import { Navigation, Footer } from '@/components/layout';
import { AnimatedSection, AnimatedCard } from '@/components/ui';
import { Users, Target, Lightbulb, Award, Code, Cpu, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Excellence in Engineering',
      description: 'We deliver high-quality, production-ready solutions that meet the highest industry standards.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex problems.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Client Partnership',
      description: 'We work closely with our clients as partners, ensuring their vision becomes reality.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Reliability & Trust',
      description: 'We build long-term relationships based on trust, transparency, and consistent delivery.'
    }
  ];

  const expertise = [
    {
      icon: <Code className="h-12 w-12" />,
      title: 'Firmware Development',
      description: 'Expert firmware engineering for microcontrollers and embedded systems using C/C++, Rust, and modern RTOS platforms.',
      skills: ['Bare-metal programming', 'RTOS development', 'Device drivers', 'Bootloaders']
    },
    {
      icon: <Cpu className="h-12 w-12" />,
      title: 'Hardware Design',
      description: 'Complete hardware design services from concept to production, including PCB design and component selection.',
      skills: ['PCB design & layout', 'Circuit design', 'Power systems', 'Manufacturing support']
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'HMI Development',
      description: 'Beautiful, responsive user interfaces for embedded devices using modern frameworks and technologies.',
      skills: ['Qt/QML', 'LVGL', 'TouchGFX', 'Web-based UIs']
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: 'IoT Solutions',
      description: 'End-to-end IoT solutions with cloud connectivity, data analytics, and remote device management.',
      skills: ['Cloud integration', 'MQTT/CoAP', 'Edge computing', 'Device security']
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Complete Product Solutions from Concept to Market
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We design, build, and deliver complete embedded products—from custom hardware and firmware to beautiful user interfaces and cloud integration.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-emerald-200 dark:border-emerald-900">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Squared Computing was founded with a clear mission: to deliver complete embedded product solutions from initial concept through to manufacturing. Based in Kenya, we serve clients globally, bringing world-class end-to-end product development expertise to the rapidly growing embedded systems industry.
                </p>
                <p>
                  We don't just write firmware or design circuits—we build complete products. Our team handles the entire product development chain: custom PCB design and layout, firmware development, beautiful user interfaces, enclosure design, manufacturing coordination, and even cloud backend integration when needed.
                </p>
                <p>
                  What sets us apart is our holistic approach to product development. Whether it's a smart IoT device, industrial controller, or consumer electronics product, we take ownership of the entire journey—delivering production-ready solutions that are manufacturable, testable, and ready for market.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-900/50 h-full">
                  <div className="text-emerald-600 dark:text-emerald-500 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive embedded systems development capabilities
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((area, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-900/50 h-full hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300">
                  <div className="text-emerald-600 dark:text-emerald-500 mb-6">
                    {area.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {area.description}
                  </p>
                  <div className="space-y-2">
                    {area.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-800 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
              Let's discuss your project and how we can help bring your embedded systems vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl font-semibold text-lg"
                >
                  Get in Touch
                </motion.button>
              </Link>
              <Link href="/case-studies/parcelpoint">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-800 dark:bg-emerald-700 text-white px-8 py-4 rounded-lg hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-all duration-300 shadow-xl font-semibold text-lg border border-emerald-700 dark:border-emerald-600"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
