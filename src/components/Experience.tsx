import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Role {
  period: string;
  role: string;
  company: string;
  summary: string;
}

const roles: Role[] = [
  {
    period: '2024 — PRESENT',
    role: 'Lead Frontend Architect',
    company: 'Starlight Labs',
    summary: 'Directing web application development with Astro & React. Optimized bundle sizes by 65%.',
  },
  {
    period: '2022 — 2024',
    role: 'Senior Product Engineer',
    company: 'Veloce Systems',
    summary: 'Designed modular UI design systems and real-time client dashboards in TypeScript.',
  },
  {
    period: '2020 — 2022',
    role: 'Frontend Developer',
    company: 'Monochrome Interactive',
    summary: 'Built accessible, high-performance web applications and glassmorphic user interfaces.',
  },
];

const capabilities = [
  'Frontend Architecture',
  'Design Systems',
  'Performance Optimization',
  'TypeScript & React',
  'Astro & Static Sites',
  'UI/UX Prototyping',
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Capabilities / Skills */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4">
              Core Skills &amp; Focus
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Specialized in clean component abstractions, lightning-fast rendering, and minimalist visual aesthetics.
            </p>

            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap) => (
                <Badge key={cap} variant="glass" className="py-1 px-3 text-xs font-medium text-slate-700">
                  {cap}
                </Badge>
              ))}
            </div>
          </div>

          <div className="hidden md:block glass-panel p-5 rounded-2xl border-slate-200/60 mt-8">
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              "Minimalism isn't the lack of something. It's simply the perfect amount of everything."
            </p>
          </div>
        </div>

        {/* Right Column: Work History Timeline */}
        <div className="md:col-span-7 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
            History
          </span>

          <div className="space-y-4">
            {roles.map((item, index) => (
              <Card key={index} className="p-5 hover:bg-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.role} <span className="text-slate-400 font-normal">at {item.company}</span>
                  </h3>
                  <span className="text-xs font-medium text-slate-400 tracking-wider">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
