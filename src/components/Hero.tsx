import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DoodleCircle, DoodleArrow, DoodleUnderline } from '@/components/Doodles';
import { StickyNoteStack, StickyNotePage } from '@/components/StickyNoteStack';
import { Highlight } from '@/components/Highlight';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-line-2 md:py-line-3 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto flex flex-col items-start justify-center">
      {/* Margin Handwritten Annotation */}
      <div className="absolute -left-2 sm:left-4 top-line-1.5 hidden lg:block font-hand text-slate-500 text-0.5 rotate-[-8deg] pointer-events-none select-none">
        <span>2026 portfolio notes</span>
      </div>

      {/* Availability Status Badge with Hand-Drawn Circle Effect */}
      <div className="relative inline-flex items-center h-line-1 mb-line-1">
        <Badge variant="yellow" className="px-4 gap-2 rotate-[-1deg]">
          <span>Status: Open for new projects &amp; ideas</span>
        </Badge>
        {/* Animated Hand-Drawn Circle loop around status */}
        <DoodleCircle color="#f43f5e" delay="0.4s" loops={2} className="w-[140%] -left-[20%]" />
      </div>

      {/* Main Headline with Highlighter Effect */}
      <h1 className="text-1.5 md:text-2 font-bold text-slate-900 tracking-tight mb-line-1 max-w-3xl translate-y-[6px]">
        Building refined web{' '}
        <br className="hidden md:inline" />
        products with{' '}
        <Highlight color="yellow" tilt="1">
          clarity
        </Highlight>{' '}
        <br className="hidden md:inline" />
        and{' '}
        <span className="relative inline">
          <Highlight color="blue" tilt="4">
            purpose
          </Highlight>
          <DoodleUnderline color="#f43f5e" delay="0.8s" className="absolute -bottom-2 left-0 w-full" />
        </span>
        .
      </h1>

      {/* Content Row: Bio + Actions on the left, Sticky Note Stack on the right */}
      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
        {/* Left Column: Subtitle / Bio and Actions vertically aligned */}
        <div className="flex flex-col items-start max-w-xl">
          {/* Subtitle / Bio styled like notebook annotations */}
          <p className="text-0.5 md:text-0.75 text-slate-700 font-normal mb-line-1.5 align-to-rule">
            I’m a product engineer sketching minimal interfaces, architecting clean codebases, and crafting deliberate digital experiences.
          </p>

          {/* Primary Actions with Doodle Arrow */}
          <div className="relative flex flex-wrap items-center gap-4">
            <div className="relative inline-block">
              <Button variant="default" size="lg" asChild className="group font-sketch text-0.5">
                <a href="#projects" className="flex items-center gap-2">
                  <span>Explore Works</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
            
            <Button variant="doodle" size="lg" asChild className="font-sketch text-0.5">
              <a href="#contact">Get in Touch</a>
            </Button>

            {/* Hand-drawn Arrow pointing to main CTA */}
            <div className="hidden md:block absolute -right-4 top-14 rotate-[-12deg] pointer-events-none select-none">
              <div className="flex flex-col items-center">
                <DoodleArrow color="#f43f5e" delay="1.1s" className="w-12 h-10 -scale-x-100 rotate-45" />
                <span className="font-hand text-rose-500 font-bold text-0.5 -mb-1">click here!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Note Stack horizontally aligned */}
        <div className="shrink-0 self-center md:self-auto pt-2 md:pt-0">
          <StickyNoteStack
            count={3}
            color="yellow"
            fixture="paperclip"
            pinColor="rose"
            size="5x5"
            className="rotate-[-1.5deg]"
          >
            <StickyNotePage title="Tech Stack">
              <div className="flex flex-col items-center justify-center text-center py-1">
                <span className="font-sketch text-0.375 font-bold text-slate-800 uppercase tracking-wide">
                  Astro • React<br />TypeScript • Tailwind
                </span>
              </div>
            </StickyNotePage>
            <StickyNotePage title="Location">
              <div className="flex flex-col items-center justify-center text-center py-1">
                <span className="font-hand text-0.5 font-bold text-slate-800 tracking-normal">
                  based in Seattle &amp; open to remote work
                </span>
              </div>
            </StickyNotePage>
            <StickyNotePage title="Availability">
              <div className="flex flex-col items-center justify-center text-center py-1">
                <span className="font-hand text-0.5 font-bold text-emerald-700 tracking-normal">
                  available for Q3/Q4 contracts
                </span>
              </div>
            </StickyNotePage>
            <StickyNotePage title="Timezone">
              <div className="flex flex-col items-center justify-center text-center py-1">
                <span className="font-hand text-0.5 font-bold text-slate-800 tracking-normal">
                  PST / UTC-8 (flexible)
                </span>
              </div>
            </StickyNotePage>
          </StickyNoteStack>
        </div>
      </div>
    </section>
  );
};
