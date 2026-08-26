import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Fixture,
  type FixtureType,
  type PinColor,
  type StaplePosition,
  type TapeVariant,
  type TapePosition,
  type CornerTapeOrientation,
  type PaperclipPosition,
  type FixtureSize,
} from '@/components/ui/fixture';
import {
  CONTAINER_COLORS,
  STACK_LAYER_CONFIGS,
  type ContainerColor,
} from '@/lib/container-tokens';

export type StickyNoteColor = 'yellow' | 'blue' | 'pink' | 'green' | 'paper';
export type StickyNoteSize = '3x3' | '5x5' | '7x7' | '10x10' | 'square';

const NOTE_SIZE_CLASSES: Record<StickyNoteSize, string> = {
  '3x3': 'aspect-square w-[96px] h-[96px] min-w-[96px] min-h-[96px]',
  '5x5': 'aspect-square w-[160px] h-[160px] min-w-[160px] min-h-[160px]',
  '7x7': 'aspect-square w-[224px] h-[224px] min-w-[224px] min-h-[224px]',
  '10x10': 'aspect-square w-[320px] h-[320px] min-w-[320px] min-h-[320px]',
  'square': 'aspect-square min-w-[160px] min-h-[160px]',
};


export interface StickyNotePageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional title heading displayed at top of sheet */
  title?: string;
  /** Additional CSS class for outer sheet wrapper */
  className?: string;
  /** Additional CSS class for title header */
  headerClassName?: string;
  /** Additional CSS class for scrollable content area */
  contentClassName?: string;
  /** Whether to log a dev warning if content overflows container height (default: true) */
  warnOnOverflow?: boolean;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Declarative sub-component representing a single page/sheet inside a StickyNoteStack.
 */
export const StickyNotePage: React.FC<StickyNotePageProps> = ({
  title,
  className,
  headerClassName,
  contentClassName,
  warnOnOverflow = true,
  children,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warnOnOverflow || typeof window === 'undefined') return;
    // Check if content overflows allotted height in dev mode
    const el = contentRef.current;
    if (el && el.scrollHeight > el.clientHeight + 4) {
      console.warn(
        `[StickyNoteStack] Content in StickyNotePage "${title || 'Untitled'}" overflows allotted height (${el.clientHeight}px < ${el.scrollHeight}px). ` +
        `A scrollbar fallback has been applied. Consider breaking this content into multiple <StickyNotePage> sheets or selecting a larger note size (e.g. size="7x7" or "10x10").`
      );
    }
  }, [title, warnOnOverflow, children]);

  return (
    <div
      ref={contentRef}
      className={cn('w-full h-full flex flex-col justify-between min-h-0', className)}
      {...props}
    >
      {title && (
        <div className={cn('font-sketch font-bold text-0.375 uppercase tracking-wider text-slate-600 border-b border-dashed border-slate-300 pb-1 mb-2 select-none', headerClassName)}>
          {title}
        </div>
      )}
      <div className={cn('flex-1 min-h-0 w-full overflow-y-auto notebook-scrollbar pr-0.5', contentClassName)}>
        {children}
      </div>
    </div>
  );
};
StickyNotePage.displayName = 'StickyNotePage';

