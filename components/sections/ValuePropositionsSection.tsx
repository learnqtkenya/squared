'use client';

import { Zap, Rocket, Layers, Target, CheckCircle, Cpu, Settings } from 'lucide-react';
import React from 'react';
import { AnimatedSection, AnimatedCard } from '../AnimatedSection';
import { motion } from 'framer-motion';

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
    <section id="expertise" className="py-20 px-4 bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We deliver reliable, high-quality solutions that solve your business challenges and get your products to market faster.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="group relative h-full bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-800 dark:to-emerald-950/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-400/5 group-hover:via-emerald-500/5 group-hover:to-emerald-600/10 transition-all duration-700"></div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
                      {React.cloneElement(prop.icon as React.ReactElement, {
                        className: "h-8 w-8 text-white"
                      })}
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="mt-16 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 md:p-10 rounded-2xl border border-emerald-200 dark:border-emerald-900 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Technical Foundation</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                  >
                    <Cpu className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Senior Embedded Systems Engineering</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">10+ years of experience in smart device development</p>
                  </div>
                </div>
                <div className="pl-16">
                  <ul className="space-y-2">
                    {[
                      'Real-time systems development',
                      'Hardware architecture design',
                      'Performance optimization',
                      'Low-level programming'
                    ].map((skill, idx) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-center gap-2 group"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                  >
                    <Settings className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mechatronics Engineering</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Specialized in mechanical-electronic integration</p>
                  </div>
                </div>
                <div className="pl-16">
                  <ul className="space-y-2">
                    {[
                      'CAD/CAM design expertise',
                      'Prototype development',
                      'Control systems',
                      'Industrial automation'
                    ].map((skill, idx) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-center gap-2 group"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
