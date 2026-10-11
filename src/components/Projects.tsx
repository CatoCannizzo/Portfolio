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
import { DoodleUnderline } from '@/components/Doodles';
import { ArrowUpRight } from '@matita/icons/react';
import { projectsData, type Project } from '@/data/projects';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-line-2 md:py-line-3 px-6 sm:pl-32 sm:pr-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-line-1">
        <div className="flex items-center gap-2 mt-[16px]">
          <span className="font-sketch text-0.375 uppercase tracking-widest text-slate-500 font-bold">
            Folder 01 // Selected Work
          </span>
        </div>
        <div className="relative inline-block mb-line-1">
          <h2 className="text-1 font-bold text-slate-900 tracking-tight font-sans">
            Featured Projects
          </h2>
          <DoodleUnderline color="#3b82f6" className="absolute -bottom-2 left-0 w-full" />
        </div>
        <p className="font-hand text-0.5 md:text-0.75 text-slate-600 max-w-2xl align-to-rule">
          Click any project card open full case study!"
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-line-1">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className={`relative group transition-all duration-300 ${project.rotationClass}`}
          >
            <Card
              variant="default"
              shadowStyle="hover"
              fixture="tape"
              fixtureProps={{ tapeVariant: project.tapeColor }}
              className="h-full flex flex-col justify-between hover:border-slate-900"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center justify-between mb-line-0.5 pt-2">
                  <span className="font-sketch text-0.375 font-bold text-slate-500">
                    {project.category}
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
                <Button
                  variant="yellow"
                  size="sm"
                  asChild
                  className="w-full font-sketch text-0.375 font-bold text-slate-900 hover:rotate-[-0.5deg]"
                >
                  <a
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <span>Open Case Study</span>
                    <ArrowUpRight size={14} />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

          </section>
  );
};
