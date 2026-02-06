'use client';

import Link from 'next/link';
import { Monitor, Code, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSection, AnimatedCard } from '../ui';
import { motion } from 'framer-motion';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
  gradient: string;
  features: string[];
}

export const ServicesSection = () => {
  const services: Service[] = [
    {
      icon: <Monitor className="h-8 w-8 text-white" />,
      title: 'HMI Development',
      description: 'Beautiful, intuitive touchscreen interfaces for industrial control panels, medical devices, and consumer electronics.',
      href: '/services/hmi-development',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Qt/QML', 'LVGL', 'TouchGFX', 'Web UIs']
    },
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: 'Firmware Engineering',
      description: 'Real-time embedded software on STM32, ARM Cortex, and embedded Linux platforms with proven reliability.',
      href: '/services/embedded-firmware',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['RTOS', 'Bare-metal', 'Linux', 'Device drivers']
    },
    {
      icon: <Layers className="h-8 w-8 text-white" />,
      title: 'Hardware Design',
      description: 'Custom PCB design, schematic capture, and manufacturing support for production-ready electronics.',
      href: '/services/embedded-systems-design',
      gradient: 'from-green-500 to-emerald-500',
      features: ['PCB Design', 'Schematics', 'BOM', 'Manufacturing']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section id="services" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Animated blobs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2.5 rounded-full mb-6 border border-secondary/20"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">What We Offer</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Complete embedded systems development from hardware to software
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link href={service.href}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6 inline-block"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        {service.icon}
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, featureIdx) => (
                        <motion.span
                          key={featureIdx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: featureIdx * 0.1 }}
                          className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Need a custom solution?
          </p>
          <Link href="/#contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Let's Talk About Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};