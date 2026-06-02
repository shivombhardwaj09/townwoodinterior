"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { motion } from "framer-motion";

import { supabase } from "@/config/supabaseClient";
import Image from "next/image";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  category: string;
  location: string;
  thumbnail: string;
}

interface DBEnquiry {
  id: number | string;
  full_name?: string;
  email?: string;
  phone?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

interface DBProject {
  id: number | string;
  title?: string;
  category?: string;
  location?: string;
  thumbnail?: string;
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "enquiries";
  
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("townwood_admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        if (tab === "enquiries") {
          const { data, error: dbError } = await supabase
            .from("enquiries")
            .select("*")
            .order("created_at", { ascending: false });

          if (dbError) throw dbError;

          if (data) {
            const mappedEnquiries = (data as DBEnquiry[]).map((item: DBEnquiry) => ({
              _id: item.id?.toString() || item.email || "",
              name: item.full_name || "",
              email: item.email || "",
              phone: item.phone || "",
              message: item.message || "",
              status: item.status || "New",
              createdAt: item.created_at || new Date().toISOString(),
            }));
            setEnquiries(mappedEnquiries);
          }
        } else if (tab === "projects") {
          const { data, error: dbError } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

          if (dbError) throw dbError;

          if (data) {
            const mappedProjects = (data as DBProject[]).map((item: DBProject) => ({
              _id: item.id?.toString() || item.title || "",
              title: item.title || "",
              category: item.category || "",
              location: item.location || "",
              thumbnail: item.thumbnail || "",
            }));
            setProjects(mappedProjects);
          }
        }
      } catch (err: unknown) {
        console.error("Dashboard fetch error:", err);
        const errMsg = err instanceof Error ? err.message : String(err);
        setError("Failed to fetch data from Supabase: " + errMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, tab]);

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10 bg-background text-text-primary selection:bg-accent selection:text-background">
        <header className="mb-10 pb-6 border-b border-border flex justify-between items-end">
          <div>
            <span className="font-label text-text-secondary tracking-widest text-xs uppercase mb-2 block">
              Overview
            </span>
            <h1 className="font-display text-4xl text-white capitalize">
              {tab} Management
            </h1>
          </div>
          <div className="font-label text-accent tracking-widest text-xs border border-accent/20 bg-accent/5 px-4 py-2 rounded-full">
            Admin Logged In
          </div>
        </header>

        {error && (
           <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm font-label mb-8">
             {error}
           </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20 text-accent">
            <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tab === "enquiries" && (
              <div className="glass-card border border-border overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary-bg border-b border-border font-label text-xs uppercase tracking-widest text-text-secondary">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-text-secondary font-light">
                          No enquiries found in the database.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enq) => (
                        <tr key={enq._id} className="hover:bg-secondary-bg/50 transition-colors">
                          <td className="px-6 py-4 font-light text-text-secondary whitespace-nowrap">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-white">{enq.name}</td>
                          <td className="px-6 py-4 text-text-secondary font-light">
                            {enq.email}<br/>
                            <span className="text-xs text-text-secondary/50">{enq.phone}</span>
                          </td>
                          <td className="px-6 py-4 text-text-secondary font-light max-w-xs truncate">
                            {enq.message}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-label uppercase tracking-widest bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                              {enq.status || "New"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "projects" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-text-secondary font-light glass-card border border-border">
                    No projects found in the database. (Run the seed script!)
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project._id} className="glass-card border border-border overflow-hidden group">
                      <div className="relative h-48 overflow-hidden bg-secondary-bg">
                        <Image 
                          src={project.thumbnail} 
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <span className="font-label text-accent text-[10px] uppercase tracking-widest block mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-xl text-white font-display mb-1">{project.title}</h3>
                        <p className="text-sm text-text-secondary font-light">{project.location}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center text-accent">
        <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
