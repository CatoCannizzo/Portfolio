import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DoodleUnderline, DoodleCheck, DoodleTape, DoodleStar } from '@/components/Doodles';

interface Role {
  period: string;
  role: string;
  company: string;
  summary: string;
  highlight: string;
}

const roles: Role[] = [
  {
    period: '2024 — PRESENT',
    role: 'Lead Frontend Architect',
    company: 'Starlight Labs',
    summary: 'Directing web application development with Astro & React. Reduced bundle size by 65% across core workflows.',
    highlight: 'Astro 4 • React 18 • Performance',
  },
  {
    period: '2022 — 2024',
    role: 'Senior Product Engineer',
    company: 'Veloce Systems',
    summary: 'Designed modular UI design systems and real-time client dashboards in TypeScript & Tailwind.',
    highlight: 'Design Systems • Real-time Data',
  },
  {
    period: '2020 — 2022',
    role: 'Frontend Developer',
    company: 'Monochrome Interactive',
    summary: 'Built accessible web apps, interactive microsites, and reusable component libraries.',
    highlight: 'Accessible UI • State Management',
  },
];

const initialSkills = [
  { id: '1', name: 'Frontend Architecture', checked: true },
  { id: '2', name: 'Design Systems & Tokens', checked: true },
  { id: '3', name: 'Performance & Web Vitals', checked: true },
  { id: '4', name: 'TypeScript & React 18', checked: true },
  { id: '5', name: 'Astro & Static Generation', checked: true },
  { id: '6', name: 'Tactile UI / Micro-interactions', checked: true },
];

export const Experience: React.FC = () => {
  const [skills, setSkills] = useState(initialSkills);

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  return (
    <section id="experience" className="py-16 md:py-24 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Interactive Skills Checklist */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-sketch text-xs uppercase tracking-widest text-slate-500 font-bold">
                Page 02 // Capabilities
              </span>
              <DoodleStar size={14} color="#f59e0b" />
            </div>
            <div className="relative inline-block mb-4">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                Core Stack &amp; Skills
              </h2>
              <DoodleUnderline color="#f43f5e" className="absolute -bottom-2 left-0 w-full" />
            </div>
            
            <p className="font-hand text-base text-slate-600 mb-6">
              ✏️ <span className="font-bold">Interactive Checklist:</span> Click any skill to toggle checkmark!
            </p>

            {/* Clickable Hand-Drawn Checklist */}
            <div className="space-y-2.5">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/90 sketch-box-sm text-left hover:bg-yellow-50 hover:translate-x-1 transition-all group cursor-pointer"
                >
                  <div className="w-6 h-6 sketch-box-sm bg-white flex items-center justify-center border-slate-900 shrink-0">
                    <DoodleCheck checked={skill.checked} />
                  </div>
                  <span
                    className={`font-sketch text-sm font-bold text-slate-800 transition-all ${
                      skill.checked ? '' : 'text-slate-400 line-through'
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Note Quote */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <DoodleTape variant="yellow" className="w-16 h-4" />
            </div>
            <div className="bg-yellow-100 sketch-box p-4 rotate-[-1.5deg] doodle-shadow-sm">
              <p className="font-hand text-base text-slate-800 leading-snug">
                "Writing clean code is like good handwriting: it takes deliberate practice and clarity of thought."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Work Journal Timeline */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sketch text-xs uppercase tracking-widest text-slate-500 font-bold">
              Work Journal Timeline
            </span>
            <span className="font-hand text-sm text-slate-500">2020 — 2026</span>
          </div>

          <div className="space-y-5">
            {roles.map((item, index) => (
              <Card
                key={index}
                className="p-5 doodle-shadow-hover bg-white hover:bg-[#fffdfa]"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-1">
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {item.role}{' '}
                    <span className="font-hand text-base font-bold text-blue-600">
                      @ {item.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs font-semibold text-slate-500 marker-yellow px-1.5">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-sans mt-2 mb-3">
                  {item.summary}
                </p>
                <div className="pt-2 border-t border-dashed border-slate-200">
                  <span className="font-sketch text-xs text-slate-500 font-bold">
                    Highlights: <span className="text-slate-800">{item.highlight}</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
