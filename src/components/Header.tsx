import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, SquarePen } from '@matita/icons/react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    updatePath();
    document.addEventListener('astro:page-load', updatePath);
    window.addEventListener('popstate', updatePath);

    return () => {
      document.removeEventListener('astro:page-load', updatePath);
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  // Close mobile menu on window resize to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTestPage = currentPath === '/test';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdfbf7]/90 backdrop-blur-md border-b-2 border-rose-400/80">
      <div className="max-w-5xl mx-auto px-6 sm:pl-32 sm:pr-8 h-16 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <a
          href="/"
          className="group flex items-center gap-2 text-slate-900 font-bold tracking-tight text-0.5 hover:rotate-[-1deg] transition-transform"
          aria-label="Cato Cannizzo Portfolio Home"
        >
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-slate-900 shadow-doodle-sm" />
          <span className="font-sans">Cato Cannizzo</span>
          <span className="font-hand text-rose-500 text-0.5 font-bold ml-0.5 group-hover:inline-block">.notes</span>
        </a>

        {/* Minimal Navigation styled like notebook index tabs */}
        <nav className="hidden md:flex items-center gap-7 text-0.5 font-semibold text-slate-700">
          <a
            href="/#projects"
            className="relative py-1 hover:text-slate-900 hover:rotate-[-1deg] transition-all group"
          >
            <span>Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-200" />
          </a>
          <a
            href="/#experience"
            className="relative py-1 hover:text-slate-900 hover:rotate-[1deg] transition-all group"
          >
            <span>Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-200" />
          </a>
          <a
            href="/#contact"
            className="relative py-1 hover:text-slate-900 hover:rotate-[-1deg] transition-all group"
          >
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-200" />
          </a>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="default" size="sm" asChild className="font-sketch text-0.375 tracking-wide">
            <a href="/#contact" className="inline-flex items-center gap-1.5">
              <span>Say Hello!</span>
              <SquarePen size={14} />
            </a>
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-yellow-100/80 transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden w-full bg-[#fdfbf7]/98 border-b-2 border-rose-400/80 shadow-doodle-md px-6 sm:pl-32 sm:pr-8 py-line-0.5 flex flex-col gap-2">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-0.5 font-semibold text-slate-700 hover:text-slate-900 border-b border-dashed border-slate-200"
          >
            <span className="font-sans">Home / Notebook</span>
            <span className="font-hand text-0.5 text-rose-500 font-bold">top</span>
          </a>
          <a
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-0.5 font-semibold text-slate-700 hover:text-slate-900 border-b border-dashed border-slate-200"
          >
            <span className="font-sans">Projects</span>
            <span className="font-sketch text-0.375 text-slate-400 font-bold">01</span>
          </a>
          <a
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-0.5 font-semibold text-slate-700 hover:text-slate-900 border-b border-dashed border-slate-200"
          >
            <span className="font-sans">Experience</span>
            <span className="font-sketch text-0.375 text-slate-400 font-bold">02</span>
          </a>
          <a
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-0.5 font-semibold text-slate-700 hover:text-slate-900 border-b border-dashed border-slate-200"
          >
            <span className="font-sans">Contact</span>
            <span className="font-sketch text-0.375 text-slate-400 font-bold">03</span>
          </a>
         
        </nav>
      )}
    </header>
  );
};
