'use client';

import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Server,
  Workflow,
  PencilRuler,
  Clock,
  BarChart4,
  ShieldCheck,
  Wrench,
  Settings,
  Star,
  Monitor,
  Code
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const TechnicalGlossary = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 mx-auto"
      >
        <span>{isOpen ? "Hide Technical Details" : "What do these technical terms mean?"}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
          <h4 className="font-bold mb-4">Technical Glossary</h4>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium">Embedded System</dt>
              <dd>A specialized computer system built into a larger product or device to perform specific functions.</dd>
            </div>
            <div>
              <dt className="font-medium">PCB (Printed Circuit Board)</dt>
              <dd>The physical foundation that connects electronic components together in a device.</dd>
            </div>
            <div>
              <dt className="font-medium">Hardware Architecture</dt>
              <dd>The arrangement and selection of electronic components that make up a device's physical system.</dd>
            </div>
            <div>
              <dt className="font-medium">System Integration</dt>
              <dd>The process of bringing together different subsystems into one complete, functioning system.</dd>
            </div>
            <div>
              <dt className="font-medium">DFM (Design for Manufacturing)</dt>
              <dd>An approach that optimizes products for easier, more reliable production at scale.</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

const CompleteProductDevelopmentPage = () => {
  const [activeTab, setActiveTab] = useState('business'); // 'business' or 'technical'
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white dark:from-gray-900 to-emerald-50 dark:to-emerald-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/" className="inline-flex items-center text-emerald-600 dark:text-emerald-500 mb-6 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Complete Product Development
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                End-to-end solutions from concept to manufacturing, turning your product vision into reality.
              </p>
              <div className="flex space-x-4">
                <Link href="#contact">
                  <button className="bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm">
                    Start Your Project
                  </button>
                </Link>
                <Link href="#benefits">
                  <button className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-6 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                    Key Benefits
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-900">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">What We Deliver</h3>
                <div className="space-y-4">
                  {[
                    'Complete working prototypes',
                    'Production-ready designs',
                    'Technical documentation',
                    'Manufacturing support',
                    'Certification assistance',
                    'Ongoing product maintenance'
                  ].map((capability, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 dark:text-emerald-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Complete Product Development Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Is Complete Product Development?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Complete product development is the entire journey from initial idea to finished product. We handle all the complex 
            technical challenges so you can focus on your business goals and customer needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/images/services/product-dev.jpg"
              alt="Product development illustration"
              className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            />
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">We Build Your Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Think of us as your technical partner that transforms your idea into a market-ready product. We combine 
                hardware design, software development, and manufacturing expertise to create something that works exactly 
                as you imagined.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our team handles all the technical complexities - from designing electronics and writing software to creating 
                prototypes and setting up manufacturing. This comprehensive approach saves you time, reduces risk, 
                and gets your product to market faster.
              </p>
              
              <TechnicalGlossary />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Benefits of End-to-End Development</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Faster Time to Market */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Faster Time to Market</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get your product to customers sooner with a streamlined development process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">30-40% faster development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Fewer handoff delays</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Coordinated timelines</span>
                </li>
              </ul>
            </div>
            
            {/* Reduced Development Risk */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reduced Development Risk</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Avoid costly mistakes and unexpected problems with our integrated approach.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Early issue identification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Better component compatibility</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Single point of responsibility</span>
                </li>
              </ul>
            </div>
            
            {/* Lower Total Cost */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <BarChart4 className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Lower Total Cost</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Save money through smarter design decisions and efficient development.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">15-25% cost reduction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Fewer expensive revisions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Optimized manufacturing</span>
                </li>
              </ul>
            </div>
            
            {/* Better Product Quality */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Better Product Quality</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create products that perform better and last longer.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Higher reliability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Better user experience</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Fewer field failures</span>
                </li>
              </ul>
            </div>
            
            {/* Simplified Management */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Workflow className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Simplified Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Work with one team instead of coordinating multiple vendors.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Single point of contact</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Unified project timeline</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Less management overhead</span>
                </li>
              </ul>
            </div>
            
            {/* Manufacturing Support */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Settings className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manufacturing Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get expert guidance when transitioning from design to production.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Production documentation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Factory liaison services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Quality control guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Development Process</h2>
          
          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-emerald-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => setActiveTab('business')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'business'
                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                    : 'text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                Business View
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'technical'
                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                    : 'text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                Technical View
              </button>
            </div>
          </div>
          
          {/* Business Tab Content */}
          {activeTab === 'business' && (
            <div className="relative">
              {/* Process Timeline */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-200 dark:bg-emerald-900/50 transform -translate-x-1/2 hidden md:block"></div>
              
              <div className="space-y-16 relative">
                {/* Step 1 */}
                <div className="md:grid md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right">
                    <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                      Step 1
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understand Your Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We start by thoroughly understanding your product vision, business goals, and customer needs. This foundation
                      ensures we're building exactly what you need.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 relative">
                    <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                    <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Deliverables:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Product requirements document</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Market positioning assessment</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Project roadmap</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="md:grid md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-last">
                    <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                      Step 2
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Design & Architecture</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We create the blueprint for your product, designing the electronic and mechanical components and how they'll
                      work together. This phase sets the foundation for a successful build.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 relative">
                    <div className="hidden md:block absolute right-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform translate-x-1/2 -translate-y-1/2 z-10"></div>
                    <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Deliverables:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">System architecture diagrams</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Component selection</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Design concepts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:grid md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right">
                    <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                      Step 3
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prototype Development</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We build working prototypes that demonstrate functionality and allow for testing and refinement. This is
                      where your product starts to become real.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 relative">
                    <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                    <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Deliverables:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Working prototype</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Initial software implementation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Testing results and refinements</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="md:grid md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-last">
                    <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                      Step 4
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Production & Scaling</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We prepare your design for manufacturing and help coordinate with production facilities to ensure quality 
                      and consistency in the final product.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 relative">
                    <div className="hidden md:block absolute right-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform translate-x-1/2 -translate-y-1/2 z-10"></div>
                    <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Deliverables:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Manufacturing documentation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Quality control procedures</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">Production samples</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Technical Tab Content */}
          {activeTab === 'technical' && (
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <PencilRuler className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Hardware Design</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Circuit design and simulation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">PCB layout and routing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Component selection and BOM management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Signal integrity analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">EMI/EMC design considerations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Design for Manufacturing (DFM)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Code className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Firmware Development</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Bare-metal and RTOS implementations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Device driver development</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Power management optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Secure bootloader implementation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">OTA update systems</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Communication protocol implementation</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Monitor className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">User Interface Design</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">HMI/GUI development</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Touch interface optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">UI/UX design for embedded systems</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Responsive design for different displays</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">User flow optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Framework integration (Qt, LVGL, etc.)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Wrench className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Testing & Validation</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Hardware verification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Software validation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Environmental testing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">EMC/EMI testing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Regulatory compliance guidance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Performance benchmarking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {/* <section className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Real Results for Clients</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-4">40%</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Faster Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                TODO
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-4">75%</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Fewer Revisions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                TODO
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-4">25%</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Cost Reduction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                TODO.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Case Study */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Featured Project</h2>
          
          <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-emerald-200 dark:border-emerald-900">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/images/parcel-point/locker/1.jpeg"
                alt="ParcelPoint Smart Locker"
                className="rounded-lg shadow-sm"
              />
              <div>
                <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                  Success Story
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ParcelPoint Smart Locker System</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We developed the complete ParcelPoint solution from initial concept to manufacturing-ready design. This end-to-end
                  project showcases our ability to handle every aspect of product development.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Cut development time by 35% using our integrated approach',
                    'Created hardware design optimized for efficient manufacturing',
                    'Developed secure, reliable software for critical operations',
                    'Built intuitive user interfaces for both customers and operators',
                    'Implemented secure payment integration and cloud connectivity',
                    'Provided full manufacturing support documentation'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/case-studies/parcelpoint">
                  <button className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors">
                    <span>View Full Case Study</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How much does full product development cost?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Project costs depend on complexity, with typical projects ranging from 25,000 for simple products to 150,000+ for complex systems.
                We provide detailed quotes after an initial consultation to understand your specific needs.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How long does the development process take?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Most projects take 4-8 weeks from concept to production-ready design. Simple products can be completed in as little as 3 weeks, while
                more complex or highly regulated products may take 12-18 weeks.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Can you help with an existing product?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we frequently help clients improve existing products by enhancing features, reducing costs, improving reliability,
                or preparing for manufacturing scale-up. We can work with your existing designs and documentation.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Do you help with manufacturing?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                While we don't manufacture products ourselves, we provide complete manufacturing documentation and can work with your 
                chosen manufacturer or recommend trusted partners. We offer factory liaison services to ensure quality control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Start Your Product Development</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Ready to turn your product idea into reality? Let's discuss how our end-to-end
            approach can help you create a successful product efficiently and reliably.
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
              { label: 'User Interfaces', href: '/services/hmi-development' },
              { label: 'Intelligent Software', href: '/services/embedded-firmware' },
              { label: 'Product Development', href: '/services/embedded-systems-design' },
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

export default CompleteProductDevelopmentPage;