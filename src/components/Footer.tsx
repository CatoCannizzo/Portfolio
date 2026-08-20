import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 border-t border-slate-200/60 text-center text-xs text-slate-400">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Alex Morgan. All rights reserved.</p>
        <p className="font-mono text-[11px] text-slate-400">
          Light Mode • Glassmorphism • Astro &amp; React
        </p>
      </div>
    </footer>
  );
};
