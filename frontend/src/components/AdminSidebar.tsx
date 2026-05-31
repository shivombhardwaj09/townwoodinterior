"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("townwood_admin_token");
    router.push("/admin");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "grid_view" },
    { name: "Enquiries", href: "/admin/dashboard?tab=enquiries", icon: "mail" },
    { name: "Projects", href: "/admin/dashboard?tab=projects", icon: "architecture" },
  ];

  // We can't easily use Material Symbols without importing the font in layout, 
  // so we'll use simple custom SVGs or text if needed. For now, text is fine or minimal SVGs.
  
  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-secondary-bg border-r border-border flex flex-col z-50">
      <div className="p-8 border-b border-border">
        <span className="font-label text-accent uppercase tracking-[0.2em] text-[10px] mb-1 block">Admin Portal</span>
        <div className="font-display text-white text-xl">Townwood</div>
      </div>
      
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item) => {
          // Simple active check
          const isActive = item.href.includes("?tab=") 
            ? false // In a real app we'd read search params, but this is a simplified sidebar for MVP
            : pathname === item.href;
            
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm font-label text-xs uppercase tracking-widest transition-colors ${
                isActive 
                  ? "bg-accent/10 text-accent border border-accent/20" 
                  : "text-text-secondary hover:text-white hover:bg-background"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm font-label text-xs uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
