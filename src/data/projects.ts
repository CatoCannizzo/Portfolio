export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  metrics?: string;
  tapeColor?: 'yellow' | 'blue' | 'pink' | 'green';
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
