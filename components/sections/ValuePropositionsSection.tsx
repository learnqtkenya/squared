'use client';

import { Zap, Rocket, Layers, Target, CheckCircle, Cpu, Settings } from 'lucide-react';
import React from 'react';

interface ValueProp {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const ValuePropositionsSection = () => {
  const valueProps: ValueProp[] = [
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

  return (
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
  );
};
