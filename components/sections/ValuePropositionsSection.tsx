'use client';

import { Zap, Rocket, Layers, Target, CheckCircle, Cpu, Settings, Award } from 'lucide-react';
import React from 'react';
import { AnimatedSection, AnimatedCard } from '../ui';
import { motion } from 'framer-motion';

interface ValueProp {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
}

export const ValuePropositionsSection = () => {
  const valueProps: ValueProp[] = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Response",
      description: "Quick support and flexible engagement models to keep your project moving forward without delays.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Rapid Development",
      description: "Get from concept to working product faster with our streamlined development process.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Complete Expertise",
      description: "One team for all your needs - from hardware design to software development to final product.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Market-Ready Solutions",
      description: "We deliver complete, tested products ready for manufacturing and market launch.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section id="expertise" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Animated elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full mb-6 border border-primary/20"
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            Our Value Proposition
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We deliver reliable, high-quality solutions that solve your business challenges and get your products to market faster.
          </p>
        </AnimatedSection>

        {/* Value Props Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${prop.gradient}`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${prop.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {React.cloneElement(prop.icon as React.ReactElement, {
                      className: "h-8 w-8 text-white"
                    })}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {prop.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {prop.description}
                </p>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Foundation Section */}
        <AnimatedSection delay={0.4}>
          <div className="relative">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl blur-xl" />
            
            {/* Content */}
            <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                  Our Technical Foundation
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Built on years of experience and deep technical expertise
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Embedded Systems */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <Cpu className="h-7 w-7 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">Senior Embedded Systems Engineering</h4>
                      <p className="text-sm text-muted-foreground">5+ years of experience in smart device development</p>
                    </div>
                  </div>
                  
                  <div className="pl-[4.5rem] space-y-3">
                    {[
                      'Real-time systems development',
                      'Hardware architecture design',
                      'Performance optimization',
                      'Low-level programming'
                    ].map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Mechatronics */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <Settings className="h-7 w-7 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">Mechatronics Engineering</h4>
                      <p className="text-sm text-muted-foreground">Specialized in mechanical-electronic integration</p>
                    </div>
                  </div>
                  
                  <div className="pl-[4.5rem] space-y-3">
                    {[
                      'CAD/CAM design expertise',
                      'Prototype development',
                      'Control systems',
                      'Industrial automation'
                    ].map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};