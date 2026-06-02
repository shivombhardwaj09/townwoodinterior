"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, CheckCircle2 } from "lucide-react";
import { supabase } from "@/config/supabaseClient";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const [flatConfig, setFlatConfig] = useState("3 BHK");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const flatOptions = ["2 BHK", "3 BHK", "4 BHK", "Other / Custom"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Append the custom selected flat configuration
    formData.append("Flat Configuration", flatConfig);

    try {
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;
      const email = formData.get("email") as string;
      const address = formData.get("address") as string;
      const society = formData.get("society") as string;
      const message = formData.get("message") as string;

      const fullMessage = `${message || ""}${society ? `\nSociety: ${society}` : ""}${
        fileName ? `\nFloor Plan File: ${fileName}` : ""
      }`;

      // 1. Save data directly inside Supabase 'enquiries' table
      const { error: dbError } = await supabase
        .from("enquiries")
        .insert([
          {
            full_name: name,
            phone: phone,
            email: email,
            city: address || "Noida",
            property_type: flatConfig,
            budget_range: "Consultation Needed",
            timeline: "Immediate",
            message: fullMessage,
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      // 2. Also send the email alert via Web3Forms so you get instant email notifications
      const formServiceEndpoint = ["https://api", "web3forms.com", "submit"].join("/");
      
      await fetch(formServiceEndpoint, {
        method: "POST",
        body: formData,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form to Supabase:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-secondary-bg border border-border shadow-2xl overflow-y-auto no-scrollbar rounded-sm pointer-events-auto"
            >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-text-secondary hover:text-accent transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              <span className="font-label text-accent uppercase tracking-widest text-xs mb-3 block">
                Start Your Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-2">
                Get a Free Estimate
              </h2>
              <div className="w-16 h-px bg-accent mb-8"></div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center flex flex-col items-center"
                >
                  <CheckCircle2 size={64} className="text-accent mb-6" />
                  <h3 className="font-display text-2xl text-text-primary mb-4">
                    Thank you! We&apos;ll get back to you shortly.
                  </h3>
                  <p className="text-text-secondary">
                    Our design team is reviewing your request and will be in touch.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-10 px-8 py-3 bg-transparent border border-accent text-accent hover:bg-accent hover:text-background transition-all font-label tracking-widest uppercase text-sm"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Web3Forms Access Key */}
                  <input type="hidden" name="access_key" value="YOUR_WEB3_FORMS_KEY" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  <input type="hidden" name="subject" value="New Estimate Request from Townwood Interior" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="123 Luxury Lane, City"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                      Society / Building Name
                    </label>
                    <input
                      type="text"
                      name="society"
                      className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="The Townwood Residences"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-3">
                      Flat Configuration *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {flatOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFlatConfig(opt)}
                          className={`px-4 py-2 text-sm font-label tracking-widest uppercase transition-all ${
                            flatConfig === opt
                              ? "bg-accent text-background"
                              : "bg-background border border-border text-text-secondary hover:border-accent hover:text-text-primary"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                      Floor Plan Upload (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="attachment"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full bg-background border border-dashed border-border px-4 py-6 flex flex-col items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-colors">
                        <UploadCloud size={24} className="mb-2" />
                        <span className="text-sm">
                          {fileName ? fileName : "Drag & drop or click to upload (.pdf, .jpg, .png)"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-text-secondary mb-2">
                      Message / Additional Notes
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your dream space..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-background font-label tracking-widest uppercase py-4 mt-4 hover:bg-transparent hover:text-accent border border-accent transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
