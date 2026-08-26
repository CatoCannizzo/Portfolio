import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

export type MarkerColor = 'yellow' | 'blue' | 'pink' | 'green';
export type MarkerTiltPreset =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | 'straight'
  | 'vertical'
  | 'reverse'
  | 'tall'
  | 'slim'
  | 'diamond'
  | 'wild'
  | 'random';

export interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: MarkerColor;
  tilt?: MarkerTiltPreset | number;
  skew?: number;
  opacity?: number;
  className?: string;
  children: React.ReactNode;
}

// 8 Extreme Presets for deterministic random distribution (centered lower & shorter)
const RANDOM_PRESETS = [
  { rot: -3.5, skew: -16, top: '20%', bottom: '-3px', left: '-5px', right: '-5px', radius: '2px 8px 3px 10px' }, // 1. Heavy classic chisel
  { rot: 3.0, skew: 16, top: '24%', bottom: '-2px', left: '-5px', right: '-5px', radius: '10px 2px 8px 3px' },   // 2. Reversed angle
  { rot: 0, skew: 0, top: '26%', bottom: '-2px', left: '-3px', right: '-3px', radius: '1px 1px 2px 2px' },         // 3. Straight vertical
  { rot: -2.0, skew: -25, top: '22%', bottom: '-3px', left: '-8px', right: '-8px', radius: '1px 14px 2px 12px' }, // 4. Extreme acute diamond
  { rot: 1.2, skew: -8, top: '10%', bottom: '-5px', left: '-6px', right: '-6px', radius: '6px 5px 7px 5px' },     // 5. Extra tall juicy block
  { rot: -1.2, skew: -14, top: '55%', bottom: '-3px', left: '-4px', right: '-4px', radius: '2px 5px 2px 4px' },     // 6. Slim lower underline
  { rot: 4.8, skew: 14, top: '22%', bottom: '-3px', left: '-6px', right: '-6px', radius: '8px 2px 10px 2px' },   // 7. Steep downward reverse
  { rot: -5.5, skew: -22, top: '18%', bottom: '-3px', left: '-8px', right: '-8px', radius: '2px 14px 2px 15px' }, // 8. Steep upward slash
];

export const Highlight: React.FC<HighlightProps> = ({
  color = 'yellow',
  tilt,
  skew,
  opacity,
  className,
  style,
  children,
  ...props
}) => {
  const customStyles = useMemo(() => {
    const s: React.CSSProperties = { ...style };

    if (typeof opacity === 'number') {
      (s as any)['--marker-opacity'] = opacity;
    }
    if (typeof tilt === 'number') {
      (s as any)['--marker-rot'] = `${tilt}deg`;
    }
    if (typeof skew === 'number') {
      (s as any)['--marker-skew'] = `${skew}deg`;
    }

    if (tilt === 'random') {
      // Generate a stable hash based on text content to prevent SSR / hydration shifts
      const str = typeof children === 'string' ? children : String(children ?? '');
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      const preset = RANDOM_PRESETS[Math.abs(hash) % RANDOM_PRESETS.length];
      (s as any)['--marker-rot'] = `${preset.rot}deg`;
      (s as any)['--marker-skew'] = `${preset.skew}deg`;
      (s as any)['--marker-inset-top'] = preset.top;
      (s as any)['--marker-inset-bottom'] = preset.bottom;
      (s as any)['--marker-inset-left'] = preset.left;
      (s as any)['--marker-inset-right'] = preset.right;
      (s as any)['--marker-radius'] = preset.radius;
    }

    return s;
  }, [tilt, skew, children, style]);

  const tiltClass =
    typeof tilt === 'string' && tilt !== 'random'
      ? `marker-tilt-${tilt}`
      : '';

  const colorClass = `marker-${color}`;

  return (
    <span
      className={cn(colorClass, tiltClass, className)}
      style={customStyles}
      {...props}
    >
      {children}
    </span>
  );
};
