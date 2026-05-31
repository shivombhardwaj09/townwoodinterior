import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center gap-8 px-10 py-20 bg-background border-t border-border">
      <div className="font-display text-accent text-2xl tracking-widest uppercase">Townwood Interior</div>
      <div className="flex gap-10">
        <Link href="#" className="font-label text-xs tracking-widest text-text-secondary hover:text-accent hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 uppercase">
          Privacy Policy
        </Link>
        <Link href="#" className="font-label text-xs tracking-widest text-text-secondary hover:text-accent hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 uppercase">
          Terms of Service
        </Link>
        <Link href="#" className="font-label text-xs tracking-widest text-text-secondary hover:text-accent hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 uppercase">
          FAQ
        </Link>
      </div>
      <p className="font-label text-xs tracking-widest text-text-secondary/50 text-center uppercase">
        © {new Date().getFullYear()} TOWNWOOD INTERIOR. CRAFTING ARCHITECTURAL EXCELLENCE.
      </p>
    </footer>
  );
}
