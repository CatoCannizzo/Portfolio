import React from 'react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdfbf7]/90 backdrop-blur-md border-b-2 border-rose-400/80">
      <div className="max-w-5xl mx-auto px-6 sm:pl-32 sm:pr-8 h-16 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <a href="#" className="group flex items-center gap-2 text-slate-900 font-bold tracking-tight text-0.5 hover:rotate-[-1deg] transition-transform">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-slate-900 shadow-doodle-sm" />
          <span className="font-sans">Alex Morgan</span>
          <span className="font-hand text-rose-500 text-0.5 font-bold ml-0.5 group-hover:inline-block">.notes</span>
        </a>

        {/* Minimal Navigation styled like notebook index tabs */}
        <nav className="hidden md:flex items-center gap-7 text-0.5 font-semibold text-slate-700">
          <a
            href="#projects"
            className="relative py-1 hover:text-slate-900 hover:rotate-[-1deg] transition-all group"
          >
            <span>Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-200" />
          </a>
          <a
            href="#experience"
            className="relative py-1 hover:text-slate-900 hover:rotate-[1deg] transition-all group"
          >
            <span>Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-200" />
          </a>
          <a
            href="#contact"
            className="relative py-1 hover:text-slate-900 hover:rotate-[-1deg] transition-all group"
          >
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-200" />
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Button variant="default" size="sm" asChild className="font-sketch text-0.5 tracking-wide">
            <a href="#contact">Say Hello! ✍️</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
