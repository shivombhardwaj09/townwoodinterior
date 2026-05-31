/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
// import { Playfair_Display, Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import FluidBackground from "@/components/FluidBackground";
import CustomCursor from "@/components/CustomCursor";

// We are replacing next/font with standard CSS variables injected via HTML to prevent Node.js ECONNRESET hangs

export const metadata: Metadata = {
  title: "Townwood Interior",
  description: "Thoughtfully Designed Interiors With Elegance, Comfort, and Lasting Quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-transparent text-text-primary">
        <FluidBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
