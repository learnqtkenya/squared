'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import { ImageCarousel } from '../ui';
import { AnimatedSection } from '../ui';
import { motion } from 'framer-motion';

interface Feature {
  text: string;
}

interface CaseStudySectionProps {
  title: string;
  description: string;
  features: Feature[];
  images: string[];
  linkUrl: string;
}

export const CaseStudySection = ({
  title = 'ParcelPoint Smart Locker System',
  description = 'We developed an automated parcel management solution that has significantly reduced delivery times and improved customer satisfaction.',
  features = [
    { text: 'Custom hardware design and manufacturing' },
    { text: 'Secure, reliable control system' },
    { text: 'Intuitive touchscreen interface' },
    { text: 'Mobile and desktop app integration' },
    { text: 'Cloud-based management system' },
    { text: 'M-PESA payment integration' }
  ],
  images = [
    '/images/parcel-point/locker/1.jpeg',
    '/images/parcel-point/locker/2.jpeg',
    '/images/parcel-point/locker/3.jpeg'
  ],
  linkUrl = '/case-studies/parcelpoint'
}: Partial<CaseStudySectionProps>) => {
  const stats = [
    { icon: <TrendingUp className="h-5 w-5" />, value: '40%', label: 'Faster Delivery' },
    { icon: <Users className="h-5 w-5" />, value: '95%', label: 'User Satisfaction' },
    { icon: <Star className="h-5 w-5" />, value: '24/7', label: 'Availability' }
  ];

  return (
    <section id="portfolio" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"
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
            <Star className="h-4 w-4" />
            <span className="text-sm font-semibold">Featured Case Study</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-heading">
            Success Stories
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how our solutions make a real business impact
          </p>
        </AnimatedSection>

        {/* Main Case Study Card */}
        <AnimatedSection delay={0.2}>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-2xl" />
            
            {/* Card */}
            <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left side - Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Success Story</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading"
                  >
                    {title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground mb-8 leading-relaxed"
                  >
                    {description}
                  </motion.p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border/50">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-xl mb-2">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="grid md:grid-cols-2 gap-3 mb-8">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="flex items-start gap-3 group"
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link href={linkUrl}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      >
                        <span className="relative z-10">View Full Case Study</span>
                        <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                {/* Right side - Image Carousel */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative lg:min-h-[600px] bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex items-center justify-center"
                >
                  {/* Decorative gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                  
                  {/* Carousel */}
                  <div className="relative z-10 w-full">
                    <ImageCarousel images={images} className="rounded-2xl shadow-2xl" />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="absolute top-8 right-8 bg-white/90 dark:bg-card/90 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-foreground">Live in Production</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Want to see more of our work?
          </p>
          <Link href="/case-studies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};