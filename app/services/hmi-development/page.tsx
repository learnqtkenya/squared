'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Layers,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Smartphone,
  Zap,
  MessageSquare,
  Users
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
              <dt className="font-medium">HMI (Human-Machine Interface)</dt>
              <dd>The screen or display that allows people to interact with machines or devices.</dd>
            </div>
            <div>
              <dt className="font-medium">UI/UX</dt>
              <dd>User Interface (how it looks) and User Experience (how it feels to use) - together they make products intuitive and enjoyable.</dd>
            </div>
            <div>
              <dt className="font-medium">LVGL</dt>
              <dd>A graphics library used to create modern-looking screens on devices with limited memory.</dd>
            </div>
            <div>
              <dt className="font-medium">TouchGFX</dt>
              <dd>A framework that makes it possible to create smartphone-like experiences on simple hardware.</dd>
            </div>
            <div>
              <dt className="font-medium">Qt</dt>
              <dd>A powerful software framework that enables creation of sophisticated interfaces across many different devices.</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

const UserFriendlyInterfacesPage = () => {
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
                User-Friendly Interfaces
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Intuitive touchscreens and displays that make your products easy to use while showcasing your brand's quality.
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
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">What We Create</h3>
                <div className="space-y-4">
                  {[
                    'Touchscreens for products and equipment',
                    'Control panels for complex devices',
                    'Mobile-like experiences on embedded devices',
                    'Customized user interfaces',
                    'Intuitive navigation systems',
                    'Interactive user feedback systems'
                  ].map((capability) => (
                    <div key={capability} className="flex items-center space-x-3">
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

      {/* What Is A User Interface Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Is A User Interface?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Think of a user interface as the "face" of your product - it's what your customers see and touch when they use your device.
            A great interface makes complex technology simple to use, creating a positive experience with your brand.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/images/services/multi-touch.jpg"
              alt="User touching an interface display"
              className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            />
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">It's Like Your Product's Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Just as a car's dashboard puts all the important controls at your fingertips, a well-designed user interface gives your customers
                intuitive control over your product's features.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our interfaces combine appealing visual design with thoughtful functionality to create experiences that feel natural and 
                make your products stand out in the market.
              </p>
              
              <TechnicalGlossary />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Benefits of Great Interfaces</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Increased Usability */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Increased Usability</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Make your products accessible to everyone, regardless of technical skill level.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Reduces training time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Decreases user errors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Expands your customer base</span>
                </li>
              </ul>
            </div>
            
            {/* Enhanced Brand Value */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Enhanced Brand Value</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Elevate your product's perceived quality with interfaces that look and feel premium.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Custom branded design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Modern, polished appearance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Stand out from competitors</span>
                </li>
              </ul>
            </div>
            
            {/* Better User Experience */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Better User Experience</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create satisfying interactions that keep customers happy and coming back.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Higher satisfaction rates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Increased product loyalty</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Better product reviews</span>
                </li>
              </ul>
            </div>
            
            {/* Optimized Performance */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Optimized Performance</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get responsive interfaces that work smoothly on your specific hardware.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Fast response times</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Battery-efficient design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Hardware-optimized code</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Approach</h2>
          
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
            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">1</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Understanding Users</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We analyze how your customers will use your product to design interfaces that feel intuitive from the first touch.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">2</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Visual Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We create beautiful, branded screens that align with your company identity and make your product stand out.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">3</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Prototype & Test</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We build working prototypes and test them with real users to ensure your interface is both intuitive and efficient.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">4</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Final Implementation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We integrate the perfected interface with your product, ensuring it runs smoothly and responds quickly.
                </p>
              </div>
            </div>
          )}
          
          {/* Technical Tab Content */}
          {activeTab === 'technical' && (
            <div className="bg-emerald-50 dark:bg-gray-800 p-8 rounded-xl border border-emerald-100 dark:border-emerald-900">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Technical Process</h3>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">UI/UX Design</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We create wireframes and visual designs optimized for your specific hardware constraints and user scenarios.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">User flow mapping</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Wireframing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">High-fidelity mockups</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Technologies Used:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Figma, Adobe XD, Sketch
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Framework Selection</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We select the optimal UI framework based on your hardware specifications and feature requirements.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Hardware capability analysis</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Framework performance comparison</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Feature requirement matching</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Frameworks:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Qt/QML, LVGL, TouchGFX, Custom OpenGL/Vulkan
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Implementation</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We develop the interface using the selected framework with a focus on performance optimization.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Component development</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Animation optimization</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Performance profiling</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Languages:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      C++, QML, JavaScript, Python
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Testing & Validation</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We verify the interface works correctly across all use cases and hardware configurations.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Usability testing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Performance benchmarking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Field testing on target hardware</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Tools:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Automated UI testing, performance profilers, hardware simulators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Before & After Comparison */}
      {/* <section className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">The Transformation</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Before</h3>
              <img
                src="/images/services/badui.png"
                alt="Complex, cluttered interface before redesign"
                className="rounded-lg shadow-sm mb-6"
              />
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <ChevronRight className="h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Confusing layout with too many buttons</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ChevronRight className="h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Technical jargon intimidating to users</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ChevronRight className="h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Sluggish response times</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ChevronRight className="h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Outdated visual design</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">After</h3>
              <img
                src="/images/services/goodui.png"
                alt="Clean, intuitive interface after redesign"
                className="rounded-lg shadow-sm mb-6"
              />
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Clean, focused layout highlighting key features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">User-friendly language and intuitive icons</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Smooth, responsive interactions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-300">Modern design reflecting brand identity</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-white dark:bg-gray-900 p-8 rounded-xl border border-emerald-200 dark:border-emerald-900">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Results</h3>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">70%</div>
                <p className="text-gray-600 dark:text-gray-300">Decrease in user errors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">35%</div>
                <p className="text-gray-600 dark:text-gray-300">Increase in feature usage</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">4.8/5</div>
                <p className="text-gray-600 dark:text-gray-300">Customer satisfaction rating</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Case Study */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Featured Interface Project</h2>
          
          <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-emerald-200 dark:border-emerald-900">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/images/parcel-point/locker/1.jpeg"
                alt="ParcelPoint Smart Locker Interface"
                className="rounded-lg shadow-sm"
              />
              <div>
                <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                  Success Story
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ParcelPoint Smart Locker Interface</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We created an intuitive touchscreen interface that allowed users to quickly deposit or retrieve parcels in under 30 seconds, 
                  even if they'd never used the system before.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Simple, step-by-step process reduced user errors by 85%',
                    'Clear visual feedback eliminated confusion',
                    'Integrated M-PESA payment flow streamlined transactions',
                    'Multilingual support expanded accessibility'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
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
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How long does it take to develop a user interface?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Timeline depends on complexity, but typical projects range from 4-12 weeks. Simple interfaces may be completed in as little as 3 weeks, 
                while complex systems with multiple screens and advanced features can take 3-4 months.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">What types of screens can you work with?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We work with virtually all display technologies, from small monochrome LCDs to high-resolution color touchscreens. Our solutions adapt to your 
                hardware constraints while maximizing visual appeal and usability.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Can you update our existing product interface?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! We specialize in modernizing existing interfaces without requiring complete hardware redesigns. We can work with your current system 
                to improve usability and appearance while maintaining compatibility.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Do you provide support after the interface is complete?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely. We offer ongoing support packages to help maintain and update your interface as needed. This includes bug fixes, feature enhancements, 
                and adaptations as your product evolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Start Your Interface Project</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Ready to make your product easier to use and more appealing to customers? Let's discuss
            how our interface design expertise can help achieve your business goals.
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

export default UserFriendlyInterfacesPage;