import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 max-w-5xl mx-auto flex flex-col items-start">
      {/* Availability Status Badge */}
      <div className="animate-fade-in">
        <Badge variant="glass" className="py-1.5 px-3.5 gap-2 font-normal text-slate-700 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for select projects</span>
        </Badge>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.12] mb-6 max-w-3xl">
        Building refined web products with clarity and purpose.
      </h1>

      {/* Subtitle / Bio */}
      <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-10">
        I am a product engineer crafting minimalist interfaces, robust web architectures, and seamless digital experiences using modern frontend tech.
      </p>

      {/* Primary Actions */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="default" size="lg" asChild className="group">
          <a href="#projects">
            <span>Explore Works</span>
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
        <Button variant="glass" size="lg" asChild>
          <a href="#contact">Contact Me</a>
        </Button>
      </div>

      {/* Minimal Tech List Indicator */}
      <div className="mt-16 pt-8 border-t border-slate-200/60 w-full flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
        <span>Astro • React • TypeScript • Tailwind</span>
        <span>San Francisco &amp; Remote</span>
      </div>
    </section>
  );
};
