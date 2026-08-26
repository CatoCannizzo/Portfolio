import React from 'react';
import { cn } from '@/lib/utils';
import { TAPE_STYLES, type TapeVariant } from '@/lib/container-tokens';

export type FixtureType =
  | 'none'
  | 'pin'
  | 'staple'
  | 'tape'
  | 'tape-corners'
  | 'corner-tape'
  | 'tape-4-corners'
  | 'four-corners'
  | 'paperclip';

export type PinColor = 'rose' | 'red' | 'blue' | 'yellow' | 'green' | 'slate';
export type PinPosition = 'top-middle' | 'top-left' | 'top-right';

export type StaplePosition =
  | 'top-middle'
  | 'top-left'
  | 'top-right'
  | 'diagonal-left'
  | 'diagonal-right';

export type { TapeVariant };
export type TapePosition = 'top-middle' | 'top-left' | 'top-right';
export type CornerTapeOrientation =
  | 'top-left-bottom-right'
  | 'top-right-bottom-left'
  | 'all'
  | 'all-four'
  | 'four-corners';
export type PaperclipPosition = 'top-right' | 'top-left' | 'top-middle';

export type FixtureSize = 'default' | 'sm' | 'xs' | 'lg';

export interface PushPinProps {
  color?: PinColor;
  position?: PinPosition;
  size?: FixtureSize;
  className?: string;
}

export interface StapleProps {
  position?: StaplePosition;
  angle?: number;
  size?: FixtureSize;
  className?: string;
}

export interface TapeProps {
  variant?: TapeVariant;
  position?: TapePosition;
  angle?: number;
  size?: FixtureSize;
  className?: string;
}

export interface CornerTapeProps {
  variant?: TapeVariant;
  orientation?: CornerTapeOrientation;
  size?: FixtureSize;
  className?: string;
}

export interface PaperclipProps {
  position?: PaperclipPosition;
  size?: FixtureSize;
  angle?: number;
  part?: 'all' | 'front' | 'back';
  className?: string;
}

export interface FixtureProps {
  type?: FixtureType;
  pinColor?: PinColor;
  pinPosition?: PinPosition;
  staplePosition?: StaplePosition;
  stapleAngle?: number;
  tapeVariant?: TapeVariant;
  tapePosition?: TapePosition;
  tapeAngle?: number;
  cornerOrientation?: CornerTapeOrientation;
  paperclipPosition?: PaperclipPosition;
  paperclipAngle?: number;
  size?: FixtureSize;
  className?: string;
}

// Pin color presets
const PIN_COLORS: Record<
  PinColor,
  {
    head: string;
    ring: string;
    dot: string;
  }
> = {
  rose: { head: 'bg-rose-500', ring: 'border-rose-700', dot: 'bg-rose-300' },
  red: { head: 'bg-red-500', ring: 'border-red-700', dot: 'bg-red-300' },
  blue: { head: 'bg-sky-500', ring: 'border-sky-700', dot: 'bg-sky-300' },
  yellow: { head: 'bg-amber-400', ring: 'border-amber-600', dot: 'bg-amber-200' },
  green: { head: 'bg-emerald-500', ring: 'border-emerald-700', dot: 'bg-emerald-300' },
  slate: { head: 'bg-slate-700', ring: 'border-slate-900', dot: 'bg-slate-400' },
};

/**
 * Hand-drawn 3D Pushpin Component
 */
