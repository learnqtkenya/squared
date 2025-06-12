'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Settings,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Monitor,
  Code,
  Layers,
  Zap,
  Rocket,
  Target,
  Briefcase,
  Home,
  Factory,
  Truck,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { ValuePropositions } from '@/components/ValuePropositions';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const TechnicalGlossary = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-12 max-w-3xl mx-auto">
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
              <dd>The screen or display that allows people to interact with machines, like touchscreens on devices.</dd>
            </div>
            <div>
              <dt className="font-medium">Firmware</dt>
              <dd>The permanent software programmed into a device that controls how it functions.</dd>
            </div>
            <div>
              <dt className="font-medium">Embedded Systems</dt>
              <dd>Computer systems built into larger products to perform specific functions.</dd>
            </div>
            <div>
              <dt className="font-medium">PCB (Printed Circuit Board)</dt>
              <dd>The physical board that connects electronic components together in a device.</dd>
            </div>
            <div>
              <dt className="font-medium">IoT (Internet of Things)</dt>
              <dd>Connected devices that can communicate and share data over networks.</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

const valueProps = [
  {
    icon: <Zap className="h-8 w-8 text-emerald-600" />,
    title: "Fast Response",
    description: "Quick support and flexible engagement models to keep your project moving forward without delays."
  },
  {
    icon: <Rocket className="h-8 w-8 text-emerald-600" />,
    title: "Rapid Development",
    description: "Get from concept to working product faster with our streamlined development process."
  },
  {
    icon: <Layers className="h-8 w-8 text-emerald-600" />,
    title: "Complete Expertise",
    description: "One team for all your needs - from hardware design to software development to final product."
  },
  {
    icon: <Target className="h-8 w-8 text-emerald-600" />,
    title: "Market-Ready Solutions",
    description: "We deliver complete, tested products ready for manufacturing and market launch."
  }
];

const SquaredComputingWebsite = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Navigation onScrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Custom Embedded Engineering That Brings Products to Life
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We bring your product ideas to life - from concept to market-ready smart devices that solve real business challenges.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => scrollToSection('expertise')}
                  className="border-2 border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500 px-6 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  Our Expertise
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-900">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our End-to-End Solutions</h3>
                <div className="space-y-4">
                  {[
                    'User-Friendly Touchscreen Interfaces',
                    'Custom Hardware Design and Manufacturing',
                    'Custom Control Solutions',
                    'Smart Device Development', 
                    'Intelligent Software',
                    'Connectivity Solutions'
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

      {/* What We Do Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What We Do</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            We create the "brains" for smart products and devices. Whether you need a touchscreen interface, 
            intelligent hardware, or a complete smart product solution, we handle all the complex 
            technology so you can focus on your business.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                <Monitor className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Interfaces</h3>
              <p className="text-gray-600 dark:text-gray-300">Touchscreens and displays that make complex devices simple to use</p>
            </div>
            
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                <Cpu className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Intelligent Hardware</h3>
              <p className="text-gray-600 dark:text-gray-300">Custom electronic systems that bring your products to life</p>
            </div>
            
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                <Layers className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">End-to-end product development from idea to market-ready device</p>
            </div>
          </div>
          
          <TechnicalGlossary />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Our Services</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* User-Friendly Interfaces */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Monitor className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User-Friendly Interfaces</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Intuitive touchscreens and displays that make your products easy to use while showcasing your brand's quality.
              </p>
              <Link href="/services/hmi-development">
                <button className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Intelligent Software */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Intelligent Software</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Reliable, efficient programming that gives your hardware the intelligence to perform exactly as needed.
              </p>
              <Link href="/services/embedded-firmware">
                <button className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Complete Product Development */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Layers className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Complete Product Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                End-to-end solutions from concept to manufacturing, turning your product vision into reality.
              </p>
              <Link href="/services/embedded-systems-design">
                <button className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values Section */}
      <section id="expertise" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Why Choose Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            We deliver reliable, high-quality solutions that solve your business challenges and get your products to market faster.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="group bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-900 p-6 rounded-xl border border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    {React.cloneElement(prop.icon as React.ReactElement, { 
                      className: "h-8 w-8 text-emerald-600 dark:text-emerald-500" 
                    })}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">{prop.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{prop.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-emerald-50 dark:bg-gray-800 p-8 rounded-xl border border-emerald-200 dark:border-emerald-900">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Technical Foundation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cpu className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Senior Embedded Systems Engineering</h4>
                    <p className="text-gray-600 dark:text-gray-300">10+ years of experience in smart device development</p>
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
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mechatronics Engineering</h4>
                    <p className="text-gray-600 dark:text-gray-300">Specialized in mechanical-electronic integration</p>
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
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Industries Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Industries We Serve</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Our solutions power innovation across multiple industries
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Briefcase className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Business & Retail</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Smart kiosks, inventory systems, and customer service solutions</p>
            </div>
            
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Home className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Consumer Products</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Smart home devices, wearables, and everyday electronics</p>
            </div>
            
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Factory className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Industrial</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Manufacturing equipment, monitoring systems, and control interfaces</p>
            </div>
            
            <div>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Truck className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Logistics</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Tracking solutions, automated systems, and supply chain optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="portfolio" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Case Study</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            See how our solutions make a real business impact
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-emerald-200 dark:border-emerald-900">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                  Success Story
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ParcelPoint Smart Locker System</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We developed an automated parcel management solution that has significantly reduced deliveries and improved customer satisfaction.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Custom hardware design and manufacturing',
                    'Secure, reliable control system',
                    'Intuitive touchscreen interface',
                    'Mobile and desktop app integration',
                    'Cloud-based management system',
                    'M-PESA payment integration'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/case-studies/parcelpoint">
                  <button className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors">
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

      {/* How We Work Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">How We Work</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Our simple, effective process takes your idea from concept to reality
          </p>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-200 dark:bg-emerald-900/50 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12">
              <div className="md:grid md:grid-cols-2 gap-8 items-center">
                <div className="text-right md:pr-12">
                  <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                    Step 1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understand Your Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We start by listening to your business goals, understanding your users, and defining clear success criteria.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 md:pl-12 relative">
                  <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Business requirements</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">User needs analysis</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Project scope definition</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-last text-left md:pl-12">
                  <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                    Step 2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create the Solution</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our engineers design, build, and test your solution, keeping you involved throughout the process.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 md:pr-12 relative">
                  <div className="hidden md:block absolute right-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Design and prototyping</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Development and testing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Regular progress updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 gap-8 items-center">
                <div className="text-right md:pr-12">
                  <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                    Step 3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Deliver and Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We ensure a smooth launch and provide ongoing support to help your solution grow with your business.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 md:pl-12 relative">
                  <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Deployment and integration</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">User training and documentation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Ongoing maintenance and updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Start Your Project</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Ready to bring your product idea to life? Let's discuss how we can help turn your vision into reality.
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

export default SquaredComputingWebsite;