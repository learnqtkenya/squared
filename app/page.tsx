'use client';

import React from 'react';
import { Bot, Package, Terminal, Users, ChevronRight, CheckCircle, CircuitBoard } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { COMPANY_NAME, COMPANY_DESCRIPTION } from '@/lib/constants';
import Link from 'next/link';

const services = [
  {
    title: 'Custom Firmware',
    icon: <CircuitBoard className="h-8 w-8 text-blue-600" />,
    description: 'Tailored firmware solutions for your specific hardware needs'
  },
  {
    title: 'Consulting',
    icon: <Users className="h-8 w-8 text-blue-600" />,
    description: 'Informed guidance on architecture, optimization, and best practices'
  },
  {
    title: 'System Integration',
    icon: <Terminal className="h-8 w-8 text-blue-600" />,
    description: 'Seamless integration of firmware with existing systems'
  }
];

const parcelPointFeatures = [
  "24/7 secure parcel access with SMS notifications",
  "Integrated MPESA payment system",
  "Weather-resistant, durable design",
  "Suitable for residential and commercial properties",
  "Simple user interface with digital access codes",
  "Centralized delivery management",
];

const SquaredComputingWebsite = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                src="/images/squared/squared_computing_dark.png"
                alt="Squared Computing Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">{COMPANY_NAME}</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-gray-700 hover:text-blue-600"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600"
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Firmware Development Consulting
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                We help businesses and individuals bring their hardware to life with custom firmware solutions and informed consulting services.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Consult With Us
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Our Services
                </button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Bot className="h-16 w-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Services</h3>
              <div className="space-y-4">
                {[
                  'Embedded Systems Development',
                  'IoT Firmware Solutions',
                  'Hardware Integration',
                  'Performance Optimization'
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Firmware Development Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Products</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Product Header */}
              <div className="flex items-center space-x-4 mb-6">
                <Package className="h-10 w-10 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">ParcelPoint</h3>
              </div>

              {/* Product Description */}
              <p className="text-gray-700 mb-8 text-lg">
                A secure, smart parcel locker system designed for seamless last-mile delivery.
                Strategically placed in residential communities, commercial centers, schools,
                and offices for ultimate convenience.
              </p>

              {/* Target Markets */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Perfect for:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Residential complexes and gated communities</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Shopping malls and e-commerce collection points</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Universities and educational institutions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Corporate offices and business centers</span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {parcelPointFeatures.map((feature) => (
                    <div key={feature} className="flex items-start space-x-2">
                      <CheckCircle className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 flex items-center justify-between">
                <Link
                  href="/parcel-point"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <span>Learn more about ParcelPoint</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">About Us</h2>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            {COMPANY_DESCRIPTION} We specialize in creating robust firmware solutions
            and providing expert consulting services to help businesses optimize their
            hardware implementations.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            Looking for seasoned firmware development consulting? Let us help bring your hardware to life.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CircuitBoard className="h-6 w-6" />
                <span className="font-bold">{COMPANY_NAME}</span>
              </div>
              <p className="text-gray-300">
                {COMPANY_DESCRIPTION}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Custom Firmware</li>
                <li>Consulting</li>
                <li>System Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Parcel Point</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>hello@squared.co.ke</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-300">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SquaredComputingWebsite;