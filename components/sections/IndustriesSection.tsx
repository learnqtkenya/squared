'use client';

import { Briefcase, Home, Factory, Truck } from 'lucide-react';

interface Industry {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const IndustriesSection = () => {
  const industries: Industry[] = [
    {
      icon: <Briefcase className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />,
      title: 'Business & Retail',
      description: 'Smart kiosks, inventory systems, and customer service solutions'
    },
    {
      icon: <Home className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />,
      title: 'Consumer Products',
      description: 'Smart home devices, wearables, and everyday electronics'
    },
    {
      icon: <Factory className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />,
      title: 'Industrial',
      description: 'Manufacturing equipment, monitoring systems, and control interfaces'
    },
    {
      icon: <Truck className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />,
      title: 'Logistics',
      description: 'Tracking solutions, automated systems, and supply chain optimization'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Industries We Serve</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Our solutions power innovation across multiple industries
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {industries.map((industry, idx) => (
            <div key={idx}>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                {industry.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{industry.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
