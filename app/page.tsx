'use client';

import React from 'react';
import { Bot, Package, Terminal, Users, ChevronRight, CheckCircle, CircuitBoard } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { COMPANY_NAME, COMPANY_DESCRIPTION } from '@/lib/constants';

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

const productFeatures = [
  'Secure Storage',
  'Easy payments integration',
  'Customer Notifications',
  'Analytics Dashboard'
];

const SquaredComputingWebsite = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CircuitBoard className="text-blue-600 h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">{COMPANY_NAME}</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#products" className="text-gray-700 hover:text-blue-600">Products</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
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
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Consult With Us
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
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
            {[
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
            ].map((service) => (
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
              <div className="flex items-center space-x-4 mb-6">
                <Package className="h-10 w-10 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Parcel Point</h3>
              </div>
              <p className="text-gray-700 mb-6">
                A comprehensive parcel storage management system designed for modern real-estates.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Secure Storage',
                  'Easy payments integration',
                  'Customer Notifications',
                  'Analytics Dashboard'
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <span>Learn more about Parcel Point</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
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
                <li>Documentation</li>
                <li>API Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>info@squaredcomputing.co.ke</li>
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