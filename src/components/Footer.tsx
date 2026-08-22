import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-line-1 border-t-2 border-dashed border-slate-300 text-center text-0.375 text-slate-500">
      <div className="max-w-5xl mx-auto px-6 sm:pl-32 sm:pr-8 flex flex-col sm:flex-row items-center justify-between gap-line-0.5">
        <div className="flex items-center gap-2">
          <p className="font-sketch text-0.5">
            © {new Date().getFullYear()} Alex Morgan • All scribbles reserved.
          </p>
        </div>
        <p className="font-hand text-0.5 text-slate-600">
          📓 Hand-crafted with Astro, React &amp; Tailwind
        </p>
      </div>
    </footer>
  );
};
