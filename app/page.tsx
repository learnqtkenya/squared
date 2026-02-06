'use client';

import React from 'react';
import { ContactForm } from '@/components/forms';
import { Footer, Navigation } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ValuePropositionsSection } from '@/components/sections/ValuePropositionsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { CaseStudySection } from '@/components/sections/CaseStudySection';
import { CheckCircle } from 'lucide-react';

const HowWeWorkSection = () => {
  const steps = [
    {
      number: "Step 1",
      title: "Understand Your Vision",
      description: "We start by listening to your business goals, understanding your users, and defining clear success criteria.",
      items: [
        "Business requirements",
        "User needs analysis",
        "Project scope definition"
      ]
    },
    {
      number: "Step 2",
      title: "Create the Solution",
      description: "Our engineers design, build, and test your solution, keeping you involved throughout the process.",
      items: [
        "Design and prototyping",
        "Development and testing",
        "Regular progress updates"
      ]
    },
    {
      number: "Step 3",
      title: "Deliver and Support",
      description: "We ensure a smooth launch and provide ongoing support to help your solution grow with your business.",
      items: [
        "Deployment and integration",
        "User training and documentation",
        "Ongoing maintenance and updates"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-foreground">How We Work</h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Our simple, effective process takes your idea from concept to reality
        </p>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-200 dark:bg-emerald-900/50 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="md:grid md:grid-cols-2 gap-8 items-center">
                <div className={`text-right md:pr-12 ${index % 2 === 1 ? 'md:order-last text-left md:pl-12 md:pr-0' : ''}`}>
                  <div className="mb-4 inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <div className={`mt-6 md:mt-0 ${index % 2 === 1 ? 'md:pr-12' : 'md:pl-12'} relative`}>
                  <div className={`hidden md:block absolute ${index % 2 === 0 ? 'left-0' : 'right-0'} top-1/2 w-4 h-4 bg-primary dark:bg-emerald-500 rounded-full transform ${index % 2 === 0 ? '-translate-x-1/2' : 'translate-x-1/2'} -translate-y-1/2 z-10`}></div>
                  <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg border border-primary/20200 dark:border-primary/20900">
                    <ul className="space-y-2">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary dark:text-emerald-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Start Your Project</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Ready to bring your product idea to life? Let's discuss how we can help turn your vision into reality.
        </p>
        <ContactForm />
      </div>
    </section>
  );
};

const SquaredComputingWebsite = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <HeroSection onScrollToSection={scrollToSection} />
      <TechStackSection />
      <ServicesSection />
      <ValuePropositionsSection />
      <IndustriesSection />
      <CaseStudySection />
      <HowWeWorkSection />
      <ContactSection />
    </div>
  );
};

export default SquaredComputingWebsite;
