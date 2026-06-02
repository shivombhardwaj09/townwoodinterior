"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Serverless Client-Side authentication using seed credentials
      if (email === "admin@townwoodinterior.com" && password === "password123") {
        // Save token to localStorage
        localStorage.setItem("townwood_admin_token", "townwood_static_admin_token");
        // Redirect to dashboard
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden px-6 selection:bg-accent selection:text-background">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-10 border border-border shadow-2xl relative overflow-hidden">
          {/* Top golden accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20"></div>
          
          <div className="text-center mb-10">
            <span className="font-label text-accent uppercase tracking-[0.3em] text-xs mb-2 block">Townwood Interior</span>
            <h1 className="font-display text-3xl text-white">Admin Portal</h1>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm font-label text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-label tracking-widest text-xs text-text-secondary uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border-b border-border py-3 px-0 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/30"
                placeholder="admin@townwoodinterior.com"
              />
            </div>
            
            <div>
              <label className="block font-label tracking-widest text-xs text-text-secondary uppercase mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border-b border-border py-3 px-0 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/30"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-accent text-background hover:bg-white transition-colors duration-300 font-label tracking-widest text-sm uppercase disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
          
          <div className="mt-8 text-center">
             <a href="/" className="font-label text-xs text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">
               &larr; Return to Website
             </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
