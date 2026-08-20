import React from 'react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <a href="#" className="group flex items-center gap-2 text-slate-900 font-semibold tracking-tight text-base hover:opacity-80 transition-opacity">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block transition-transform group-hover:scale-125" />
          <span>Alex Morgan</span>
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#projects" className="hover:text-slate-900 transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-slate-900 transition-colors">
            Experience
          </a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Button variant="default" size="sm" asChild>
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
