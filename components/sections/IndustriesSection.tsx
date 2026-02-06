'use client';

import { Briefcase, Home, Factory, Truck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Industry {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
  examples: string[];
}

export const IndustriesSection = () => {
  const industries: Industry[] = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Business & Retail',
      description: 'Smart kiosks, inventory systems, and customer service solutions',
      gradient: 'from-blue-500 to-cyan-500',
      examples: ['Smart kiosks', 'POS systems', 'Inventory tracking', 'Digital signage']
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: 'Consumer Products',
      description: 'Smart home devices, wearables, and everyday electronics',
      gradient: 'from-purple-500 to-pink-500',
      examples: ['IoT devices', 'Wearables', 'Smart appliances', 'Home automation']
    },
    {
      icon: <Factory className="h-8 w-8" />,
      title: 'Industrial',
      description: 'Manufacturing equipment, monitoring systems, and control interfaces',
      gradient: 'from-orange-500 to-red-500',
      examples: ['Control panels', 'SCADA systems', 'PLCs', 'Industrial IoT']
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Logistics',
      description: 'Tracking solutions, automated systems, and supply chain optimization',
      gradient: 'from-green-500 to-emerald-500',
      examples: ['Asset tracking', 'Fleet management', 'Warehouse automation', 'Delivery systems']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 9 }}
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2.5 rounded-full mb-6 border border-secondary/20"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Industries We Serve</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            Powering Innovation
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Across Industries
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our solutions power innovation across multiple industries
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${industry.gradient}`} />
                
                {/* Icon */}
                <div className="mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${industry.gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto`}
                  >
                    <div className="text-white">
                      {industry.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-center mb-3 text-foreground group-hover:text-primary transition-colors">
                  {industry.title}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                  {industry.description}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  {industry.examples.map((example, exampleIdx) => (
                    <motion.div
                      key={exampleIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: exampleIdx * 0.1 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${industry.gradient}`} />
                      <span>{example}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat/message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">Currently serving 15+ clients</span> across these industries
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};