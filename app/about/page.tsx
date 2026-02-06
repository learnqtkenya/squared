'use client';

import React from 'react';
import { Footer } from '@/components/layout';
import { AnimatedSection, AnimatedCard } from '@/components/ui';
import { Users, Target, Lightbulb, Award, Code, Cpu, Zap, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Excellence in Engineering',
      description: 'We deliver high-quality, production-ready solutions that meet the highest industry standards.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex problems.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Client Partnership',
      description: 'We work closely with our clients as partners, ensuring their vision becomes reality.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Reliability & Trust',
      description: 'We build long-term relationships based on trust, transparency, and consistent delivery.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const expertise = [
    {
      icon: <Code className="h-12 w-12" />,
      title: 'Firmware Development',
      description: 'Expert firmware engineering for microcontrollers and embedded systems using C/C++, Rust, and modern RTOS platforms.',
      skills: ['Bare-metal programming', 'RTOS development', 'Device drivers', 'Bootloaders'],
      color: 'blue'
    },
    {
      icon: <Cpu className="h-12 w-12" />,
      title: 'Hardware Design',
      description: 'Complete hardware design services from concept to production, including PCB design and component selection.',
      skills: ['PCB design & layout', 'Circuit design', 'Power systems', 'Manufacturing support'],
      color: 'purple'
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'HMI Development',
      description: 'Beautiful, responsive user interfaces for embedded devices using modern frameworks and technologies.',
      skills: ['Qt/QML', 'LVGL', 'TouchGFX', 'Web-based UIs'],
      color: 'amber'
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: 'IoT Solutions',
      description: 'End-to-end IoT solutions with cloud connectivity, data analytics, and remote device management.',
      skills: ['Cloud integration', 'MQTT/CoAP', 'Edge computing', 'Device security'],
      color: 'green'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Delivered', suffix: '' },
    { number: '15+', label: 'Global Clients', suffix: '' },
    { number: '100', label: 'Success Rate', suffix: '%' },
    { number: '24/7', label: 'Support Available', suffix: '' }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">About Squared Computing</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
                Complete Product Solutions
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  from Concept to Market
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We design, build, and deliver complete embedded products—from custom hardware 
                and firmware to beautiful user interfaces and cloud integration.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Grid */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-primary/20 text-center hover:border-primary/40 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Story Section - Redesigned */}
          <AnimatedSection delay={0.3}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl blur-xl" />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Story</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                      Squared Computing was founded with a clear mission: to deliver complete embedded 
                      product solutions from initial concept through to manufacturing. Based in Kenya, 
                      we serve clients globally, bringing world-class end-to-end product development 
                      expertise to the rapidly growing embedded systems industry.
                    </p>
                    <p>
                      We don't just write firmware or design circuits—we build complete products. 
                      Our team handles the entire product development chain: custom PCB design and layout, 
                      firmware development, beautiful user interfaces, enclosure design, manufacturing 
                      coordination, and even cloud backend integration when needed.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      What sets us apart is our holistic approach to product development. Whether it's 
                      a smart IoT device, industrial controller, or consumer electronics product, we take 
                      ownership of the entire journey—delivering production-ready solutions that are 
                      manufacturable, testable, and ready for market.
                    </p>
                    
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/30">
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Our Mission
                      </p>
                      <p className="text-muted-foreground">
                        Empowering innovators worldwide with world-class embedded systems expertise, 
                        turning ambitious ideas into market-ready products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section - Redesigned */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 border border-primary/20"
            >
              <Award className="h-4 w-4" />
              <span className="text-sm font-semibold">What Drives Us</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 h-full hover:border-primary/40 transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6`}>
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Redesigned */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 border border-primary/20"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-semibold">What We Do Best</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive embedded systems development capabilities
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((area, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 h-full hover:border-primary/40 transition-all duration-300 overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-${area.color}-500/10 to-transparent rounded-bl-full`} />
                    
                    <div className={`text-${area.color}-500 mb-6 relative z-10`}>
                      {area.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                      {area.description}
                    </p>
                    <div className="space-y-3 relative z-10">
                      {area.skills.map((skill, skillIdx) => (
                        <motion.div
                          key={skillIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: skillIdx * 0.1 }}
                          className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          <div className={`w-2 h-2 bg-${area.color}-500 rounded-full`}></div>
                          <span className="font-medium">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/30"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Let's Work Together</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Let's discuss your project and how we can help bring your embedded systems vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-primary px-8 py-4 rounded-xl hover:bg-white/95 transition-all duration-300 shadow-2xl font-semibold text-lg flex items-center gap-2"
                >
                  Get in Touch
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/case-studies/parcelpoint">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-2xl font-semibold text-lg border border-white/30 flex items-center gap-2"
                >
                  View Our Work
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;