'use client';

import React from 'react';
import { Layers, Cpu, Workflow, PencilRuler, ShieldCheck, Wrench, ArrowRight, Zap } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';

const EmbeddedSystemsDesignPage = () => {
  const hero = {
    title: 'Hardware Design & Integration',
    description: 'Complete product development from concept to manufacturing-ready hardware.',
    capabilities: [
      'Custom PCB design and layout',
      'Schematic capture and review',
      'Component selection and sourcing',
      'Prototype development and testing',
      'DFM optimization',
      'Manufacturing support'
    ]
  };

  const benefits = [
    {
      icon: <PencilRuler className="h-8 w-8" />,
      title: 'End-to-End Design',
      description: 'From initial concept to production-ready hardware.',
      points: [
        'Requirements analysis',
        'Architecture design',
        'Component selection',
        'Layout optimization'
      ]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Hardware Expertise',
      description: 'Deep knowledge across embedded platforms and peripherals.',
      points: [
        'Microcontroller selection',
        'Power supply design',
        'Signal integrity analysis',
        'EMI/EMC compliance'
      ]
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: 'System Integration',
      description: 'Seamless integration of hardware, firmware, and software.',
      points: [
        'Hardware-software co-design',
        'Peripheral integration',
        'Communication protocols',
        'Sensor interfaces'
      ]
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Prototype Development',
      description: 'Rapid prototyping and iterative design validation.',
      points: [
        'Quick-turn PCB fabrication',
        'Assembly and bring-up',
        'Hardware debugging',
        'Design verification'
      ]
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'Design for Manufacturing',
      description: 'Production-ready designs that scale efficiently.',
      points: [
        'DFM/DFA optimization',
        'BOM cost reduction',
        'Test point planning',
        'Manufacturing documentation'
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance Optimization',
      description: 'Maximizing efficiency and reliability.',
      points: [
        'Power consumption analysis',
        'Thermal management',
        'Cost optimization',
        'Reliability engineering'
      ]
    }
  ];

  return (
    <ServicePageLayout hero={hero} benefits={benefits}>
      {/* Development Process */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven methodology that takes your product from concept to production
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                phase: '01',
                title: 'Requirements & Architecture',
                description: 'Define specifications, select components, and design system architecture',
                items: ['Technical requirements', 'Component selection', 'Block diagrams', 'Cost analysis']
              },
              {
                phase: '02',
                title: 'Schematic & Layout',
                description: 'Create detailed schematics and optimize PCB layout for performance',
                items: ['Schematic capture', 'PCB layout', 'Signal integrity', 'Power distribution']
              },
              {
                phase: '03',
                title: 'Prototype & Test',
                description: 'Build prototypes, conduct thorough testing, and validate design',
                items: ['PCB fabrication', 'Assembly', 'Hardware bring-up', 'Functional testing']
              },
              {
                phase: '04',
                title: 'Production & Support',
                description: 'Prepare manufacturing documentation and support production ramp',
                items: ['Manufacturing files', 'Assembly drawings', 'Test procedures', 'Vendor support']
              }
            ].map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-950/10 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl h-full">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-4">{step.phase}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{step.description}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1 h-1 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies & Tools */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Design Tools & Technologies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Industry-standard tools for professional hardware development
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">PCB Design</h3>
                <ul className="space-y-3">
                  {[
                    'KiCad for open-source flexibility',
                    'Altium Designer for complex designs',
                    'EAGLE for rapid prototyping',
                    'Cadence Allegro for high-speed'
                  ].map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Simulation & Analysis</h3>
                <ul className="space-y-3">
                  {[
                    'SPICE for circuit simulation',
                    'Signal integrity analysis',
                    'Thermal simulation tools',
                    'Power integrity validation'
                  ].map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl h-full">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manufacturing Prep</h3>
                <ul className="space-y-3">
                  {[
                    'Gerber file generation',
                    'DFM/DFA analysis tools',
                    'BOM management systems',
                    'Assembly documentation'
                  ].map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{tool}</span>
                    </li>
                  ))}
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
                    alt="ParcelPoint Hardware"
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
                    Complete hardware system including custom PCBs, power management, motor control, RFID, payment terminal integration, and industrial enclosure design.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Multi-board system architecture',
                      'Industrial-grade power supply design',
                      'Motor control and lock mechanisms',
                      'Payment terminal and thermal printer integration',
                      'RFID reader integration',
                      'Cloud connectivity via 4G LTE'
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

      {/* What We Design */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What We Design
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From simple controllers to complex multi-board systems
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'IoT Devices',
                examples: ['Smart sensors', 'Connected appliances', 'Environmental monitors', 'Asset trackers']
              },
              {
                title: 'Industrial Control',
                examples: ['PLC systems', 'Motor controllers', 'Process automation', 'HMI panels']
              },
              {
                title: 'Consumer Electronics',
                examples: ['Wearable devices', 'Smart home products', 'Audio equipment', 'Portable devices']
              },
              {
                title: 'Medical Devices',
                examples: ['Patient monitors', 'Diagnostic equipment', 'Portable analyzers', 'Therapy devices']
              },
              {
                title: 'Automotive Systems',
                examples: ['ECU modules', 'Infotainment systems', 'Sensor interfaces', 'Telematics units']
              },
              {
                title: 'Custom Solutions',
                examples: ['One-off prototypes', 'Research equipment', 'Test fixtures', 'Specialized tools']
              }
            ].map((category, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg h-full">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">→</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default EmbeddedSystemsDesignPage;
