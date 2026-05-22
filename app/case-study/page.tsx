'use client';

import Link from "next/link";
import Diagnosis from "@/components/sections/Diagnosis";

export default function CaseStudyPage() {
  return (
    <main className="relative min-h-screen bg-bg-primary overflow-x-hidden">
      
      {/* Premium Top Navigation */}
      <nav className="absolute top-0 left-0 w-full z-30 py-6 px-6 md:px-12 flex items-center justify-start bg-transparent">
        <Link 
          href="/" 
          className="font-mono text-xs md:text-sm tracking-[0.25em] text-text-muted hover:text-accent-red transition-colors duration-300 flex items-center gap-2 group"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
          <span>BACK TO SITE</span>
        </Link>
      </nav>

      {/* Main Content: Diagnosis Section */}
      <Diagnosis />
      
    </main>
  );
}
