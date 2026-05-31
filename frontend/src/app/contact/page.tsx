"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
} as const;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const data = new FormData();
    data.append("access_key", "acb77626-d621-49fa-ab5f-d227db04dfc0");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);
    data.append("subject", "New Contact Inquiry from Townwood Interior Site");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden selection:bg-accent selection:text-background">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="text-center mb-24"
        >
          <motion.span variants={fadeUpVariant} className="font-label text-accent mb-4 block tracking-[0.3em] uppercase">
            Get In Touch
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="font-display text-5xl md:text-7xl text-white mb-6">
            Contact Us
          </motion.h1>
          <motion.div variants={fadeUpVariant} className="w-24 h-[1px] bg-accent mx-auto"></motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h3 className="font-display text-3xl text-white mb-6">Our Headquarters</h3>
              <p className="text-text-secondary font-light leading-relaxed mb-8 max-w-sm">
                Townwood Interior Design Studio<br />
                A-12, Sector 15<br />
                Noida, Uttar Pradesh 201301<br />
                India
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-4 text-text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  <span>info@townwoodinterior.com</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h4 className="font-label text-accent uppercase tracking-widest text-xs mb-4">Business Hours</h4>
              <p className="text-text-secondary font-light text-sm space-y-2">
                <span className="block">Monday - Friday: 10:00 AM - 7:00 PM</span>
                <span className="block">Saturday: 10:00 AM - 5:00 PM</span>
                <span className="block text-text-secondary/50">Sunday: Closed (Consultations by appointment)</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-10 border border-border"
          >
            <h3 className="font-display text-2xl text-white mb-8">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-label tracking-widest text-xs text-text-secondary uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-b border-border py-3 px-0 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/30"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-label tracking-widest text-xs text-text-secondary uppercase mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border-b border-border py-3 px-0 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/30"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block font-label tracking-widest text-xs text-text-secondary uppercase mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border-b border-border py-3 px-0 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/30"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label tracking-widest text-xs text-text-secondary uppercase mb-2">Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-background border-b border-border py-3 px-0 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/30 resize-none"
                  placeholder="Tell us about your space..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`w-full py-4 font-label tracking-widest text-sm uppercase transition-all duration-300 ${status === "success" ? "bg-green-600/20 text-green-500 border border-green-600/30" :
                    status === "error" ? "bg-red-600/20 text-red-500 border border-red-600/30" :
                      "bg-accent text-background hover:bg-white disabled:opacity-50"
                  }`}
              >
                {status === "submitting" ? "Sending..." :
                  status === "success" ? "Message Sent Successfully" :
                    status === "error" ? "Error Sending Message" :
                      "Submit Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
