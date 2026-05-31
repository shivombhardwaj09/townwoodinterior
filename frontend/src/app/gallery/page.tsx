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
      staggerChildren: 0.1,
    },
  },
};

const galleryImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600607687644-aac4c156628c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000"
];

export default function Gallery() {
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
              Visual Inspiration
            </motion.span>
            <motion.h1 variants={fadeUpVariant} className="font-display text-5xl md:text-7xl text-white mb-6">
              Design Gallery
            </motion.h1>
            <motion.div variants={fadeUpVariant} className="w-24 h-[1px] bg-accent mx-auto"></motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {galleryImages.map((src, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpVariant}
                className="relative break-inside-avoid overflow-hidden rounded-sm group cursor-pointer"
              >
                <Image 
                  src={src} 
                  alt={`Gallery Image ${idx + 1}`} 
                  width={1000}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
