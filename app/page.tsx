'use client';

import React from 'react';
import {
  CircuitBoard,
  Cpu,
  Settings,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { ValuePropositions } from '@/components/ValuePropositions';
import { ServicesGrid } from '@/components/ServicesGrid';
import { Footer } from '@/components/Footer';
import { COMPANY_NAME, COMPANY_DESCRIPTION } from '@/lib/constants';

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
      <header className="bg-white/90 shadow-sm backdrop-blur-sm fixed w-full z-50 border-b border-emerald-100">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                src="/images/squared/squared_computing_dark.png"
                alt="Squared Computing Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-800">{COMPANY_NAME}</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-emerald-600">
                Services
              </button>
              <button onClick={() => scrollToSection('expertise')} className="text-gray-600 hover:text-emerald-600">
                Expertise
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-600 hover:text-emerald-600">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-emerald-600">
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Full-Stack Embedded Systems Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From hardware design to IoT implementation, we deliver end-to-end embedded solutions that bring your ideas to life.
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
                    'Hardware Design & PCB Layout',
                    'Firmware Development',
                    'IoT Integration',
                    'Rapid Prototyping',
                    'GUI Development with Qt',
                    'Custom Electronics Solutions'
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


      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Services</h2>
          <ServicesGrid />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Featured Project</h2>
          <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4">ParcelPoint Smart Locker System</h3>
                <p className="text-gray-600 mb-6">
                  A complete IoT solution featuring custom hardware design, secure firmware,
                  and cloud connectivity for automated parcel management.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Custom hardware design and manufacturing',
                    'Secure microprocessor firmware',
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
                <Link href="/parcelpoint">
                  <button className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                    <span>Learn More</span>
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
            in hardware design, firmware development, and IoT solutions can help achieve your goals.
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
              { label: 'Hardware Design' },
              { label: 'Firmware Development' },
              { label: 'IoT Solutions' },
              { label: 'Qt Development' }
            ]
          },
          {
            title: 'Products',
            links: [
              { label: 'ParcelPoint', href: '/parcelpoint' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default SquaredComputingWebsite;