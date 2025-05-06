'use client';

import React from 'react';
import {
  Code,
  Cpu,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const EmbeddedFirmwarePage = () => {
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
                Embedded Firmware
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Expertise in bare-metal programming, RTOS, and power-efficient firmware design.
              </p>
              <div className="flex space-x-4">
                <Link href="#contact">
                  <button className="bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm">
                    Start Your Project
                  </button>
                </Link>
                <Link href="#expertise">
                  <button className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 px-6 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                    Our Expertise
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-900">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Firmware Development Specializations</h3>
                <div className="space-y-4">
                  {[
                    'Bare-metal firmware development',
                    'RTOS-based applications',
                    'Power-efficient design',
                    'Secure bootloaders',
                    'OTA firmware updates',
                    'Embedded communications protocols'
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

      {/* Overview Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Robust and Efficient Firmware Solutions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our embedded firmware development services deliver reliable, efficient, and maintainable code that serves as the foundation of your embedded system. We create firmware that optimizes hardware performance while meeting strict requirements for power consumption, reliability, and security.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Whether your project requires bare-metal programming for maximum performance or an RTOS for complex multitasking, our team provides tailored firmware solutions that align with your specific hardware constraints and functional requirements.
              </p>
              <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our firmware development principles:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Resource optimization for constrained environments</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Robust error handling and fail-safe mechanisms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Clean, maintainable code architecture</span>
                  </li>
                </ul>
              </div>
            </div>
            <img
              src="/images/services/robust-fw.png"
              alt="Embedded Firmware Development"
              className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Our Firmware Expertise</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bare-metal Programming */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Cpu className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Bare-metal Programming</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Direct hardware access for maximum performance and control over microcontroller resources.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Optimized memory usage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Direct peripheral control</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Deterministic execution</span>
                </li>
              </ul>
            </div>
            
            {/* RTOS-based Applications */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">RTOS-based Applications</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Multitasking firmware solutions for complex systems requiring concurrent operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">RTOS implementation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Task prioritization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Resource management</span>
                </li>
              </ul>
            </div>
            
            {/* Power-Efficient Design */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Power-Efficient Design</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Battery-friendly firmware optimized for extended operation in power-constrained environments.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Sleep mode optimization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Duty cycle management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Peripheral power control</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Secure Bootloaders */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secure Bootloaders & OTA Updates</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Secure firmware update mechanisms to ensure system integrity and enable remote updates.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Cryptographic signature verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Failsafe recovery mechanisms</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Multi-stage update process</span>
                </li>
              </ul>
            </div>
            
            {/* Communication Protocols */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-100 dark:border-emerald-900">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Communication Protocols</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Implementation of standard and custom communication protocols for embedded systems.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">I2C, SPI, UART, CAN, USB implementations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">RS485, ModBus, CANOpen, J1939, EtherCAT implementations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Custom protocol design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Wireless protocol stacks (BLE, LoRa, WiFi)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Microcontroller Support */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Supported Platforms</h2>
          
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
              <div key={platform.name} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900 flex flex-col items-center justify-center">
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
      <section className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Featured Firmware Project</h2>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-emerald-200 dark:border-emerald-900">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/images/parcel-point/locker/1.jpeg"
                alt="ParcelPoint Firmware"
                className="rounded-lg shadow-sm"
              />
              <div>
                <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                  Secure Firmware Implementation
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ParcelPoint Smart Locker Firmware</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We developed a secure, power-efficient firmware solution for the ParcelPoint Smart Locker system,
                  managing multiple hardware peripherals while ensuring reliable operation and remote update capability.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Efficient concurrency implementations for concurrent operations',
                    'Power management for extended battery life',
                    'Secure communication with cloud servers',
                    'OTA firmware update capability',
                    'Peripheral drivers for display, locks, etc.',
                    'Fault monitoring and recovery mechanisms'
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Start Your Firmware Project</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Ready to develop robust firmware for your embedded system? Let's discuss how our expertise
            can help achieve your project goals.
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

export default EmbeddedFirmwarePage;