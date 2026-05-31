"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import EstimateModal from "./EstimateModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Automatically open the modal only once per session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 w-full flex justify-between items-center px-6 md:px-10 py-3 md:py-4 bg-background/90 backdrop-blur-lg z-50 border-b border-border shadow-[0_0_15px_rgba(212,175,55,0.05)]"
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="relative h-10 w-48 md:h-14 md:w-64 cursor-pointer overflow-hidden">
              <Image 
                src="/images/LOGO.png" 
                alt="Townwood Interior Logo" 
                fill
                priority
                className="object-contain object-left mix-blend-screen [clip-path:inset(0_0_0_4px)]"
              />
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex gap-10">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.path}
                className="font-label uppercase tracking-widest text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent text-accent font-label uppercase tracking-widest text-sm px-6 py-2 border border-accent hover:bg-accent hover:text-background transition-all duration-300"
        >
          GET FREE ESTIMATE
        </motion.button>
      </motion.header>

      <EstimateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
