'use client';

import { motion } from 'framer-motion';
import { Cpu, Layers, Zap, Radio, Monitor, CircuitBoard, Binary, Code } from 'lucide-react';

interface Technology {
  name: string;
  category: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

export const TechStackSection = () => {
  const technologies: Technology[] = [
    { 
      name: 'Qt/QML | LVGL | TouchGFX', 
      category: 'HMI Framework',
      icon: <Monitor className="h-6 w-6" />,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Beautiful, responsive interfaces'
    },
    { 
      name: 'KiCad | Cadence | Altium', 
      category: 'PCB Design',
      icon: <CircuitBoard className="h-6 w-6" />,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Professional circuit design'
    },
    { 
      name: 'Zephyr | MbedOS | FreeRTOS', 
      category: 'RTOS',
      icon: <Layers className="h-6 w-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Real-time operating systems'
    },
    { 
      name: 'CAN | SPI | I2C | RS485', 
      category: 'Protocols',
      icon: <Radio className="h-6 w-6" />,
      gradient: 'from-orange-500 to-red-500',
      description: 'Industrial communication'
    },
    { 
      name: 'Embedded Linux', 
      category: 'Operating System',
      icon: <Binary className="h-6 w-6" />,
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Powerful embedded OS'
    },
    { 
      name: 'STM32 | Atmel | NXP', 
      category: 'Microcontrollers',
      icon: <Cpu className="h-6 w-6" />,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Wide MCU expertise'
    },
    { 
      name: 'ARM Cortex | RISC-V', 
      category: 'Architecture',
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Modern architectures'
    },
    { 
      name: 'C/C++ | Rust | Python', 
      category: 'Languages',
      icon: <Code className="h-6 w-6" />,
      gradient: 'from-pink-500 to-rose-500',
      description: 'Multiple language support'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 7.5 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full mb-6 border border-primary/20"
          >
            <Cpu className="h-4 w-4" />
            <span className="text-sm font-semibold">Our Technology Arsenal</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            Technology Stack
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Modern tools and proven technologies for reliable, scalable embedded systems
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full bg-card/80 backdrop-blur-sm rounded-3xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.gradient}`} />
                
                {/* Icon with gradient background */}
                <div className="mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${tech.gradient} shadow-lg`}
                  >
                    <div className="text-white">
                      {tech.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Category badge */}
                <div className="mb-3">
                  <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    {tech.category}
                  </span>
                </div>

                {/* Technology name */}
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight min-h-[3rem]">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>

                {/* Decorative corner element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4 hover:border-primary/40 transition-colors">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">Always evolving</span> — We continuously adopt cutting-edge technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};