export const PushPin: React.FC<PushPinProps> = ({
  color = 'rose',
  position = 'top-middle',
  size = 'default',
  className,
}) => {
  const pinStyle = PIN_COLORS[color] || PIN_COLORS.rose;
  const isXs = size === 'xs';
  const isSm = size === 'sm';

  const positionClasses: Record<PinPosition, string> = {
    'top-middle': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-left': isXs ? 'top-0 left-2 -translate-y-1/2' : isSm ? 'top-0 left-3 -translate-y-1/2' : 'top-0 left-6 -translate-y-1/2',
    'top-right': isXs ? 'top-0 right-2 -translate-y-1/2' : isSm ? 'top-0 right-3 -translate-y-1/2' : 'top-0 right-6 -translate-y-1/2',
  };

  return (
    <div
      className={cn(
        'absolute z-30 pointer-events-none select-none flex flex-col items-center',
        positionClasses[position] || positionClasses['top-middle'],
        className
      )}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Needle puncture shadow */}
        <div
          className={cn(
            'absolute bg-slate-900/40 rounded-full blur-[0.5px]',
            isXs ? 'top-2.5 w-1 h-0.5' : isSm ? 'top-3 w-1.5 h-0.5' : 'top-4 w-2 h-1'
          )}
        />

        {/* Pushpin Head */}
        <div
          className={cn(
            'rounded-full border-[1.5px] border-slate-900 shadow-[1px_2px_0px_0px_#1e293b] flex items-center justify-center transition-transform hover:scale-110',
            isXs ? 'w-2.5 h-2.5' : isSm ? 'w-3 h-3' : 'w-4 h-4',
            pinStyle.head
          )}
        >
          {/* Highlight glare */}
          <div
            className={cn(
              'rounded-full bg-white/70 absolute',
              isXs ? 'w-0.5 h-0.5 top-[1px] left-[1px]' : isSm ? 'w-1 h-1 top-0.5 left-0.5' : 'w-1.5 h-1.5 top-0.5 left-0.5'
            )}
          />
          {/* Center metallic thumbtack core */}
          <div
            className={cn(
              'rounded-full bg-slate-900/30',
              isXs ? 'w-0.5 h-0.5' : isSm ? 'w-0.5 h-0.5' : 'w-1 h-1'
            )}
          />
        </div>

        {/* Angled needle point going into paper */}
        <div
          className={cn(
            'absolute bg-slate-700 rounded-b-sm rotate-[-12deg] z-[-1]',
            isXs ? '-bottom-0.5 w-[1px] h-1' : isSm ? '-bottom-1 w-[1.5px] h-1.5' : '-bottom-1.5 w-[2px] h-2'
          )}
        />
      </div>
    </div>
  );
};

/**
 * Tactile Metallic Staple Component
 */
