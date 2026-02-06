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
      icon: <Briefcase className="h-8 w-8 text-primary dark:text-emerald-500" />,
      title: 'Business & Retail',
      description: 'Smart kiosks, inventory systems, and customer service solutions'
    },
    {
      icon: <Home className="h-8 w-8 text-primary dark:text-emerald-500" />,
      title: 'Consumer Products',
      description: 'Smart home devices, wearables, and everyday electronics'
    },
    {
      icon: <Factory className="h-8 w-8 text-primary dark:text-emerald-500" />,
      title: 'Industrial',
      description: 'Manufacturing equipment, monitoring systems, and control interfaces'
    },
    {
      icon: <Truck className="h-8 w-8 text-primary dark:text-emerald-500" />,
      title: 'Logistics',
      description: 'Tracking solutions, automated systems, and supply chain optimization'
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Industries We Serve</h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Our solutions power innovation across multiple industries
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {industries.map((industry, idx) => (
            <div key={idx}>
              <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                {industry.icon}
              </div>
              <h3 className="font-bold text-foreground mb-2">{industry.title}</h3>
              <p className="text-muted-foreground text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
