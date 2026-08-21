import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DoodleCircle, DoodleArrow, DoodleStar, DoodleUnderline } from '@/components/Doodles';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen pt-16 pb-16 md:pt-24 md:pb-24 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto flex flex-col items-start">
      {/* Margin Handwritten Annotation */}
      <div className="absolute -left-2 sm:left-4 top-12 hidden lg:block font-hand text-slate-500 text-lg rotate-[-8deg] pointer-events-none select-none">
        <span>★ 2026 portfolio notes</span>
      </div>

      {/* Availability Status Badge with Hand-Drawn Circle Effect */}
      <div className="relative inline-flex items-center mb-6">
        <Badge variant="yellow" className="py-1 px-4 gap-2 text-xs font-sketch text-slate-900 rotate-[-1deg]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
          <span>Status: Open for new projects &amp; ideas</span>
        </Badge>
        {/* Animated Hand-Drawn Circle loop around status */}
        <DoodleCircle color="#f43f5e" delay="1s" loops={3} />
      </div>

      {/* Main Headline with Highlighter Effect */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.18] mb-6 max-w-3xl">
        Building refined web products with{' '}
        <span className="relative inline-block">
          <span className="marker-yellow relative z-10 px-2 py-0.5">clarity</span>
        </span>{' '}
        and{' '}
        <span className="relative inline-block">
          <span className="marker-blue relative z-10 px-2 py-0.5">purpose</span>
          <DoodleUnderline color="#f43f5e" className="absolute -bottom-2 left-0 w-full" />
        </span>
        .
      </h1>

      {/* Subtitle / Bio styled like notebook annotations */}
      <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mb-10">
        I’m a product engineer sketching minimal interfaces, architecting clean codebases, and crafting deliberate digital experiences.
      </p>

      {/* Primary Actions with Doodle Arrow */}
      <div className="relative flex flex-wrap items-center gap-4">
        <div className="relative inline-block">
          <DoodleCircle color="#f43f5e" delay="1.5s" loops={2} />
          <Button variant="default" size="lg" asChild className="group font-sketch text-base">
            <a href="#projects" className="flex items-center gap-2">
              <span>Explore Works</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>
        
        <Button variant="doodle" size="lg" asChild className="font-sketch text-base">
          <a href="#contact">Get in Touch</a>
        </Button>

        {/* Hand-drawn Arrow pointing to main CTA */}
        <div className="hidden sm:block absolute -right-24 -top-8 rotate-[-12deg]">
          <div className="flex flex-col items-center">
            <span className="font-hand text-rose-500 font-bold text-base -mb-1">click here!</span>
            <DoodleArrow color="#f43f5e" className="w-12 h-10 -scale-x-100 rotate-45" />
          </div>
        </div>
      </div>

      {/* Minimal Tech Ruled List Footer */}
      <div className="mt-16 pt-6 border-t border-dashed border-slate-300 w-full flex flex-wrap items-center justify-between gap-4 text-xs font-sketch text-slate-600 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <DoodleStar size={16} color="#f59e0b" />
          <span>Astro 4 • React • TypeScript • Tailwind</span>
        </div>
        <span className="font-hand lowercase text-base text-slate-500">📍 based in SF &amp; remote</span>
      </div>
    </section>
  );
};
