'use client';

import React, { useState } from 'react';
import {
  Code,
  Cpu,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  ArrowUpRight,
  Clock,
  BarChart,
  Battery,
  RefreshCw
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
              <dt className="font-medium">Firmware</dt>
              <dd>The permanent software programmed into a device that controls how it functions.</dd>
            </div>
            <div>
              <dt className="font-medium">RTOS (Real-Time Operating System)</dt>
              <dd>A specialized system that ensures critical tasks happen on precise schedules, essential for reliable device operation.</dd>
            </div>
            <div>
              <dt className="font-medium">Bare-metal Programming</dt>
              <dd>Writing code that works directly with the hardware without an operating system, giving maximum control and efficiency.</dd>
            </div>
            <div>
              <dt className="font-medium">OTA (Over-the-Air Updates)</dt>
              <dd>The ability to update a device's software remotely without physical access, like how your phone updates apps automatically.</dd>
            </div>
            <div>
              <dt className="font-medium">Power Management</dt>
              <dd>Techniques to control how much energy a device uses, making batteries last longer or reducing electrical consumption.</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

const IntelligentSoftwarePage = () => {
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
                Intelligent Software
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Reliable, efficient programming that gives your hardware the intelligence to perform exactly as needed.
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
                    'Smart device programming',
                    'Long-lasting battery operation',
                    'Fast, responsive controls',
                    'Secure update systems',
                    'Reliable performance',
                    'Seamless connectivity'
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

      {/* What Is Intelligent Software Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Is Intelligent Software?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Intelligent software is the "brain" of your smart product - it's what makes everything work together properly.
            Think of it as the invisible intelligence that powers your device, controlling how it responds, communicates, and manages its resources.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/images/services/robust-fw.png"
              alt="Circuit board representing intelligent software"
              className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            />
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">It's Like Your Product's Brain</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Just as your brain coordinates all your body's functions, our intelligent software coordinates all the components in your smart device.
                It ensures everything works together smoothly and reliably.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our software solutions are carefully optimized for your specific hardware, making the most of its capabilities while ensuring reliability,
                security, and efficient power usage.
              </p>
              
              <TechnicalGlossary />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Benefits of Quality Software</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reliability */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reliability</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Products that work consistently without crashes or unexpected behavior.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Fewer customer complaints</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Better product reviews</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Reduced support costs</span>
                </li>
              </ul>
            </div>
            
            {/* Performance */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Performance</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Fast, responsive operation that enhances the user experience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Instant user response</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Smoother operation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Premium feel</span>
                </li>
              </ul>
            </div>
            
            {/* Energy Efficiency */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Battery className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Energy Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Optimized power usage extending battery life and reducing costs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Longer battery operation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Lower operating costs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Greener product profile</span>
                </li>
              </ul>
            </div>
            
            {/* Security */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Security</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Protection from unauthorized access and safe update processes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Data protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Safe remote updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Reduced liability risks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Real-World Examples</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="mb-6">
                <img 
                  src="/images/services/smartthermostat.png" 
                  alt="Smart thermostat" 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Smart Thermostats</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The software in a smart thermostat model your preferences and schedule to automatically 
                adjust temperature, saving energy while keeping you comfortable.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Our role:</span> Creating efficient software that balances 
                responsive controls with battery life that lasts for months.
              </p>
            </div>
            
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="mb-6">
                <img 
                  src="/images/services/medicalmonitoringdevice.jpg" 
                  alt="Medical monitoring device" 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Medical Devices</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Critical monitoring equipment needs perfect reliability and precise timing 
                to ensure patient safety and accurate measurements.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Our role:</span> Developing reliable software with 
                built-in safety mechanisms that prevent failures in critical situations.
              </p>
            </div>
            
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="mb-6">
                <img 
                  src="/images/services/industrialcontrolpanel.png" 
                  alt="Industrial control panel" 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Industrial Controls</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Factory automation equipment requires precise timing and consistent operation to maintain 
                production efficiency and safety.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Our role:</span> Creating error-resistant software 
                that continues functioning predictably even in harsh environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Approach</h2>
          
          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-white dark:bg-gray-900 rounded-lg">
              <button
                onClick={() => setActiveTab('business')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'business'
                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                    : 'text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-800'
                } transition-colors`}
              >
                Business View
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'technical'
                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                    : 'text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-800'
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
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">1</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Understanding Needs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We identify what your product needs to do, how users will interact with it, and any special requirements for performance or battery life.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">2</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Software Architecture</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We design the software structure to be reliable, secure, and efficient - building from the ground up with your specific hardware in mind.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">3</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Development & Testing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We write clean, efficient code and test it thoroughly in simulated and real-world conditions to catch any issues before your customers do.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
                <div className="w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">4</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Optimization & Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We fine-tune performance, battery life, and security, then provide ongoing support for updates and improvements as your needs evolve.
                </p>
              </div>
            </div>
          )}
          
          {/* Technical Tab Content */}
          {activeTab === 'technical' && (
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-emerald-100 dark:border-emerald-900">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Technical Process</h3>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Requirements Analysis & Architecture</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We analyze hardware specifications, functional requirements, and operating parameters to define the optimal software architecture.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">System resource analysis</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Power profile modeling</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Real-time requirements mapping</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Decisions Made:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Bare-metal vs. RTOS, communication protocols, memory architecture, update strategy
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Development & Hardware Abstraction</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We implement modular firmware with clean hardware abstraction layers to ensure maintainability and portability.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Driver implementation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Middleware development</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Application logic implementation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Languages & Tools:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      C/C++, Arm CMSIS, FreeRTOS, Zephyr, ThreadX, Custom framework libraries
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Optimization & Security</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We optimize for performance, power consumption, and security with targeted code improvements and hardening.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Power profiling and optimization</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Secure boot implementation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Cryptographic library integration</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Tools:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Memory analyzers, power analyzers, static code analysis tools, security scanners
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Testing & Validation</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We implement comprehensive testing across multiple levels to ensure reliability and robustness.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Unit and integration testing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Hardware-in-the-loop testing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Environmental stress testing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Testing Stack:</h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Automated test frameworks, hardware simulators, continuous integration pipelines
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">The Impact of Quality Software</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Clock className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Battery Life</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Before Optimization</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">2-3 weeks</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">After Optimization</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">3-4 months</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-900/30">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-500">Result:</span> 5x longer battery life, reducing maintenance costs and improving user satisfaction.
                </p>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <BarChart className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reliability</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Before Optimization</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Several failures per month</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">After Optimization</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">99.97% uptime</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-900/30">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-500">Result:</span> Virtually eliminated downtime, reducing support calls by 75% and dramatically improving user trust.
                </p>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <RefreshCw className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Responsiveness</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Before Optimization</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">500-1000ms response time</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">After Optimization</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Under 50ms response time</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-900/30">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-500">Result:</span> 20x faster response makes the product feel premium and significantly improves user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Hardware We Support</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: 'ARM Cortex-M', logo: '/images/services/logos/arm.png' },
              { name: 'STM32', logo: '/images/services/logos/STMicroelectronics.png' },
              { name: 'ESP32', logo: '/images/services/logos/John-Lee.svg' },
              { name: 'PIC', logo: '/images/services/logos/Microchip.png' },
              { name: 'AVR', logo: '/images/services/logos/Microchip.png' },
              { name: 'nRF', logo: '/images/services/logos/Nordic-Semiconductor.png' },
              { name: 'TI MSP430', logo: '/images/services/logos/Texas-Instruments.png' },
              { name: 'Renesas', logo: '/images/services/logos/Renesas-Electronics.svg' },
              { name: 'RISC-V', logo: '/images/services/logos/RISC-V-International.svg' },
              { name: 'NXP', logo: '/images/services/logos/Nordic-Semiconductor.png' },
              { name: 'Microchip', logo: '/images/services/logos/Microchip.png' },
              { name: 'Cypress', logo: '/images/services/logos/Infineon.svg' }
            ].map((platform) => (
              <div key={platform.name} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900 flex flex-col items-center justify-center">
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="h-12 mb-2 dark:filter dark:brightness-90 dark:invert"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 text-center">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ParcelPoint Smart Locker Software</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We developed the intelligent software that powers ParcelPoint's secure locker system, ensuring reliable operation
                  and seamless integration with payment systems and cloud services.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Created software with 99.7% uptime reliability',
                    'Implemented secure access control systems',
                    'Integrated real-time payment processing',
                    'Built remote monitoring and management',
                    'Enabled secure over-the-air updates',
                    'Added automatic fault detection and recovery'
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
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">How long does software development take?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Development timelines depend on complexity, with simple projects taking 2-3 weeks and more complex systems requiring 4-8 weeks. 
                We can often provide accelerated timelines for critical projects.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Can you improve existing software?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we specialize in optimizing existing software to improve performance, reliability, and battery life. 
                We can work with your existing codebase to address specific issues or implement new features.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">What about over-the-air updates?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We can implement secure update systems that allow you to fix bugs and add features remotely without requiring physical access to devices. 
                Our update systems include failsafe mechanisms to prevent bricking during updates.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">What about ongoing support?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer flexible support packages tailored to your needs, from basic bug fixes to comprehensive maintenance and feature development. 
                Many clients choose our annual support plans that include regular updates and priority response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Start Your Software Project</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Ready to bring intelligence to your product? Let's discuss how our software development
            expertise can help you create reliable, efficient, and secure solutions.
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

export default IntelligentSoftwarePage;