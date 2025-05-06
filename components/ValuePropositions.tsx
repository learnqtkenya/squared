import { Zap, Rocket, Layers, Target } from 'lucide-react';
import React from 'react';

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueProp) => (
  <div className="group bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-900 p-6 rounded-xl border border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
      <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
        {React.cloneElement(icon as React.ReactElement, { 
          className: "h-8 w-8 text-emerald-600 dark:text-emerald-500" 
        })}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
  </div>
);

const valueProps: ValueProp[] = [
  {
    icon: <Zap className="h-8 w-8 text-emerald-600" />,
    title: "Immediate Support",
    description: "Quick response times and flexible engagement models to keep your project moving forward without delays."
  },
  {
    icon: <Rocket className="h-8 w-8 text-emerald-600" />,
    title: "Rapid Prototyping",
    description: "Fast iteration cycles with in-house capabilities for hardware, firmware, and mechanical prototyping."
  },
  {
    icon: <Layers className="h-8 w-8 text-emerald-600" />,
    title: "Full-Stack Expertise",
    description: "Comprehensive in-house capabilities from PCB design to cloud integration, ensuring seamless development."
  },
  {
    icon: <Target className="h-8 w-8 text-emerald-600" />,
    title: "End-to-End Solutions",
    description: "Complete project ownership from concept to production, delivering market-ready solutions."
  }
];

const ValuePropositions = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {valueProps.map((prop, index) => (
      <ValueCard key={index} {...prop} />
    ))}
  </div>
);

export { ValuePropositions, ValueCard, type ValueProp };