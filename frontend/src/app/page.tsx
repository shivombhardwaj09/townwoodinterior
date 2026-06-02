"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/config/supabaseClient";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // 1. Save data directly inside Supabase 'enquiries' table
      const { error: dbError } = await supabase
        .from("enquiries")
        .insert([
          {
            full_name: formData.name,
            phone: "Not Provided",
            email: formData.email,
            city: "Delhi NCR",
            property_type: "Homepage Connect Form",
            budget_range: "Consultation Needed",
            timeline: "Immediate",
            message: formData.message,
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      // 2. Also send the email alert via Web3Forms
      const data = new FormData();
      data.append("access_key", "acb77626-d621-49fa-ab5f-d227db04dfc0");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", "Not Provided");
      data.append("message", formData.message);
      data.append("subject", "New Homepage Connect Inquiry from Townwood Interior Site");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error submitting connect form to Supabase:", err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <Hero />
      
      {/* Video Showcase Section */}
      <section className="relative w-full h-[80vh] bg-black overflow-hidden flex items-center justify-center">
        <video 
          src="/images/luxury-home.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        ></video>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6">Experience True Luxury</h2>
          <div className="golden-underline mx-auto mb-8"></div>
          <p className="text-white/80 text-lg md:text-xl font-light mb-10">
            Watch our masterfully crafted designs come to life. Elegance, comfort, and functionality seamlessly blended.
          </p>
          <Link href="/portfolio" className="px-10 py-4 bg-transparent border border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-500 font-label tracking-widest uppercase inline-block">
            View Our Work
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 bg-secondary-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-text-primary mb-4">Our Expertise</h2>
            <div className="golden-underline mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 group cursor-pointer relative overflow-hidden h-96 flex flex-col justify-end">
              <Image fill src="/images/kitchen2.jpg" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" alt="Modular Kitchen" />
              <div className="relative z-10">
                <h3 className="text-2xl font-display text-white mb-3">Modular Kitchens</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Highly functional and elegantly designed modular kitchens tailored to fit your lifestyle and cooking needs.
                </p>
                <Link href="/services" className="text-accent font-label tracking-widest text-sm uppercase flex items-center gap-2">
                  Discover More <span>→</span>
                </Link>
              </div>
            </div>
            
            <div className="glass-card p-8 group cursor-pointer relative overflow-hidden h-96 flex flex-col justify-end">
              <Image fill src="/images/wardrobe2.png" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" alt="Custom Wardrobe" />
              <div className="relative z-10">
                <h3 className="text-2xl font-display text-white mb-3">Custom Wardrobes</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Premium custom wardrobes designed to maximize space while adding a touch of luxury to your bedrooms.
                </p>
                <Link href="/services" className="text-accent font-label tracking-widest text-sm uppercase flex items-center gap-2">
                  Discover More <span>→</span>
                </Link>
              </div>
            </div>

            <div className="glass-card p-8 group cursor-pointer relative overflow-hidden h-96 flex flex-col justify-end">
              <Image fill src="/images/kitchen3.jpg" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" alt="Home Interiors" />
              <div className="relative z-10">
                <h3 className="text-2xl font-display text-white mb-3">Complete Home Interiors</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Full home interior design and execution, bringing harmony, style, and comfort to every room in your house.
                </p>
                <Link href="/services" className="text-accent font-label tracking-widest text-sm uppercase flex items-center gap-2">
                  Discover More <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-6 pb-8">
             <div className="flex flex-col items-center">
                 <Image src="/images/director1.png" alt="Mr. Ravindra Sharma" width={400} height={533} className="rounded-lg w-full object-cover aspect-[3/4] mb-4 shadow-lg border border-border" />
                 <h4 className="text-text-primary font-display text-lg text-center">Mr. Ravindra Sharma</h4>
                 <p className="text-accent text-sm text-center font-label tracking-widest uppercase mt-1">Director</p>
             </div>
             <div className="flex flex-col items-center translate-y-8">
                 <Image src="/images/director2.png" alt="Mr. Upendra Sharma" width={400} height={533} className="rounded-lg w-full object-cover aspect-[3/4] mb-4 shadow-lg border border-border" />
                 <h4 className="text-text-primary font-display text-lg text-center">Mr. Upendra Sharma</h4>
                 <p className="text-accent text-sm text-center font-label tracking-widest uppercase mt-1">Director</p>
             </div>
          </div>
          <div>
            <span className="font-label text-accent uppercase tracking-widest text-sm mb-4 block">Leadership Note</span>
            <h2 className="font-display text-4xl text-text-primary mb-6">Director&apos;s Message</h2>
            <div className="golden-underline mb-8 !mx-0 !left-0 !translate-x-0 !w-24"></div>
            <p className="text-text-secondary mb-6 leading-relaxed">
              At Townwood Interior, our goal has always been to create interiors that reflect elegance, comfort, and thoughtful craftsmanship. Every project we undertake is driven by a commitment to quality, attention to detail, and complete customer satisfaction.
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              We believe that a well-designed space is not only beautiful but also practical and deeply personal. From modular kitchens and wardrobes to complete home interiors, we focus on transforming ideas into refined living experiences.
            </p>

            <Link href="/about" className="inline-block px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-background transition-colors font-label tracking-widest text-sm">
              READ FULL STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-secondary-bg overflow-hidden">
         <div className="text-center mb-16">
            <span className="font-label text-accent uppercase tracking-widest text-sm mb-4 block">Trusted By Leading Brands</span>
            <h2 className="font-display text-4xl text-text-primary mb-4">Our Partners</h2>
            <div className="golden-underline mx-auto"></div>
         </div>
         <div className="relative w-full overflow-hidden flex cursor-default">
           <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
              {[...['max-yatharth.png', 'sharda.png', 'sarovar.png', 'lemon-tree.png', 'marriott.png', 'radisson.png', 'skoda.png', 'honda.png', 'hyundai.png', 'indian-air-force.png', 'rbs.png', 'indian-railways.png', 'agra-university.png', 'up-metro.png'], ...['max-yatharth.png', 'sharda.png', 'sarovar.png', 'lemon-tree.png', 'marriott.png', 'radisson.png', 'skoda.png', 'honda.png', 'hyundai.png', 'indian-air-force.png', 'rbs.png', 'indian-railways.png', 'agra-university.png', 'up-metro.png']].map((partner, index) => (
                 <Image key={index} src={`/images/partners/${partner}`} alt={partner.split('.')[0]} width={200} height={112} className="h-24 md:h-28 w-auto mx-8 md:mx-12 object-contain inline-block transition-all duration-300 hover:scale-105" />
              ))}
           </div>
         </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="font-label text-accent uppercase tracking-widest text-sm mb-4 block">Let&apos;s Connect</span>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">Get In Touch</h2>
            <div className="golden-underline mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-3xl text-text-primary mb-6">Start Your Journey</h3>
              <p className="text-text-secondary leading-relaxed mb-10">
                Whether you&apos;re looking to completely revamp your space or simply seeking expert advice on a specific room, our team of seasoned designers is ready to bring your vision to life. Reach out today to schedule an initial consultation.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-label uppercase tracking-widest text-text-primary text-sm mb-1">Call Us</h4>
                    <p className="text-text-secondary">+91 98111 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-label uppercase tracking-widest text-text-primary text-sm mb-1">Email Us</h4>
                    <p className="text-text-secondary">contact@townwoodinterior.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="font-label uppercase tracking-widest text-text-primary text-sm mb-1">Visit Studio</h4>
                    <p className="text-text-secondary">123 Design Avenue, Sector 62,<br />Noida, Delhi NCR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 md:p-10 border border-accent/20 rounded-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-label text-xs uppercase tracking-widest text-text-secondary mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/50 border border-border px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-label text-xs uppercase tracking-widest text-text-secondary mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/50 border border-border px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-label text-xs uppercase tracking-widest text-text-secondary mb-2">Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-background/50 border border-border px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full font-label uppercase tracking-widest py-4 mt-4 transition-colors duration-300 flex items-center justify-center gap-2 border ${
                    status === "success" 
                      ? "bg-green-600/20 text-green-500 border-green-600/30" 
                      : status === "error" 
                        ? "bg-red-600/20 text-red-500 border-red-600/30" 
                        : "bg-accent text-background hover:bg-white border-accent"
                  }`}
                >
                  {status === "submitting" ? "Sending..." : 
                   status === "success" ? "Message Sent!" : 
                   status === "error" ? "Error Sending!" : 
                   "Send Inquiry"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
