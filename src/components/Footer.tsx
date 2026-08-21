import React from 'react';
import { DoodleStar } from '@/components/Doodles';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 border-t-2 border-dashed border-slate-300 text-center text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-6 sm:pl-32 sm:pr-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <DoodleStar size={14} color="#f59e0b" />
          <p className="font-sketch text-sm">
            © {new Date().getFullYear()} Alex Morgan • All scribbles reserved.
          </p>
        </div>
        <p className="font-hand text-base text-slate-600">
          📓 Hand-crafted with Astro, React &amp; Tailwind
        </p>
      </div>
    </footer>
  );
};