export const Staple: React.FC<StapleProps> = ({
  position = 'top-middle',
  angle,
  size = 'default',
  className,
}) => {
  const isXs = size === 'xs';
  const isSm = size === 'sm';

  const positionClasses: Record<StaplePosition, string> = {
    'top-middle': isXs ? 'top-1 left-1/2 -translate-x-1/2' : isSm ? 'top-1.5 left-1/2 -translate-x-1/2' : 'top-2.5 left-1/2 -translate-x-1/2',
    'top-left': isXs ? 'top-1 left-1.5' : isSm ? 'top-1.5 left-2.5' : 'top-3.5 left-4',
    'top-right': isXs ? 'top-1 right-1.5' : isSm ? 'top-1.5 right-2.5' : 'top-3.5 right-4',
    'diagonal-left': isXs ? 'top-1 left-1.5 rotate-[-35deg]' : isSm ? 'top-1.5 left-2 rotate-[-35deg]' : 'top-3.5 left-3.5 rotate-[-35deg]',
    'diagonal-right': isXs ? 'top-1 right-1.5 rotate-[35deg]' : isSm ? 'top-1.5 right-2 rotate-[35deg]' : 'top-3.5 right-3.5 rotate-[35deg]',
  };

  const transformStyle = angle !== undefined ? { transform: `rotate(${angle}deg)` } : undefined;
  const width = isXs ? 14 : isSm ? 20 : 28;
  const height = isXs ? 3 : isSm ? 4 : 6;

  return (
    <div
      className={cn(
        'absolute z-30 pointer-events-none select-none flex items-center justify-center',
        positionClasses[position] || positionClasses['top-middle'],
        className
      )}
      style={transformStyle}
      aria-hidden="true"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 28 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="stapleSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="12%" stopColor="#334155" />
            <stop offset="35%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="65%" stopColor="#64748b" />
            <stop offset="88%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Paper puncture slits */}
        <ellipse cx="2" cy="4.5" rx="1.1" ry="0.7" fill="#0f172a" opacity="0.9" />
        <ellipse cx="26" cy="4.5" rx="1.1" ry="0.7" fill="#0f172a" opacity="0.9" />

        {/* Wire shadow */}
        <path
          d="M 2 4.5 L 2.5 2.2 C 6 1.6, 10 1.6, 14 2.4 C 18 1.6, 22 1.6, 25.5 2.2 L 26 4.5"
          stroke="#0f172a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
          transform="translate(0, 0.5)"
        />

        {/* Metallic Wire */}
        <path
          d="M 2 4.5 L 2.5 2.2 C 6 1.6, 10 1.6, 14 2.4 C 18 1.6, 22 1.6, 25.5 2.2 L 26 4.5"
          stroke="url(#stapleSteelGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/**
 * Hand-drawn Washi Tape Strip Component
 */
export const Tape: React.FC<TapeProps> = ({
  variant = 'yellow',
  position = 'top-middle',
  angle,
  size = 'default',
  className,
}) => {
  const defaultRotations: Record<TapeVariant, number> = {
    yellow: -2,
    blue: 1.5,
    pink: -1.5,
    green: 1.2,
  };

  const sizeClasses = {
    xs: 'h-3 w-10',
    sm: 'h-4 w-16',
    default: 'h-6 w-24',
    lg: 'h-7 w-32',
  };

  const isXs = size === 'xs';
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const positionClasses: Record<TapePosition, string> = {
    'top-middle': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-left': isXs
      ? 'top-0 left-3 -translate-x-1/2 -translate-y-1/2'
      : isSm
        ? 'top-0 left-4 -translate-x-1/2 -translate-y-1/2'
        : isLg
          ? 'top-0 left-10 -translate-x-1/2 -translate-y-1/2'
          : 'top-0 left-8 -translate-x-1/2 -translate-y-1/2',
    'top-right': isXs
      ? 'top-0 right-3 translate-x-1/2 -translate-y-1/2'
      : isSm
        ? 'top-0 right-4 translate-x-1/2 -translate-y-1/2'
        : isLg
          ? 'top-0 right-10 translate-x-1/2 -translate-y-1/2'
          : 'top-0 right-8 translate-x-1/2 -translate-y-1/2',
  };

  const rotAngle = angle !== undefined ? angle : defaultRotations[variant] ?? -1.5;

  return (
    <div
      className={cn(
        'absolute z-20 pointer-events-none select-none flex items-center justify-center',
        positionClasses[position] || positionClasses['top-middle'],
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'rounded-[1px] opacity-90 transition-transform duration-200 block',
          TAPE_STYLES[variant] || TAPE_STYLES.yellow,
          sizeClasses[size] || sizeClasses.default
        )}
        style={{ transform: `rotate(${rotAngle}deg)` }}
      />
    </div>
  );
};

/**
 * Corner Tape Component
 * Renders washi tape strips spanning two opposite corners of a card or container
 * using centroid geometric anchoring to eliminate corner drift across all sizes.
 */
export const CornerTape: React.FC<CornerTapeProps> = ({
  variant = 'yellow',
  orientation = 'top-left-bottom-right',
  size = 'default',
  className,
}) => {
  const sizeClasses = {
    xs: 'h-3 w-10',
    sm: 'h-4 w-14',
    default: 'h-6 w-24',
    lg: 'h-7 w-32',
  };

  const baseTape = cn(
    'rounded-[1px] opacity-90 transition-transform duration-200 block',
    TAPE_STYLES[variant] || TAPE_STYLES.yellow,
    sizeClasses[size] || sizeClasses.default,
    className
  );

  const topLeft = (
    <div
      key="top-left"
      className="absolute z-20 pointer-events-none select-none top-0 left-0"
      aria-hidden="true"
    >
      <div className={cn(baseTape, '-translate-x-[25%] -translate-y-[25%] rotate-[-38deg]')} />
    </div>
  );

  const topRight = (
    <div
      key="top-right"
      className="absolute z-20 pointer-events-none select-none top-0 right-0"
      aria-hidden="true"
    >
      <div className={cn(baseTape, 'translate-x-[25%] -translate-y-[25%] rotate-[38deg]')} />
    </div>
  );

  const bottomLeft = (
    <div
      key="bottom-left"
      className="absolute z-20 pointer-events-none select-none bottom-0 left-0"
      aria-hidden="true"
    >
      <div className={cn(baseTape, '-translate-x-[25%] translate-y-[25%] rotate-[38deg]')} />
    </div>
  );

  const bottomRight = (
    <div
      key="bottom-right"
      className="absolute z-20 pointer-events-none select-none bottom-0 right-0"
      aria-hidden="true"
    >
      <div className={cn(baseTape, 'translate-x-[25%] translate-y-[25%] rotate-[-38deg]')} />
    </div>
  );

  if (orientation === 'all' || orientation === 'all-four' || orientation === 'four-corners') {
    return (
      <>
        {topLeft}
        {topRight}
        {bottomLeft}
        {bottomRight}
      </>
    );
  }

  if (orientation === 'top-right-bottom-left') {
    return (
      <>
        {topRight}
        {bottomLeft}
      </>
    );
  }

  // Default: 'top-left-bottom-right'
  return (
    <>
      {topLeft}
      {bottomRight}
    </>
  );
};

/**
 * Tactile Metallic Paperclip Component
 * Split into two parts at the apex of the top "n" curve:
 * - Right/Back component (z-0): Low z-index, extends down behind the container.
 * - Left/Front component (z-20): High z-index, hangs down across the front face of the container.
 * - The apex of the "n" curve is positioned safely at the top paper edge.
 */
export const Paperclip: React.FC<PaperclipProps> = ({
  position = 'top-right',
  size = 'default',
  angle,
  part = 'all',
  className,
}) => {
  const isXs = size === 'xs';
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const positionClasses: Record<PaperclipPosition, string> = {
    'top-right': isXs
      ? '-top-[9px] right-2'
      : isSm
        ? '-top-[13px] right-3'
        : isLg
          ? '-top-[21px] right-6'
          : '-top-[18px] right-5',
    'top-left': isXs
      ? '-top-[9px] left-2'
      : isSm
        ? '-top-[13px] left-3'
        : isLg
          ? '-top-[21px] left-6'
          : '-top-[18px] left-5',
    'top-middle': isXs
      ? '-top-[9px] left-1/2 -translate-x-1/2'
      : isSm
        ? '-top-[13px] left-1/2 -translate-x-1/2'
        : isLg
          ? '-top-[21px] left-1/2 -translate-x-1/2'
          : '-top-[18px] left-1/2 -translate-x-1/2',
  };

  const transformStyle = angle !== undefined ? { transform: `rotate(${angle}deg)` } : undefined;
  const width = isXs ? 12 : isSm ? 16 : isLg ? 26 : 22;
  const height = isXs ? 30 : isSm ? 42 : isLg ? 68 : 58;

  const showBack = part === 'all' || part === 'back';
  const showFront = part === 'all' || part === 'front';

  return (
    <>
      {/* 1. Layer 1: Right / Back Component (z-0): Bottom of isolated context, covered by Card Surface (z-10) */}
      {showBack && (
        <div
          className={cn(
            'absolute z-0 pointer-events-none select-none flex items-center justify-center',
            positionClasses[position] || positionClasses['top-right'],
            className
          )}
          style={transformStyle}
          aria-hidden="true"
        >
          <svg
            width={width}
            height={height}
            viewBox="0 0 24 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="paperclipSteelGradBack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="12%" stopColor="#334155" />
                <stop offset="35%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="65%" stopColor="#cbd5e1" />
                <stop offset="75%" stopColor="#94a3b8" />
                <stop offset="88%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            {/* Back Wire: Starts at the apex (X=11, Y=4) and curves down the right arm of the "n" arch */}
            <path
              d="M 11 4 C 14.5 4, 18 7, 18 11 L 18 46"
              stroke="url(#paperclipSteelGradBack)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Specular highlight glint */}
            <path
              d="M 11 4 C 14.5 4, 18 7, 18 11 L 18 46"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </div>
      )}

      {/* 2. Layer 3: Left / Front Component (z-20): Top of isolated context, sits on top of Card Surface (z-10) */}
      {showFront && (
        <div
          className={cn(
            'absolute z-20 pointer-events-none select-none flex items-center justify-center',
            positionClasses[position] || positionClasses['top-right'],
            className
          )}
          style={transformStyle}
          aria-hidden="true"
        >
          <svg
            width={width}
            height={height}
            viewBox="0 0 24 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="paperclipSteelGradFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="12%" stopColor="#334155" />
                <stop offset="35%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="65%" stopColor="#cbd5e1" />
                <stop offset="75%" stopColor="#94a3b8" />
                <stop offset="88%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            {/* Wire drop shadow on container face (only falls on the paper, Y >= 18) */}
            <path
              d="M 4 18 L 4 52 C 4 58, 13 58, 13 52 L 13 24"
              stroke="#0f172a"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
              transform="translate(0.8, 1.2)"
            />

            {/* Front Wire: Starts at the apex (X=11, Y=4), curves down the left arm of the "n" arch,
                extends down the front of the paper, loops at the bottom, and returns up the inner side */}
            <path
              d="M 11 4 C 7.5 4, 4 7, 4 11 L 4 52 C 4 58, 13 58, 13 52 L 13 24"
              stroke="url(#paperclipSteelGradFront)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Specular highlight glint */}
            <path
              d="M 11 4 C 7.5 4, 4 7, 4 11 L 4 52 C 4 58, 13 58, 13 52 L 13 24"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </div>
      )}
    </>
  );
};
/**
 * Master Unified Fixture Component
 */
export const Fixture: React.FC<FixtureProps> = ({
  type = 'none',
  pinColor = 'rose',
  pinPosition = 'top-middle',
  staplePosition = 'top-middle',
  stapleAngle,
  tapeVariant = 'yellow',
  tapePosition = 'top-middle',
  tapeAngle,
  cornerOrientation,
  paperclipPosition = 'top-right',
  paperclipAngle,
  size = 'default',
  className,
}) => {
  if (type === 'none' || !type) return null;

  switch (type) {
    case 'pin':
      return (
        <PushPin
          color={pinColor}
          position={pinPosition}
          size={size}
          className={className}
        />
      );
    case 'staple':
      return (
        <Staple
          position={staplePosition}
          angle={stapleAngle}
          size={size}
          className={className}
        />
      );
    case 'tape':
      return (
        <Tape
          variant={tapeVariant}
          position={tapePosition}
          angle={tapeAngle}
          size={size}
          className={className}
        />
      );
    case 'tape-corners':
    case 'corner-tape':
      return (
        <CornerTape
          variant={tapeVariant}
          orientation={cornerOrientation ?? 'top-left-bottom-right'}
          size={size}
          className={className}
        />
      );
    case 'tape-4-corners':
    case 'four-corners':
      return (
        <CornerTape
          variant={tapeVariant}
          orientation={cornerOrientation ?? 'all'}
          size={size}
          className={className}
        />
      );
    case 'paperclip':
      return (
        <Paperclip
          position={paperclipPosition}
          angle={paperclipAngle}
          size={size}
          className={className}
        />
      );
    default:
      return null;
  }
};
