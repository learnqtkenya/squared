'use client';

import { Monitor, Cpu, Layers } from 'lucide-react';

interface FeatureCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  const features: FeatureCard[] = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: 'HMI Development',
      description: 'Qt/QML touchscreen interfaces for industrial and consumer applications'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Firmware Engineering',
      description: 'Real-time embedded systems on ARM Cortex, STM32, and embedded Linux'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Hardware Design',
      description: 'Custom PCB design, prototyping, and manufacturing coordination'
    }
  ];

  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950/20"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Embedded Systems Engineering
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
            Build Smart Products<br />
            <span className="text-emerald-600 dark:text-emerald-500">That Work</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            From concept to production-ready devices. Hardware design, firmware development, and complete system integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onScrollToSection('contact')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              Start Your Project
            </button>
            <button
              onClick={() => onScrollToSection('portfolio')}
              className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-500 transition-all duration-300 font-medium text-lg"
            >
              View Case Studies
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
