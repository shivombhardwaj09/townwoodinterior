"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import RoomWireframe from "./RoomWireframe";

export default function Hero() {
  const headline = "Thoughtfully Designed Interiors With Elegance";
  const words = headline.split(" ");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Wireframe Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <RoomWireframe />
        </Canvas>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-label text-accent mb-4 block uppercase tracking-[0.4em]"
        >
          Est. 2006 | Delhi NCR
        </motion.span>
        
        <h1 className="font-display text-text-primary text-[clamp(2.5rem,6vw,5.5rem)] max-w-6xl mx-auto mb-8 leading-[1.15] drop-shadow-2xl flex flex-wrap justify-center gap-x-[0.3em]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="px-10 py-4 bg-accent text-background font-label tracking-widest hover:bg-transparent hover:text-accent border border-accent transition-all duration-500">
            EXPLORE PORTFOLIO
          </button>
          <div className="flex items-center gap-4 text-text-secondary">
            <div className="h-px bg-gradient-to-r from-accent to-transparent w-24"></div>
            <span className="font-label uppercase tracking-widest text-sm">Premium Quality</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-label text-xs text-text-secondary tracking-[0.2em] [writing-mode:vertical-rl]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent"></div>
      </motion.div>
    </section>
  );
}
