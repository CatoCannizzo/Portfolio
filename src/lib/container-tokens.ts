/**
 * Unified container design tokens for the notebook theme.
 * Shared across Card, Badge, StickyNoteStack, Highlight, and Fixture components.
 */

export type ContainerColor = 'yellow' | 'blue' | 'pink' | 'green' | 'paper' | 'white' | 'slate';
export type SketchBorderStyle = 'default' | 'thick' | 'sm' | 'dashed' | 'none';
export type DoodleShadowStyle = 'default' | 'sm' | 'lg' | 'hover' | 'paper' | 'none';

export interface ColorThemeTokens {
  bg: string;
  text: string;
  border: string;
  shadow: string;
  badgeBg: string;
  badgeText: string;
  layers: string[];
  tape: string;
  highlight: string;
}

export type TapeVariant = 'yellow' | 'blue' | 'pink' | 'green';

/**
 * Shared Washi Tape styling strings
 */
export const TAPE_STYLES: Record<TapeVariant, string> = {
  yellow: 'bg-yellow-200/85 border-l-2 border-r-2 border-dashed border-yellow-500/50 shadow-[0_1px_4px_rgba(0,0,0,0.14)]',
  blue: 'bg-sky-200/85 border-l-2 border-r-2 border-dashed border-sky-500/50 shadow-[0_1px_4px_rgba(0,0,0,0.14)]',
  pink: 'bg-rose-200/85 border-l-2 border-r-2 border-dashed border-rose-400/50 shadow-[0_1px_4px_rgba(0,0,0,0.14)]',
  green: 'bg-emerald-200/85 border-l-2 border-r-2 border-dashed border-emerald-400/50 shadow-[0_1px_4px_rgba(0,0,0,0.14)]',
};

export const CONTAINER_COLORS: Record<ContainerColor, ColorThemeTokens> = {
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-slate-900',
    border: 'border-slate-800',
    shadow: 'shadow-[2px_3px_0px_0px_rgba(30,41,59,0.85)]',
    badgeBg: 'bg-yellow-200',
    badgeText: 'text-slate-900',
    layers: ['bg-yellow-200/90', 'bg-yellow-100/90', 'bg-amber-100/80', 'bg-yellow-200/70'],
    tape: TAPE_STYLES.yellow,
    highlight: 'marker-yellow',
  },
  blue: {
    bg: 'bg-sky-100',
    text: 'text-slate-900',
    border: 'border-slate-800',
    shadow: 'shadow-[2px_3px_0px_0px_rgba(30,41,59,0.85)]',
    badgeBg: 'bg-sky-200',
    badgeText: 'text-slate-900',
    layers: ['bg-sky-200/90', 'bg-blue-100/90', 'bg-sky-200/80', 'bg-cyan-100/70'],
    tape: TAPE_STYLES.blue,
    highlight: 'marker-blue',
  },
  pink: {
    bg: 'bg-rose-100',
    text: 'text-slate-900',
    border: 'border-slate-800',
    shadow: 'shadow-[2px_3px_0px_0px_rgba(30,41,59,0.85)]',
    badgeBg: 'bg-rose-200',
    badgeText: 'text-slate-900',
    layers: ['bg-rose-200/90', 'bg-pink-100/90', 'bg-rose-200/80', 'bg-pink-200/70'],
    tape: TAPE_STYLES.pink,
    highlight: 'marker-pink',
  },
  green: {
    bg: 'bg-emerald-100',
    text: 'text-slate-900',
    border: 'border-slate-800',
    shadow: 'shadow-[2px_3px_0px_0px_rgba(30,41,59,0.85)]',
    badgeBg: 'bg-emerald-200',
    badgeText: 'text-slate-900',
    layers: ['bg-emerald-200/90', 'bg-green-100/90', 'bg-emerald-200/80', 'bg-teal-100/70'],
    tape: TAPE_STYLES.green,
    highlight: 'marker-green',
  },
  paper: {
    bg: 'bg-[#fffdf9]',
    text: 'text-slate-900',
    border: 'border-slate-800',
    shadow: 'shadow-[2px_3px_0px_0px_rgba(30,41,59,0.85)]',
    badgeBg: 'bg-[#f6f2e8]',
    badgeText: 'text-slate-900',
    layers: ['bg-[#f6f2e8]', 'bg-[#ede7d8]', 'bg-[#f6f2e8]', 'bg-[#e2dcd0]'],
    tape: TAPE_STYLES.yellow,
    highlight: 'marker-yellow',
  },
  white: {
    bg: 'bg-white',
    text: 'text-slate-900',
    border: 'border-slate-800',
    shadow: 'doodle-shadow',
    badgeBg: 'bg-white',
    badgeText: 'text-slate-800',
    layers: ['bg-slate-50', 'bg-slate-100', 'bg-slate-50', 'bg-slate-100'],
    tape: TAPE_STYLES.yellow,
    highlight: 'marker-yellow',
  },
  slate: {
    bg: 'bg-slate-900',
    text: 'text-white',
    border: 'border-slate-900',
    shadow: 'doodle-shadow',
    badgeBg: 'bg-slate-900',
    badgeText: 'text-white',
    layers: ['bg-slate-800', 'bg-slate-700', 'bg-slate-800', 'bg-slate-900'],
    tape: TAPE_STYLES.yellow,
    highlight: 'marker-yellow',
  },
};

/**
 * Shared sketch border class mappings
 */
export const SKETCH_BORDERS: Record<SketchBorderStyle, string> = {
  default: 'sketch-box',
  thick: 'sketch-box-thick',
  sm: 'sketch-box-sm',
  dashed: 'sketch-box-dashed',
  none: 'border-0',
};

/**
 * Shared doodle shadow class mappings
 */
export const DOODLE_SHADOWS: Record<DoodleShadowStyle, string> = {
  default: 'doodle-shadow',
  sm: 'doodle-shadow-sm',
  lg: 'doodle-shadow-lg',
  hover: 'doodle-shadow-hover',
  paper: 'shadow-paper-shadow',
  none: 'shadow-none',
};

/**
 * Preset offsets and rotations for underlying paper layers (1 to 5 stack count)
 */
export const STACK_LAYER_CONFIGS = [
  // Layer 1 (deepest layer in a 5-stack)
  { rotate: -4.5, x: -5, y: 5, zIndex: 1 },
  // Layer 2
  { rotate: 3.5, x: 4, y: 3.5, zIndex: 2 },
  // Layer 3
  { rotate: -2.2, x: -3, y: 2.5, zIndex: 3 },
  // Layer 4 (just beneath top note)
  { rotate: 2.0, x: 2, y: 1.5, zIndex: 4 },
];