export interface StickyNoteStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of sticky notes in the visual paper stack (1 to 5).
   * If omitted, dynamically calculated based on total pages.
   */
  count?: number;
  /**
   * Explicit array of page nodes (alternative to declarative <StickyNotePage> children).
   */
  pages?: React.ReactNode[];
  /**
   * Controlled active page index (0-indexed).
   */
  page?: number;
  /**
   * Default active page index for uncontrolled usage.
   * @default 0
   */
  defaultPage?: number;
  /**
   * Callback fired when active page changes.
   */
  onPageChange?: (pageIndex: number) => void;
  /**
   * Size of the sticky note on the quantized 32px line grid ('3x3' [96px], '5x5' [160px], '7x7' [224px], '10x10' [320px], 'square', or 'auto').
   */
  noteSize?: StickyNoteSize;
  /**
   * Color theme of the sticky note.
   * @default 'yellow'
   */
  color?: StickyNoteColor;
  /**
   * Fixture style attaching the note to the page ('pin', 'staple', 'tape', 'tape-corners', 'paperclip', or 'none').
   * @default 'pin'
   */
  fixture?: FixtureType;
  /**
   * Sticky notes always maintain authentic 1:1 square dimensions.
   * @default 'square'
   */
  aspectRatio?: 'square';
  /**
   * Whether to enable automatic internal vertical scrolling when content exceeds note height.
   * @default true
   */
  autoScroll?: boolean;

  /**
   * Whether to display the tactile corner tab indicator ('1/# ↻') when multiple sheets exist.
   * @default true
   */
  showCornerTab?: boolean;
  /**
   * Color of the pin icon (when fixture is 'pin').
   * @default 'rose'
   */
  pinColor?: PinColor;
  /**
   * Position of the staple (when fixture is 'staple').
   * @default 'top-middle'
   */
  staplePosition?: StaplePosition;
  /**
   * Angle rotation of the staple in degrees.
   */
  stapleAngle?: number;
  /**
   * Tape color variant (when fixture is 'tape' or 'tape-corners').
   */
  tapeVariant?: TapeVariant;
  /**
   * Position of the single tape strip.
   */
  tapePosition?: TapePosition;
  /**
   * Orientation for opposite corner tape ('top-left-bottom-right' or 'top-right-bottom-left').
   */
  cornerOrientation?: CornerTapeOrientation;
  /**
   * Position of the paperclip (when fixture is 'paperclip').
   * @default 'top-right'
   */
  paperclipPosition?: PaperclipPosition;
  /**
   * Angle rotation of the paperclip in degrees.
   */
  paperclipAngle?: number;
  /**
   * Fastener / fixture size ('default', 'sm', 'xs', 'lg') OR note line size ('3x3', '5x5', '7x7', '10x10').
   */
  size?: FixtureSize | StickyNoteSize;
  /**
   * Explicit alias for fixture size.
   */
  fixtureSize?: FixtureSize;
  /**
   * Optional custom rotation for the top note (e.g. -2, 1.5).
   */
  rotation?: number;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Additional CSS classes for the top sticky note card.
   */
  noteClassName?: string;
  /**
   * Additional CSS classes for the inner content container.
   */
  contentClassName?: string;
  /**
   * Content inside the sticky note.
   */
  children?: React.ReactNode;
}

interface StickyNoteStackComponent extends React.FC<StickyNoteStackProps> {
  Page: typeof StickyNotePage;
}

/**
 * StickyNoteStack Component
 * 
 * Renders an interactive tactile stack of sticky notes with authentic Post-it pad dimensions,
 * 90-degree clean edges, dynamic paper depth, physical shuffling animations, corner tab indicators,
 * full keyboard/screen-reader accessibility, and reduced-motion fallback.
 */
