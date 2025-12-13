'use client';

import Link from 'next/link';
import { Monitor, Code, Layers, ChevronRight } from 'lucide-react';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
}

export const ServicesSection = () => {
  const services: Service[] = [
    {
      icon: <Monitor className="h-7 w-7 text-white" />,
      title: 'HMI Development',
      description: 'Qt/QML touchscreen interfaces for industrial control panels, medical devices, and consumer electronics.',
      href: '/services/hmi-development'
    },
    {
      icon: <Code className="h-7 w-7 text-white" />,
      title: 'Firmware Engineering',
      description: 'Real-time embedded software on STM32, ARM Cortex, and embedded Linux platforms with proven reliability.',
      href: '/services/embedded-firmware'
    },
    {
      icon: <Layers className="h-7 w-7 text-white" />,
      title: 'Hardware Design',
      description: 'Custom PCB design, schematic capture, and manufacturing support for production-ready electronics.',
      href: '/services/embedded-systems-design'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete embedded systems development from hardware to software
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <Link href={service.href} className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:gap-3 transition-all font-medium">
                <span>Learn More</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
