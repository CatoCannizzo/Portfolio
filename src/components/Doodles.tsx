import React from 'react';
import { cn } from '@/lib/utils';

// Hand-drawn circle loop paths generator based on loop count (1, 2, 3, or 4 loops)
const CIRCLE_LOOPS: Record<number, string> = {
  1: 'M 28 50 C 24 20, 56 10, 100 12 C 148 14, 184 26, 178 54 C 172 82, 132 90, 92 86 C 46 82, 16 66, 24 44',
  2: 'M 28 50 C 24 20, 56 10, 100 12 C 148 14, 184 26, 178 54 C 172 82, 132 90, 92 86 C 46 82, 16 66, 22 40 C 28 18, 62 12, 108 14 C 156 16, 186 32, 180 58 C 174 84, 126 92, 78 86 C 36 82, 16 62, 24 44',
  3: 'M 28 50 C 24 20, 56 10, 100 12 C 148 14, 184 26, 178 54 C 172 82, 132 90, 92 86 C 46 82, 16 66, 22 40 C 28 18, 62 12, 108 14 C 156 16, 186 32, 180 58 C 174 84, 126 92, 84 88 C 36 84, 14 62, 20 36 C 26 14, 68 8, 114 10 C 162 12, 188 30, 182 56 C 176 80, 124 88, 76 84 C 38 80, 18 62, 24 44',
  4: 'M 28 50 C 24 20, 56 10, 100 12 C 148 14, 184 26, 178 54 C 172 82, 132 90, 92 86 C 46 82, 16 66, 22 40 C 28 18, 62 12, 108 14 C 156 16, 186 32, 180 58 C 174 84, 126 92, 84 88 C 36 84, 14 62, 20 36 C 26 14, 68 8, 114 10 C 162 12, 188 30, 182 56 C 176 80, 124 88, 76 84 C 38 80, 18 62, 24 44 C 30 20, 72 12, 118 14 C 166 16, 190 34, 184 60 C 176 84, 120 90, 72 84 C 32 80, 16 58, 26 40',
};

// Hand-drawn squiggly underline paths generator based on line count (1, 2, or 3 lines)
const UNDERLINE_LINES: Record<number, string> = {
  1: 'M3 12 C30 16, 60 7, 90 13 C120 19, 150 9, 197 14',
  2: 'M3 12 C30 16, 60 7, 90 13 C120 19, 150 9, 197 14 M5 16 C35 19, 65 11, 100 16 C135 21, 165 12, 192 17',
  3: 'M3 10 C30 14, 60 5, 90 11 C120 17, 150 7, 197 12 M5 14 C35 17, 65 9, 100 14 C135 19, 165 10, 192 15 M4 18 C32 20, 68 13, 105 18 C140 22, 170 14, 195 18',
};

// Hand-drawn sketchy circle that loops around content with natural organic jitter
export const DoodleCircle: React.FC<{
  className?: string;
  color?: string;
  animate?: boolean;
  delay?: number | string;
  loops?: 1 | 2 | 3 | 4;
  strokeWidth?: number | string;
}> = ({
  className,
  color = '#f43f5e',
  animate = true,
  delay = '1s',
  loops = 3,
  strokeWidth = '3',
}) => {
  const pathD = CIRCLE_LOOPS[loops] || CIRCLE_LOOPS[3];
  const delayStr = typeof delay === 'number' ? `${delay}s` : delay;

  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={cn(
        'absolute pointer-events-none -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] overflow-visible z-10',
        className
      )}
      style={{
        '--animation-delay': delayStr,
      } as React.CSSProperties}
    >
      <path
        d={pathD}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className={animate ? 'scribble-animate' : ''}
      />
    </svg>
  );
};

// Hand-drawn squiggly underline
export const DoodleUnderline: React.FC<{
  className?: string;
  color?: string;
  width?: number;
  animate?: boolean;
  delay?: number | string;
  lines?: 1 | 2 | 3;
}> = ({ className, color = '#f43f5e', animate = true, delay = '1s', lines = 2 }) => {
  const pathD = UNDERLINE_LINES[lines] || UNDERLINE_LINES[2];
  const delayStr = typeof delay === 'number' ? `${delay}s` : delay;

  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-4 overflow-visible', className)}
      preserveAspectRatio="none"
      style={{
        '--animation-delay': delayStr,
      } as React.CSSProperties}
    >
      <path
        d={pathD}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className={animate ? 'scribble-animate' : ''}
      />
    </svg>
  );
};

// Hand-drawn curved arrow
export const DoodleArrow: React.FC<{
  className?: string;
  color?: string;
  delay?: number | string;
}> = ({ className, color = '#1e293b', delay = '1s' }) => {
  const delayStr = typeof delay === 'number' ? `${delay}s` : delay;

  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-16 h-12 overflow-visible pointer-events-none', className)}
      style={{
        '--animation-delay': delayStr,
      } as React.CSSProperties}
    >
      <path
        d="M10 50 C25 48, 55 45, 65 20 C68 12, 60 8, 52 14"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M48 20 L68 15 L66 32"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// Hand-drawn Scribble Checkmark
export const DoodleCheck: React.FC<{
  className?: string;
  checked?: boolean;
  animate?: boolean;
  delay?: number | string;
}> = ({ className, checked = true, animate = true, delay = '0.3s' }) => {
  if (!checked) return null;
  const delayStr = typeof delay === 'number' ? `${delay}s` : delay;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-5 h-5 overflow-visible', className)}
      style={{
        '--animation-delay': delayStr,
      } as React.CSSProperties}
    >
      <path
        d="M4 12 L9 18 L20 6 M9 18 L19 8"
        stroke="#16a34a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className={animate ? 'scribble-animate' : ''}
      />
    </svg>
  );
};


