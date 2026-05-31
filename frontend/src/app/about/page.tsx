"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden selection:bg-accent selection:text-background">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqVwaqd_zn4_jDT_7Q8A7tKCUNKO022bWEsdSDQELs27aEypWavgQAAOEC0kw3ipwzqWSbLvmjYfyKyMSc9xQiCyMSpU0hD4f9eXUY4uoUhdlqHYH8ojGkJJoAxnlgyrSaNrzxTytjlsGr0CAgu2dTo4UDir7LX-00ROoizSaLRk--AeR_fCaMUuvqgC_-Xh4MopbLrolSjuYbD6kXzwCNuGWwH1-BuA8t8xSXCgPN1YoTsep4Erxm6vuIR2DtTVBcMNddgAGsqQ" 
            alt="Luxury Interior" 
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Decorative Golden Elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 md:px-12 mt-20"
        >
          <motion.span variants={fadeUpVariant} className="font-label text-accent mb-4 block tracking-[0.3em] uppercase">
            Crafting Spaces
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
            Redefining Architectural <br className="hidden md:block" /> Excellence
          </motion.h1>
          <motion.div variants={fadeUpVariant} className="w-24 h-[1px] bg-accent mx-auto"></motion.div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl text-white">Our Story</motion.h2>
          <motion.p variants={fadeUpVariant} className="text-lg text-text-secondary font-light leading-relaxed">
            Born from a passion for structural integrity and aesthetic purity, Townwood Interior has evolved into a beacon of high-end design. We don&apos;t just furnish rooms; we curate experiences that resonate with the soul of the inhabitant, tailored specifically to your unique lifestyle.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-6 pt-4">
            <span className="text-7xl font-display text-accent">20+</span>
            <div>
              <p className="font-display text-2xl text-white">Years of</p>
              <p className="font-label tracking-widest text-text-secondary uppercase text-xs mt-1">Excellence in Design</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA77CEieG2MgZKkqcokg961zRzxu9AIKMFZAaf4C2GA0EnEHMBZiE8Foq21Qx9593Vb0BmZH0MHwnC89QhH5z36mVpiodfNOiH1DmtlIN4aTTWF6qbhYIedZY721bHtDdxGdTwB0TwloTr21NyfbwI93-5FONSd0-8Q2__wbPKwEEB7sSyPIDF0n_j4CSV5ZFADFzIENWzZgHstbagWz1fzkDP4RqYXAWWusvu3K2MHHQvMyD0bIHrZmvvGbWkPZ3Xu0CKeUu87MQ" 
            alt="Townwood Design Studio" 
            width={800}
            height={500}
            className="w-full h-[500px] object-cover border border-border shadow-2xl rounded-sm"
          />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-accent/50 pointer-events-none"></div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary-bg py-16 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <div className="text-accent font-display text-5xl mb-2">300+</div>
            <div className="font-label text-xs tracking-widest text-text-secondary uppercase">Projects Completed</div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: 0.1 }}>
            <div className="text-accent font-display text-5xl mb-2">10+</div>
            <div className="font-label text-xs tracking-widest text-text-secondary uppercase">Years Guarantee</div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: 0.2 }}>
            <div className="text-accent font-display text-5xl mb-2">60</div>
            <div className="font-label text-xs tracking-widest text-text-secondary uppercase">Days Move-In</div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: 0.3 }}>
            <div className="text-accent font-display text-5xl mb-2">100%</div>
            <div className="font-label text-xs tracking-widest text-text-secondary uppercase">Client Satisfaction</div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="glass-card p-12 border border-border hover:border-accent/50 transition-all duration-500 group"
          >
            <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
            </div>
            <h3 className="font-display text-3xl text-white mb-4">Our Mission</h3>
            <p className="text-text-secondary font-light leading-relaxed">
              To transform mundane spaces into architectural masterpieces through innovative design thinking and uncompromised craftsmanship. We strive to deliver premium modular kitchens, wardrobes, and full home interiors that are highly tailored to your vision.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: 0.2 }}
            className="glass-card p-12 border border-border hover:border-accent/50 transition-all duration-500 group"
          >
            <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3 className="font-display text-3xl text-white mb-4">Our Vision</h3>
            <p className="text-text-secondary font-light leading-relaxed">
              To set the regional standard for luxury living by harmonizing environmental sustainability with editorial-grade aesthetics, becoming the most trusted name in premium home interiors across Delhi NCR.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-12 bg-secondary-bg">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="font-display text-4xl md:text-5xl text-white mb-4">The Townwood Distinction</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-text-secondary max-w-2xl mx-auto font-light">Precision in every detail, luxury in every corner.</motion.p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Exclusivity", desc: "Bespoke solutions tailored to your unique lifestyle.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg> },
            { title: "Precision", desc: "Architectural accuracy in every measurement.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m3 21 18-18"/><path d="M21 21V3H3"/><path d="M7 17h10"/><path d="M10 14h4"/></svg> },
            { title: "Sustainability", desc: "Ethically sourced materials and green designs.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg> },
            { title: "White Glove", desc: "End-to-end management of your design journey.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 glass-card border border-border group"
            >
              <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500 text-accent">
                {item.icon}
              </div>
              <h4 className="font-label text-sm uppercase tracking-widest text-white mb-3">{item.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-16">
          <span className="font-label text-accent uppercase tracking-widest text-sm mb-4 block">Leadership</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Visionaries Behind Townwood</h2>
          <div className="golden-underline mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="group relative overflow-hidden aspect-[4/5] bg-secondary-bg border border-border rounded-sm"
          >
            <Image 
              src="/images/director1.png" 
              alt="Mr. Ravindra Sharma" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h4 className="font-display text-2xl text-white mb-1">Mr. Ravindra Sharma</h4>
              <p className="font-label text-accent tracking-widest text-xs uppercase mb-4">Founder & Director</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
            className="group relative overflow-hidden aspect-[4/5] bg-secondary-bg border border-border rounded-sm"
          >
            <Image 
              src="/images/director2.png" 
              alt="Mr. Upendra Sharma" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h4 className="font-display text-2xl text-white mb-1">Mr. Upendra Sharma</h4>
              <p className="font-label text-accent tracking-widest text-xs uppercase mb-4">Director</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
         {/* Background Accents */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
         
         <div className="max-w-4xl mx-auto text-center relative z-10 glass-card p-12 md:p-20 border border-accent/20">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="font-display text-4xl md:text-6xl text-white mb-6">Start Your Transformation</motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="font-light text-text-secondary mb-10 text-lg">
                Book a private consultation with our lead designers and experience the Townwood difference.
            </motion.p>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
                <Link href="/contact" className="inline-block px-10 py-4 bg-transparent border border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-500 font-label tracking-widest uppercase">
                    Book A Consultation
                </Link>
            </motion.div>
         </div>
      </section>
      
      <Footer />
    </main>
  );
}
