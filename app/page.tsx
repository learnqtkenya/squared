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
import { CheckCircle, Lightbulb, Code, Rocket, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HowWeWorkSection = () => {
  const steps = [
    {
      number: "01",
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Understand Your Vision",
      description: "We start by listening to your business goals, understanding your users, and defining clear success criteria.",
      items: [
        "Business requirements gathering",
        "User needs analysis",
        "Project scope definition"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      icon: <Code className="h-6 w-6" />,
      title: "Create the Solution",
      description: "Our engineers design, build, and test your solution, keeping you involved throughout the process.",
      items: [
        "Design and rapid prototyping",
        "Agile development and testing",
        "Regular progress updates"
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: <Rocket className="h-6 w-6" />,
      title: "Deliver and Support",
      description: "We ensure a smooth launch and provide ongoing support to help your solution grow with your business.",
      items: [
        "Deployment and integration",
        "User training and documentation",
        "Ongoing maintenance and updates"
      ],
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2.5 rounded-full mb-6 border border-secondary/20"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Our Process</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            How We Work
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our simple, effective process takes your idea from concept to reality
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-20 transform -translate-x-1/2 hidden lg:block" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16 lg:space-y-24"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={`${index % 2 === 1 ? 'lg:order-last lg:text-left lg:pl-16' : 'lg:text-right lg:pr-16'}`}>
                    {/* Number badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.gradient} text-white rounded-2xl font-bold text-xl mb-6 shadow-lg`}
                    >
                      {step.number}
                    </motion.div>

                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Card Side */}
                  <div className={`${index % 2 === 1 ? 'lg:pr-16' : 'lg:pl-16'} relative`}>
                    {/* Center dot (desktop) */}
                    <div className={`hidden lg:block absolute ${index % 2 === 0 ? 'left-0' : 'right-0'} top-1/2 w-6 h-6 bg-gradient-to-br ${step.gradient} rounded-full transform ${index % 2 === 0 ? '-translate-x-1/2' : 'translate-x-1/2'} -translate-y-1/2 z-10 shadow-lg border-4 border-background`} />
                    
                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl overflow-hidden"
                    >
                      {/* Top accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.gradient}`} />
                      
                      {/* Icon */}
                      <div className="mb-6">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
                          <div className="text-white">
                            {step.icon}
                          </div>
                        </div>
                      </div>

                      {/* Items list */}
                      <ul className="space-y-3">
                        {step.items.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-3 group"
                          >
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-muted-foreground">{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Corner decoration */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/30 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full mb-6 border border-primary/20"
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm font-semibold">Get In Touch</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            Start Your Project
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to bring your product idea to life? Let's discuss how we can help turn your vision into reality.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-2xl" />
          
          {/* Form card */}
          <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl">
            <ContactForm />
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            We typically respond within 24 hours. For urgent inquiries, please mention it in your message.
          </p>
        </motion.div>
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