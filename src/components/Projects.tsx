import React, { useState } from 'react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DoodleUnderline, DoodleTape } from '@/components/Doodles';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { DoodleCircle } from '@/components/Doodles';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  metrics?: string;
  tapeColor?: 'yellow' | 'blue' | 'pink';
  rotationClass?: string;
  link: string;
}

export const projectsData: Project[] = [
  {
    id: '1',
    slug: 'aura-design-system',
    title: 'Aura Design System',
    category: 'Component Library',
    description: 'A tactile lightweight hand-crafted UI system for React & Astro applications.',
    details: 'Designed and engineered an accessible component system emphasizing tactile paper aesthetics, low runtime CSS overhead, and intuitive token hierarchy.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    metrics: '99/100 Lighthouse score',
    tapeColor: 'yellow',
    rotationClass: 'rotate-[-1deg] hover:rotate-0',
    link: 'https://github.com',
  },
  {
    id: '2',
    slug: 'vortex-analytics',
    title: 'Vortex Analytics Engine',
    category: 'SaaS Telemetry',
    description: 'High-frequency telemetry dashboard with minimal clutter and instant load times.',
    details: 'Architected real-time streaming charts and lightweight metric cards, cutting rendering overhead by 40% using WebSockets and virtualized grids.',
    tags: ['Astro', 'React', 'WebSockets'],
    metrics: '< 100ms TTI',
    tapeColor: 'blue',
    rotationClass: 'rotate-[1deg] hover:rotate-0',
    link: 'https://github.com',
  },
  {
    id: '3',
    slug: 'lumina-studio',
    title: 'Lumina Studio Workspace',
    category: 'Notes & Web App',
    description: 'Minimalist Markdown notepad and knowledge workspace for creators.',
    details: 'Features distraction-free editor, offline local-first sync via IndexedDB, and clean export mechanisms with typography presets.',
    tags: ['TypeScript', 'Astro', 'IndexedDB'],
    metrics: '15k active users',
    tapeColor: 'pink',
    rotationClass: 'rotate-[-0.5deg] hover:rotate-0',
    link: 'https://github.com',
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-line-2 md:py-line-3 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-line-1.5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-line-0.5">
            
            <span className="font-sketch text-0.375 uppercase tracking-widest text-slate-500 font-bold">
              Folder 01 // Selected Work
            </span>
          </div>
          <div className="relative inline-block">
            <DoodleCircle color="#f43f5e" />
            <h2 className="text-1 font-bold text-slate-900 tracking-tight font-sans">
              Featured Projects
            </h2>
            <DoodleUnderline color="#3b82f6" className="absolute -bottom-2 left-0 w-full" />
          </div>
        </div>
        <p className="font-hand text-0.5 text-slate-600 max-w-xs">
          📌 "Click any project card to preview or open full case study template!"
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-line-1 pt-line-0.5">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className={`relative group transition-all duration-300 ${project.rotationClass}`}
          >
            {/* Top Washi Tape Sticker on Card */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
              <DoodleTape variant={project.tapeColor} className="w-20 h-5" />
            </div>

            <Card className="h-full flex flex-col justify-between doodle-shadow-hover hover:border-slate-900 bg-white">
              <div
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center justify-between mb-line-0.5 pt-2">
                  <span className="font-sketch text-0.375 font-bold text-slate-500">
                    {project.category}
                  </span>
                  <span className="font-sketch text-0.375 font-bold text-slate-500 group-hover:text-slate-900 flex items-center gap-0.5">
                    Quick View <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
                <CardTitle className="mb-line-0.5 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="mb-line-1 font-sans">
                  {project.description}
                </CardDescription>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-line-0.5 border-t border-dashed border-slate-300 mb-line-0.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        project.tapeColor === 'blue'
                          ? 'blue'
                          : project.tapeColor === 'pink'
                          ? 'pink'
                          : 'yellow'
                      }
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Direct Link to Project Template Page */}
                <a
                  href={`/projects/${project.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-yellow-100 hover:bg-yellow-200 sketch-box-sm font-sketch text-0.375 font-bold text-slate-900 hover:rotate-[-0.5deg] transition-all"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Open Page Notes (Crumple) →</span>
                </a>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Interactive Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-sketch text-0.375 font-bold uppercase tracking-wider text-slate-500">
                  {selectedProject.category}
                </span>
                <span className="font-hand text-0.5 text-rose-500 font-bold">• Project Notes</span>
              </div>
              <DialogTitle className="text-1 font-bold text-slate-900 mb-2 font-sans">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-0.5 text-slate-700 mb-4 font-sans">
                {selectedProject.details}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2">
              {selectedProject.metrics && (
                <div className="bg-yellow-50 sketch-box-sm p-3.5 flex items-center justify-between text-0.375">
                  <span className="font-sketch font-bold text-slate-600">Metric Highlight</span>
                  <span className="font-mono font-bold text-slate-900 marker-yellow px-2 py-0.5">
                    {selectedProject.metrics}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="yellow">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-3 border-t border-dashed border-slate-300">
              <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)} className="font-sketch text-0.5">
                Close
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="doodle" size="sm" asChild className="font-sketch text-0.5">
                  <a href={`/projects/${selectedProject.slug}`} className="flex items-center gap-1.5">
                    <span>Full Case Study Page</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};
