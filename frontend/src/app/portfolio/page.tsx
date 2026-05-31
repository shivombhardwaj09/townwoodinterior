"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const projects = [
  {
    title: "Modern Minimalist Villa",
    category: "Residential",
    location: "Sector 50, Noida",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Luxury Penthouse Suite",
    category: "Luxury",
    location: "DLF Phase 3, Gurgaon",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Corporate HQ Redesign",
    category: "Commercial",
    location: "Connaught Place, Delhi",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Scandinavian Family Home",
    category: "Residential",
    location: "Greater Noida West",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Modular Kitchen Paradise",
    category: "Modular Kitchen",
    location: "Faridabad",
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Premium 3BHK Complete",
    category: "Residential",
    location: "Indirapuram, Ghaziabad",
    thumbnail: "https://images.unsplash.com/photo-1600607687644-aac4c156628c?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function Portfolio() {
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
              Our Masterpieces
            </motion.span>
            <motion.h1 variants={fadeUpVariant} className="font-display text-5xl md:text-7xl text-white mb-6">
              Portfolio
            </motion.h1>
            <motion.div variants={fadeUpVariant} className="w-24 h-[1px] bg-accent mx-auto"></motion.div>
            <motion.p variants={fadeUpVariant} className="mt-8 text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Explore our curated selection of high-end residential and commercial projects. Each space is a testament to our commitment to luxury, precision, and architectural harmony.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpVariant}
                className="group relative cursor-pointer overflow-hidden rounded-sm"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="font-label text-accent uppercase tracking-widest text-xs mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl text-white mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {project.location}
                  </div>
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
