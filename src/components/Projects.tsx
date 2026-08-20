import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  metrics?: string;
  link: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Aura Design System',
    category: 'Component Library',
    description: 'A ultra-lightweight glassmorphic component framework for React and Astro apps.',
    details: 'Designed and built an enterprise-grade component library emphasizing light-mode glassmorphism, accessibility (WCAG AAA), and zero-runtime CSS overhead.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    metrics: '99/100 Lighthouse score',
    link: 'https://github.com',
  },
  {
    id: '2',
    title: 'Vortex Analytics Engine',
    category: 'SaaS Dashboard',
    description: 'Real-time telemetry dashboard with minimal clutter and instant load times.',
    details: 'Architected data visualization widgets and real-time streaming charts with minimal icon clutter, focused on high visual clarity for financial metrics.',
    tags: ['Astro', 'React', 'WebSockets'],
    metrics: '< 100ms TTI',
    link: 'https://github.com',
  },
  {
    id: '3',
    title: 'Lumina Studio Workspace',
    category: 'Web Application',
    description: 'Minimalist Markdown editor and knowledge management workspace for creators.',
    details: 'Features distraction-free writing UI, offline storage via IndexedDB, and clean glass export previews.',
    tags: ['TypeScript', 'Astro', 'IndexedDB'],
    metrics: '15k active users',
    link: 'https://github.com',
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Featured Projects
          </h2>
        </div>
        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
          Focusing on performance, minimal UI aesthetics, and clean user experience.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer group flex flex-col justify-between"
            onClick={() => setSelectedProject(project)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400">
                  {project.category}
                </span>
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-900 transition-colors flex items-center gap-0.5">
                  Details <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <CardTitle className="mb-2 group-hover:text-slate-700 transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="mb-6">
                {project.description}
              </CardDescription>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/50">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="glass" className="text-[11px] px-2.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Interactive Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent>
            <DialogHeader>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                {selectedProject.category}
              </span>
              <DialogTitle className="text-2xl font-semibold text-slate-900 mb-2">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-base text-slate-600 mb-4">
                {selectedProject.details}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2">
              {selectedProject.metrics && (
                <div className="glass-panel p-3.5 rounded-xl border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Highlight Metric</span>
                  <span className="font-semibold text-slate-900">{selectedProject.metrics}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="glass" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200/60">
              <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
              <Button variant="default" size="sm" asChild>
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                  <span>Visit Project</span>
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};
