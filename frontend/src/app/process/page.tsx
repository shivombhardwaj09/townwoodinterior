"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "We begin with a deep dive into your lifestyle, preferences, and architectural requirements. This is where your vision meets our expertise.",
  },
  {
    step: "02",
    title: "Concept & 3D Design",
    desc: "Our architects and designers translate your requirements into stunning 3D visualizations, allowing you to walk through your future space before construction begins.",
  },
  {
    step: "03",
    title: "Material Selection",
    desc: "We curate a bespoke palette of premium materials, from Italian marbles to rich veneers, ensuring every texture aligns with the luxury standard.",
  },
  {
    step: "04",
    title: "Execution & Craftsmanship",
    desc: "Our master artisans bring the 3D designs to life with uncompromised precision. We manage every detail on-site for flawless execution.",
  },
  {
    step: "05",
    title: "Final Handover",
    desc: "After rigorous quality checks, we present your transformed space. Ready for you to move in, live, and experience true architectural excellence.",
  }
];

export default function Process() {
  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden selection:bg-accent selection:text-background">
      <Navbar />

      <section className="pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="text-center mb-24"
          >
            <motion.span variants={fadeUpVariant} className="font-label text-accent mb-4 block tracking-[0.3em] uppercase">
              How It Works
            </motion.span>
            <motion.h1 variants={fadeUpVariant} className="font-display text-5xl md:text-7xl text-white mb-6">
              The Townwood Journey
            </motion.h1>
            <motion.div variants={fadeUpVariant} className="w-24 h-[1px] bg-accent mx-auto"></motion.div>
          </motion.div>

          <div className="relative border-l border-border/50 ml-6 md:ml-12 space-y-24">
            {processSteps.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-12 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-background border border-accent flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>

                <div className="font-display text-accent text-6xl opacity-20 absolute -top-8 left-12 md:left-24 pointer-events-none">
                  {item.step}
                </div>
                
                <h3 className="font-display text-3xl text-white mb-4 relative z-10">{item.title}</h3>
                <p className="text-text-secondary font-light leading-relaxed max-w-2xl relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
