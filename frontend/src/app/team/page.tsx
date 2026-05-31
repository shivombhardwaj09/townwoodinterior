"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const teamMembers = [
  {
    name: "Ravindra Sharma",
    role: "Founder & Director",
    image: "/images/director1.png",
  },
  {
    name: "Upendra Sharma",
    role: "Director",
    image: "/images/director2.png",
  },
  {
    name: "Aman Verma",
    role: "Lead Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Priya Kapoor",
    role: "Senior Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Rohan Desai",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Sneha Reddy",
    role: "Material Specialist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  }
];

export default function Team() {
  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden selection:bg-accent selection:text-background">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-24"
          >
            <motion.span variants={fadeUpVariant} className="font-label text-accent mb-4 block tracking-[0.3em] uppercase">
              The Artisans
            </motion.span>
            <motion.h1 variants={fadeUpVariant} className="font-display text-5xl md:text-7xl text-white mb-6">
              Our Team
            </motion.h1>
            <motion.div variants={fadeUpVariant} className="w-24 h-[1px] bg-accent mx-auto"></motion.div>
            <motion.p variants={fadeUpVariant} className="mt-8 text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Meet the visionaries, architects, and designers who bring Townwood Interior&apos;s luxury spaces to life.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpVariant}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary-bg border border-border rounded-sm mb-6">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl text-white mb-2">{member.name}</h3>
                  <p className="font-label text-accent uppercase tracking-widest text-xs">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
