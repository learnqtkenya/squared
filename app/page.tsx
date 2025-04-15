'use client';

import React from 'react';
import {
  Cpu,
  Settings,
  CheckCircle,
  ChevronRight,
  Monitor,
  Code,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { ValuePropositions } from '@/components/ValuePropositions';
import { ServicesGrid } from '@/components/ServicesGrid';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';


const SquaredComputingWebsite = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navigation onScrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Full-Stack Embedded Systems Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We specialize in HMI design, embedded firmware, and full-stack embedded systems development.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => scrollToSection('expertise')}
                  className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Our Expertise
                </button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-emerald-200">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our End-to-End Solutions</h3>
                <div className="space-y-4">
                  {[
                    'HMI & GUI Solutions',
                    'Custom Hardware Design and Manufacturing',
                    'Custom Control Solutions',
                    'PCB Design & Layout', 
                    'Firmware Development',
                    'IoT Integration'
                    ].map((capability) => (
                    <div key={capability} className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-600">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Services</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* HMI Development */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <Monitor className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">HMI Development</h3>
              <p className="text-gray-600 mb-6">
                Custom UI solutions with LVGL, TouchGFX, Qt, and custom OpenGL/Vulkan-based interfaces.
              </p>
              <Link href="/services/hmi-development">
                <button className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Embedded Firmware */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Embedded Firmware</h3>
              <p className="text-gray-600 mb-6">
                Expertise in bare-metal programming, RTOS, and power-efficient firmware design.
              </p>
              <Link href="/services/embedded-firmware">
                <button className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Embedded Systems Design */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <Layers className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Embedded Systems Design</h3>
              <p className="text-gray-600 mb-6">
                End-to-end services from PCB design to optimized firmware implementation.
              </p>
              <Link href="/services/embedded-systems-design">
                <button className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* <div className="mt-12 text-center">
            <Link href="/services">
              <button className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                <span>View All Services</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Key Values Section */}
      <section id="expertise" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Why Choose Us</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We combine technical excellence with business acumen to deliver solutions that drive your success.
          </p>
          <ValuePropositions />

          <div className="mt-16 bg-emerald-50 p-8 rounded-xl border border-emerald-200">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Our Technical Foundation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cpu className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Senior Embedded Systems Engineering</h4>
                    <p className="text-gray-600">10+ years of C++ and system architecture expertise</p>
                  </div>
                </div>
                <div className="pl-16">
                  <ul className="space-y-2">
                    {[
                      'Real-time systems development',
                      'Hardware architecture design',
                      'Performance optimization',
                      'Low-level programming'
                    ].map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-600">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mechatronics Engineering</h4>
                    <p className="text-gray-600">Specialized in mechanical-electronic integration</p>
                  </div>
                </div>
                <div className="pl-16">
                  <ul className="space-y-2">
                    {[
                      'CAD/CAM design expertise',
                      'Prototype development',
                      'Control systems',
                      'Industrial automation'
                    ].map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-600">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Case Study</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A showcase of our end-to-end embedded solutions capabilities
          </p>

          <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  End-to-End Solution
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4">ParcelPoint Smart Locker System</h3>
                <p className="text-gray-600 mb-6">
                  A complete embedded solution showcasing our expertise in hardware design, secure firmware,
                  intuitive HMI, and cloud connectivity for automated parcel management.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Custom hardware design and manufacturing',
                    'Secure microprocessor firmware',
                    'Intuitive touchscreen HMI with Qt',
                    'Mobile and desktop apps integration',
                    'Cloud-based management system',
                    'M-PESA payment integration'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/case-studies/parcelpoint">
                  <button className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                    <span>View Case Study</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
              <img
                src="/images/parcel-point/locker/1.jpeg"
                alt="ParcelPoint Locker"
                className="rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Start Your Project</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Ready to bring your embedded systems project to life? Let's discuss how our expertise
            in hardware design, firmware development, and HMI solutions can help achieve your goals.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer
        sections={[
          {
            title: 'Services',
            links: [
              { label: 'HMI Development', href: '/services/hmi-development' },
              { label: 'Embedded Firmware', href: '/services/embedded-firmware' },
              { label: 'Embedded Systems Design', href: '/services/embedded-systems-design' },
              { label: 'IoT Solutions', href: '/services/iot-solutions' }
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

export default SquaredComputingWebsite;