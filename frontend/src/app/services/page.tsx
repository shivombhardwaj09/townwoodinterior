"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { 
  Sofa, 
  UtensilsCrossed, 
  BedDouble, 
  Baby, 
  Shirt, 
  ChefHat, 
  Briefcase, 
  Store 
} from "lucide-react";

const residentialServices = [
  {
    title: "Living Rooms",
    description: "Stylish and inviting spaces for relaxation and social gatherings",
    icon: <Sofa className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
  {
    title: "Dining Rooms",
    description: "Sophisticated dining spaces balancing beauty and functionality",
    icon: <UtensilsCrossed className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
  {
    title: "Bedrooms",
    description: "Peaceful and luxurious personal retreats",
    icon: <BedDouble className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
  {
    title: "Kids’ Rooms",
    description: "Creative and vibrant spaces designed for imagination and growth",
    icon: <Baby className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
  {
    title: "Dressing Rooms",
    description: "Elegant and organized bespoke dressing areas",
    icon: <Shirt className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
  {
    title: "Modular Kitchens",
    description: "Contemporary kitchens combining efficiency with premium aesthetics",
    icon: <ChefHat className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
];

const commercialServices = [
  {
    title: "Office Design",
    description: "Modern and productive office environments focused on comfort and efficiency",
    icon: <Briefcase className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
  {
    title: "Retail Store Design",
    description: "Engaging retail spaces designed to attract customers and maximize interaction",
    icon: <Store className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="font-label text-accent uppercase tracking-widest text-sm mb-4 block">Our Expertise</span>
          <h1 className="font-display text-5xl md:text-6xl text-text-primary mb-6">Premium Services</h1>
          <div className="w-24 h-px bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* SECTION 1: RESIDENTIAL */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col h-full"
          >
            <motion.div variants={itemVariants} className="mb-10 text-center lg:text-left">
              <h2 className="font-display text-4xl text-text-primary mb-4">Residential Services</h2>
              <h3 className="font-label text-accent uppercase tracking-widest text-sm mb-6">Building Solutions That Exceed Expectations</h3>
              <p className="text-text-secondary leading-relaxed">
                Our residential design services focus on crafting beautiful and functional spaces that enhance everyday living. Every corner of your home is thoughtfully designed to blend comfort, elegance, and practicality.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
              {residentialServices.map((service, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-secondary-bg/50 backdrop-blur-md border border-border/50 p-8 hover:border-accent/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      {service.icon}
                    </div>
                    <h4 className="font-display text-xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-10 p-6 bg-secondary-bg/30 border border-accent/20 rounded-sm">
              <p className="font-label tracking-widest text-xs uppercase text-text-primary text-center leading-loose">
                &quot;Each design is customized to suit your lifestyle and personal preferences, ensuring a home that feels uniquely yours.&quot;
              </p>
            </motion.div>
          </motion.div>

          {/* SECTION 2: COMMERCIAL */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col h-full"
          >
            <motion.div variants={itemVariants} className="mb-10 text-center lg:text-left">
              <h2 className="font-display text-4xl text-text-primary mb-4">Commercial Services</h2>
              <h3 className="font-label text-accent uppercase tracking-widest text-sm mb-6">Designing Spaces That Inspire Productivity</h3>
              <p className="text-text-secondary leading-relaxed">
                Our commercial design solutions are crafted to create impactful, functional, and visually compelling environments that align perfectly with your business identity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
              {commercialServices.map((service, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-secondary-bg/50 backdrop-blur-md border border-border/50 p-8 hover:border-accent/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      {service.icon}
                    </div>
                    <h4 className="font-display text-xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-10 p-6 bg-secondary-bg/30 border border-accent/20 rounded-sm">
              <p className="font-label tracking-widest text-xs uppercase text-text-primary text-center leading-loose">
                &quot;We focus on intelligent layouts, innovative design elements, and efficient space utilization to deliver commercial interiors that are both practical and visually striking.&quot;
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