export const StickyNoteStack: StickyNoteStackComponent = ({
  count,
  pages: explicitPages,
  page,
  defaultPage = 0,
  onPageChange,
  noteSize,
  color = 'yellow',
  fixture = 'pin',
  size,
  fixtureSize,
  aspectRatio = 'square',
  autoScroll = true,
  showCornerTab = true,
  pinColor = 'rose',
  staplePosition = 'top-middle',
  stapleAngle,
  tapeVariant,
  tapePosition = 'top-middle',
  cornerOrientation = 'top-left-bottom-right',
  paperclipPosition = 'top-right',
  paperclipAngle,
  rotation,
  className,
  noteClassName,
  contentClassName,
  children,
  onClick,
  onKeyDown,
  ...props
}) => {
  // Extract declarative StickyNotePage children or fallback to single page
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const hasDeclarativePages = childrenArray.some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === StickyNotePage || (child.type as any)?.displayName === 'StickyNotePage')
  );

  const sheets: React.ReactNode[] = explicitPages && explicitPages.length > 0
    ? explicitPages
    : hasDeclarativePages
    ? childrenArray
    : [children];

  const totalPages = Math.max(1, sheets.length);

  // Active page state (controlled or uncontrolled)
  const [internalPageIndex, setInternalPageIndex] = useState(defaultPage);
  const activePageIndex = page !== undefined ? page : internalPageIndex;

  // Shuffle animation state
  const [isShuffling, setIsShuffling] = useState(false);
  const [outgoingPageIndex, setOutgoingPageIndex] = useState<number | null>(null);
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    };
  }, []);

  // Handler to cycle to next sheet with shuffle animation
  const handleNext = useCallback(() => {
    if (isShuffling || totalPages <= 1) return;
    setIsShuffling(true);
    setOutgoingPageIndex(activePageIndex);

    const nextIndex = (activePageIndex + 1) % totalPages;

    if (page === undefined) {
      setInternalPageIndex(nextIndex);
    }
    onPageChange?.(nextIndex);

    if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    shuffleTimerRef.current = setTimeout(() => {
      setIsShuffling(false);
      setOutgoingPageIndex(null);
    }, 420);
  }, [activePageIndex, isShuffling, onPageChange, page, totalPages]);

  // Handler to cycle to previous sheet
  const handlePrev = useCallback(() => {
    if (isShuffling || totalPages <= 1) return;
    setIsShuffling(true);
    setOutgoingPageIndex(activePageIndex);

    const prevIndex = (activePageIndex - 1 + totalPages) % totalPages;

    if (page === undefined) {
      setInternalPageIndex(prevIndex);
    }
    onPageChange?.(prevIndex);

    if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    shuffleTimerRef.current = setTimeout(() => {
      setIsShuffling(false);
      setOutgoingPageIndex(null);
    }, 420);
  }, [activePageIndex, isShuffling, onPageChange, page, totalPages]);

  // Handle click on container: if not clicking an interactive child, trigger shuffle
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || totalPages <= 1) return;

    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Check if clicked element or its parent is interactive
    if (
      target.closest(
        'button, a, input, textarea, select, [role="button"], [role="link"], [data-no-shuffle="true"]'
      )
    ) {
      return; // Do not shuffle
    }

    handleNext();
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || totalPages <= 1) return;

    const target = e.target as HTMLElement | null;
    // Let focused interactive children handle their own Enter / Space keys
    if (
      target &&
      target !== e.currentTarget &&
      target.closest('button, a, input, textarea, select, [role="button"]')
    ) {
      return;
    }

    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Dynamic stack count clamped between 1 and 5
  const stackCount =
    count !== undefined
      ? Math.min(Math.max(1, Math.round(count)), 5)
      : Math.min(totalPages, 5);

  const colorTheme = CONTAINER_COLORS[color as ContainerColor] || CONTAINER_COLORS.yellow;

  // Determine active fixture
  const activeFixture: FixtureType = fixture;

  // Derive tape variant from note color if not explicitly provided
  const activeTapeVariant: TapeVariant =
    tapeVariant ?? (color === 'blue' ? 'blue' : color === 'pink' ? 'pink' : color === 'green' ? 'green' : 'yellow');

  // Disambiguate size / fixtureSize / noteSize
  const isSizeAStickyNoteSize =
    size && ['3x3', '5x5', '7x7', '10x10', 'square'].includes(size as string);
  const resolvedNoteSize: StickyNoteSize =
    noteSize ?? (isSizeAStickyNoteSize ? (size as StickyNoteSize) : 'square');

  const resolvedFixtureSize: FixtureSize | undefined =
    fixtureSize ?? (!isSizeAStickyNoteSize && size ? (size as FixtureSize) : undefined);


  // Generate underlying layers based on stackCount (count 1 has 0 underlying layers)
  const underLayerConfigs = STACK_LAYER_CONFIGS.slice(0, stackCount - 1);
  const sizeClasses = NOTE_SIZE_CLASSES[resolvedNoteSize] || NOTE_SIZE_CLASSES.square;

  return (
    <div
      tabIndex={totalPages > 1 ? 0 : undefined}
      role="region"
      aria-roledescription="sticky note stack"
      aria-label={props['aria-label'] || `Sticky note pad, sheet ${activePageIndex + 1} of ${totalPages}`}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative inline-flex flex-col isolate group rounded-none select-text focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
        sizeClasses,
        totalPages > 1 && 'hover-sticky-jiggle cursor-pointer',
        className
      )}
      style={{
        transform: typeof rotation === 'number' ? `rotate(${rotation}deg)` : undefined,
      }}
      {...props}
    >
      {/* Screen Reader Live Region Announcer */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Sheet {activePageIndex + 1} of {totalPages}
      </div>

      {/* Unified Fixture */}
      {activeFixture !== 'none' && (
        <Fixture
          type={activeFixture}
          size={resolvedFixtureSize}
          pinColor={pinColor}
          staplePosition={staplePosition}
          stapleAngle={stapleAngle}
          tapeVariant={activeTapeVariant}
          tapePosition={tapePosition}
          cornerOrientation={cornerOrientation}
          paperclipPosition={paperclipPosition}
          paperclipAngle={paperclipAngle}
        />
      )}

      {/* Underlying Stacked Notes (90-degree square paper sheets) */}
      {underLayerConfigs.map((cfg, idx) => {
        const layerColor = colorTheme.layers[idx % colorTheme.layers.length];
        return (
          <div
            key={idx}
            className={cn(
              'absolute inset-0 border border-slate-900/80 rounded-none shadow-doodle-sm pointer-events-none select-none transition-transform duration-300',
              layerColor,
              colorTheme.shadow
            )}
            style={{
              transform: `translate(${cfg.x}px, ${cfg.y}px) rotate(${cfg.rotate}deg)`,
              zIndex: cfg.zIndex,
            }}
            aria-hidden="true"
          />
        );
      })}

      {/* Outgoing Sheet Animation Layer during Shuffle */}
      {isShuffling && outgoingPageIndex !== null && (
        <div
          className={cn(
            'absolute inset-0 w-full h-full flex flex-col justify-between border-2 border-slate-900 rounded-none p-4 pointer-events-none overflow-hidden animate-sticky-shuffle-out',
            colorTheme.bg,
            colorTheme.text,
            colorTheme.shadow,
            noteClassName
          )}
          style={{ zIndex: 30 }}
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/30 pointer-events-none z-20" />
          <div className="relative z-10 flex-1 min-h-0 w-full overflow-hidden">
            {sheets[outgoingPageIndex]}
          </div>
        </div>
      )}

      {/* Main Active Sticky Note Sheet */}
      <div
        className={cn(
          'relative z-10 w-full h-full flex flex-col justify-between border-2 border-slate-900 rounded-none shadow-doodle-sm p-4 transition-transform duration-200 group-hover:translate-y-[-1px] overflow-hidden',
          isShuffling && 'animate-sticky-shuffle-in',
          colorTheme.bg,
          colorTheme.text,
          colorTheme.shadow,
          noteClassName
        )}
        style={{
          transform: stackCount > 1 && !isShuffling ? 'rotate(-0.5deg)' : undefined,
        }}
      >
        {/* Subtle top adhesive strip glare */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/30 pointer-events-none z-20" />

        {/* Tactile Corner Tab Indicator ("1/# ↻") */}
        {showCornerTab && totalPages > 1 && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute bottom-1.5 right-1.5 z-30 font-sketch text-0.375 font-bold text-slate-700 bg-white/85 hover:bg-yellow-200/90 border border-slate-800/60 px-1.5 py-0.5 rounded sketch-box-sm transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center gap-1 select-none focus:outline-none"
            aria-label={`Next sheet (${activePageIndex + 1} of ${totalPages})`}
            title="Next sheet (or press Space / Enter)"
          >
            <span>{activePageIndex + 1}/{totalPages}</span>
            <span className="text-0.25 opacity-75">↻</span>
          </button>
        )}

        {/* Sticky Note Active Sheet Content */}
        <div
          className={cn(
            'relative z-10 flex-1 min-h-0 w-full',
            autoScroll
              ? 'overflow-y-auto overflow-x-hidden pr-0.5 notebook-scrollbar'
              : 'overflow-visible',
            contentClassName
          )}
        >
          <div className="min-h-full flex flex-col justify-center">
            {sheets[activePageIndex]}
          </div>
        </div>
      </div>
    </div>
  );
};

StickyNoteStack.Page = StickyNotePage;

