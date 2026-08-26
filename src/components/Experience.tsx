import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { DoodleUnderline, DoodleCheck } from '@/components/Doodles';
import { Highlight } from '@/components/Highlight';
import { StickyNoteStack, StickyNotePage } from '@/components/StickyNoteStack';

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
    <section id="experience" className="py-line-2 md:py-line-3 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-line-1.5">
        {/* Left Column: Interactive Skills Checklist */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
<div className="flex items-end  gap-2 mb-line-0.5">
              <span className="font-sketch text-0.375 uppercase tracking-widest text-slate-500 font-bold align-to-rule">
                Page 02 // Capabilities
              </span>
            </div>
            <div className="relative inline-block mb-line-1">
              <h2 className="text-1 font-bold text-slate-900 tracking-tight font-sans mt-[-8px]">
                Core Stack &amp; Skills
              </h2>
              <DoodleUnderline color="#f43f5e" className="absolute -bottom-2 left-0 w-full" />
            </div>
            
            <p className="font-hand text-0.5 md:text-0.75 text-slate-600 mb-line-1 align-to-rule">
              ✏️ <span className="font-bold">Interactive Checklist:</span> Click any skill to toggle checkmark!
            </p>

            {/* Clickable Hand-Drawn Checklist */}
            <div className="space-y-line-0.5">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className="w-full flex items-center gap-3 px-3 py-line-0.25 rounded-lg bg-white/90 sketch-box-sm text-left hover:bg-yellow-50 hover:translate-x-1 transition-all group cursor-pointer"
                >
                  <div className="w-6 h-6 sketch-box-sm bg-white flex items-center justify-center border-slate-900 shrink-0">
                    <DoodleCheck checked={skill.checked} />
                  </div>
                  <span
                    className={`font-sketch text-0.5 font-bold text-slate-800 transition-all ${
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
          <div className="hidden md:block relative mt-line-1">
            <StickyNoteStack
              count={1}
              color="yellow"
              fixture="tape"
              tapeVariant="yellow"
              fixtureSize="sm"
              size="square"
              className="w-full rotate-[-1.5deg]"
            >
              <StickyNotePage>
                <p className="font-hand text-0.5 text-slate-800 align-to-rule">
                  "Writing clean code is like good handwriting: it takes deliberate practice and clarity of thought."
                </p>
              </StickyNotePage>
            </StickyNoteStack>
          </div>
        </div>

        {/* Right Column: Work Journal Timeline */}
        <div className="md:col-span-7">
          <div className="flex items-end justify-between mb-line-1">
            <span className="font-sketch text-0.375 uppercase tracking-widest text-slate-500 font-bold align-to-rule">
                 Work Journal Timeline
            </span>
            <span className="font-sketch text-0.375 text-slate-500 align-to-rule font-bold">2020 — 2026</span>
          </div>

          <div className="space-y-line-1">
            {roles.map((item, index) => (
              <Card
                key={index}
                variant="default"
                shadowStyle="hover"
                className="p-line-1 hover:bg-[#fffdfa]"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-line-0.25 gap-1">
                  <h3 className="text-0.5 font-bold text-slate-900 font-sans align-to-rule">
                    {item.role}{' '}
                    <span className="font-hand text-0.5 font-bold text-blue-600 align-to-rule">
                      @ {item.company}
                    </span>
                  </h3>
                  <span className="font-mono text-0.375 font-semibold text-slate-500">
                    <Highlight color="yellow" tilt="straight">
                      {item.period}
                    </Highlight>
                  </span>
                </div>
                <p className="text-0.5 text-slate-600 font-sans mt-line-0.25 mb-line-0.5 align-to-rule">
                  {item.summary}
                </p>
                <div className="pt-line-0.5 border-t border-dashed border-slate-200">
                  <span className="font-sketch text-0.375 text-slate-500 font-bold">
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
