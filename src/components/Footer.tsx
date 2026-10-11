import React from 'react';
import { Book } from '@matita/icons/react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-line-1 border-t-2 border-dashed border-slate-300 text-center text-0.375 text-slate-500">
      <div className="max-w-5xl mx-auto px-6 sm:pl-32 sm:pr-8 flex flex-col sm:flex-row items-center justify-between gap-line-0.5">
        <div className="flex items-center gap-2">
          <p className="font-sketch text-0.5">
            © {new Date().getFullYear()} Cato Cannizzo • All scribbles reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/test"
            className="font-sketch text-0.375 font-bold text-slate-600 hover:text-slate-900 bg-yellow-100 hover:bg-yellow-200 px-2 py-0.5 rounded sketch-box-sm transition-all"
          >
            Component Test Bench
          </a>
          <p className="font-hand text-0.5 text-slate-600 inline-flex items-center gap-1.5">
            <Book size={14} />
            <span>Crafted with care in Astro, React &amp; Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
