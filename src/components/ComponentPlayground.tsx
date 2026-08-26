import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Fixture,
  PushPin,
  Staple,
  Tape,
  CornerTape,
  Paperclip,
  type FixtureType,
  type PinColor,
  type StaplePosition,
  type TapeVariant,
  type TapePosition,
  type CornerTapeOrientation,
} from '@/components/ui/fixture';
import { StickyNoteStack, StickyNotePage, type StickyNoteColor, type StickyNoteSize } from '@/components/StickyNoteStack';

import { Highlight } from '@/components/Highlight';
import { DoodleCircle, DoodleUnderline, DoodleCheck, DoodleArrow } from '@/components/Doodles';
import { type ContainerColor } from '@/lib/container-tokens';
import {
  Grid,
  Sliders,
  RefreshCw,
} from 'lucide-react';

type ContentSizeType =
  | 'micro'
  | 'short'
  | 'medium'
  | 'long'
  | 'card-full'
  | 'overflow-url'
  | 'overflow-scroll'
  | 'overflow-badges'
  | 'overflow-code'
  | 'empty';

export const ComponentPlayground: React.FC = () => {
  // Live Playground State
  const [containerType, setContainerType] = useState<'card' | 'sticky'>('card');
  const [color, setColor] = useState<ContainerColor>('yellow');
  const [fixtureType, setFixtureType] = useState<FixtureType>('tape');
  const [pinColor, setPinColor] = useState<PinColor>('rose');
  const [staplePos, setStaplePos] = useState<StaplePosition>('top-left');
  const [tapeColor, setTapeColor] = useState<TapeVariant>('yellow');
  const [tapePos, setTapePos] = useState<TapePosition>('top-middle');
  const [cornerOrient, setCornerOrient] = useState<CornerTapeOrientation>('top-left-bottom-right');
  const [contentSize, setContentSize] = useState<ContentSizeType>('medium');
  const [stackCount, setStackCount] = useState<number>(3);
  const [rotation, setRotation] = useState<number>(-1);
  const [stickySize, setStickySize] = useState<StickyNoteSize>('7x7');
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(false);


  // Multi-Page Sticky Note Test States
  const [interactiveBtnClicks, setInteractiveBtnClicks] = useState<number>(0);
  const [fastClickCount, setFastClickCount] = useState<number>(0);
  const [fastClickLockStatus, setFastClickLockStatus] = useState<string>('Ready');
  const [sizeDemo, setSizeDemo] = useState<StickyNoteSize>('7x7');
  const fastClickTargetRef = React.useRef<HTMLDivElement>(null);


  const LOREM_CONTENTS: Record<ContentSizeType, React.ReactNode> = {
    micro: (
      <span className="font-sketch text-0.375 font-bold uppercase tracking-wider">
        Folder 01 // Micro
      </span>
    ),
    short: (
      <p className="font-hand text-0.5 text-slate-800">
        ✏️ Quick notebook reminder: "Ship clean, accessible, tactile UI with deliberate craft."
      </p>
    ),
    medium: (
      <div className="space-y-2">
        <h4 className="font-sans font-bold text-0.75 text-slate-900">
          Tactile Lined Notebook Design
        </h4>
        <p className="font-sans text-0.5 text-slate-700">
          This container adheres to our strict 32px line rhythm scale. Spacing is quantized into neat line intervals, baseline descenders sit flat on top of the blue ruled line, and hand-drawn fixtures provide physical charm.
        </p>
      </div>
    ),
    long: (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-2">
          <span className="font-sketch text-0.375 font-bold text-slate-500 uppercase">Architecture Spec</span>
          <Badge variant={color === 'yellow' ? 'yellow' : 'default'} className="text-0.25">v2.4</Badge>
        </div>
        <h4 className="font-sans font-bold text-0.75 text-slate-900">
          Component System Guidelines &amp; Tokens
        </h4>
        <p className="font-sans text-0.5 text-slate-700">
          By centralizing border variants (<code className="bg-yellow-200/50 px-1 py-0.5 rounded text-0.375">sketch-box</code>), shadows (<code className="bg-yellow-200/50 px-1 py-0.5 rounded text-0.375">doodle-shadow</code>), and fixture mechanics into shared primitives, we ensure DRY compliance across the entire design system.
        </p>
        <ul className="space-y-1.5 font-sans text-0.375 text-slate-600 bg-white/60 p-3 rounded sketch-box-sm">
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">✓</span> Reusable across Card and StickyNoteStack
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">✓</span> Dual opposite-corner washi tape support
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">✓</span> Radix UI and WCAG accessible foundations
          </li>
        </ul>
      </div>
    ),
    'card-full': (
      <div>
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center justify-between">
            <Badge variant="blue" className="text-0.375">Component Library</Badge>
            <span className="font-hand text-0.5 text-slate-500">• Entry #04</span>
          </div>
          <CardTitle className="text-0.75 mt-2">Aura Design System</CardTitle>
          <CardDescription className="text-0.5">
            A tactile lightweight hand-crafted UI system for React &amp; Astro applications with minimal JS overhead.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mb-4">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="yellow">#React</Badge>
            <Badge variant="pink">#TypeScript</Badge>
            <Badge variant="green">#Tailwind</Badge>
          </div>
        </CardContent>
        <CardFooter className="p-0 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between">
          <span className="font-sketch text-0.375 font-bold text-slate-600">99/100 Lighthouse</span>
          <Button variant="default" size="sm" className="font-sketch text-0.375">
            Explore →
          </Button>
        </CardFooter>
      </div>
    ),
    'overflow-url': (
      <div className="space-y-2 max-w-full">
        <div className="flex items-center justify-between">
          <Badge variant="pink" className="text-0.25">URL / String Wrap Stress</Badge>
          <span className="font-mono text-0.25 text-slate-500">break-all</span>
        </div>
        <h4 className="font-sans font-bold text-0.75 text-slate-900 break-all">
          SUPER_UNBREAKABLE_VARIABLE_IDENTIFIER_WITHOUT_SPACES_0123456789_BUFFER_TEST
        </h4>
        <p className="font-mono text-0.375 text-slate-700 bg-white/80 p-2.5 rounded sketch-box-sm break-all">
          https://catocannizzo.design/projects/systems/deeply-nested-resource-slug-with-unbroken-characters-and-no-whitespace-at-all-stress-test-1234567890?query=notebook_grid_resilience_test&amp;session=0xdeadbeefc001cafe
        </p>
      </div>
    ),
    'overflow-scroll': (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="blue" className="text-0.25">Internal Scroll Container</Badge>
          <span className="font-mono text-0.25 text-slate-500">max-h-48 overflow-y-auto</span>
        </div>
        <div className="max-h-48 overflow-y-auto pr-2 space-y-2 border border-dashed border-slate-300 p-2.5 rounded bg-white/70">
          <h4 className="font-sans font-bold text-0.5 text-slate-900">
            Notebook System Event Log (Dense Multi-Paragraph)
          </h4>
          <p className="font-sans text-0.375 text-slate-700">
            [19:42:01.102] Init master notebook grid renderer on 32px line interval scale. Baseline descender calibration applied (--baseline-offset: 5px).
          </p>
          <p className="font-sans text-0.375 text-slate-700">
            [19:42:01.240] Loaded fixture sub-system: PushPin (rose), Staple (gunmetal 45deg), CornerTape (dual opposite corners), WashiTape (translucent yellow).
          </p>
          <p className="font-sans text-0.375 text-slate-700">
            [19:42:01.350] Stress testing vertical container scroll boundaries. Container maintains strict margin bounds without breaking background ruled grid sync.
          </p>
          <p className="font-sans text-0.375 text-slate-700">
            [19:42:01.480] Radix UI modal layer detached. Backing backdrop-blur scrim active. All assertions passing.
          </p>
        </div>
      </div>
    ),
    'overflow-badges': (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="yellow" className="text-0.25">Badge Cloud Burst</Badge>
          <span className="font-sketch text-0.375 text-slate-500">11 Items Wrapped</span>
        </div>
        <h4 className="font-sans font-bold text-0.5 text-slate-900">
          Tag Wrap Overflow Density
        </h4>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="yellow">#Astro</Badge>
          <Badge variant="blue">#TypeScript</Badge>
          <Badge variant="pink">#TailwindCSS-v3.4</Badge>
          <Badge variant="green">#TactileNotebookDesignSystem</Badge>
          <Badge variant="paper">#RadixUI</Badge>
          <Badge variant="yellow">#LucideIcons</Badge>
          <Badge variant="outline">#WCAG-AAA</Badge>
          <Badge variant="pink">#ResponsiveTypographyScale</Badge>
          <Badge variant="blue">#32px-Grid-Rhythm</Badge>
          <Badge variant="green">#ZeroJSEnergy</Badge>
          <Badge variant="paper">#ComponentPlayground</Badge>
        </div>
      </div>
    ),
    'overflow-code': (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="paper" className="text-0.25">Horizontal Code Scroll</Badge>
          <span className="font-mono text-0.25 text-slate-500">overflow-x-auto</span>
        </div>
        <h4 className="font-sans font-bold text-0.5 text-slate-900">
          Unbroken Code Line Containment
        </h4>
        <div className="overflow-x-auto p-2.5 rounded bg-slate-900 text-amber-300 font-mono text-0.25 border border-slate-800">
          <code>
            {`const containerConfig = { id: "notebook-card-001", fixture: "tape-corners", orientation: "top-left-bottom-right", lineInterval: 32, maxAllowedDriftPixels: 0.00001, unbrokenSlug: "https://catocannizzo.design/deep/v2/systems/resilience-stress-test-ultra-long-unbroken-parameter-chain-0123456789" };`}
          </code>
        </div>
      </div>
    ),
    empty: (
      <div className="py-4 text-center">
        <span className="font-hand text-0.5 text-slate-400 italic">
          [ Empty container test: zero internal text ]
        </span>
      </div>
    ),
  };

  const resetDefaults = () => {
    setContainerType('card');
    setColor('yellow');
    setFixtureType('tape');
    setPinColor('rose');
    setStaplePos('top-left');
    setTapeColor('yellow');
    setTapePos('top-middle');
    setCornerOrient('top-left-bottom-right');
    setContentSize('medium');
    setStackCount(3);
    setRotation(-1);
    setStickySize('7x7');
  };

  return (
    <div className="space-y-line-3 max-w-6xl mx-auto pb-line-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-dashed border-slate-300 pb-line-1">
        <div>
          <div className="relative inline-flex items-center h-line-1 mb-line-1">
            <Badge variant="yellow" className="gap-1.5 text-0.375">
              <Sliders className="w-3.5 h-3.5" />
              <span>Design System Inspector</span>
            </Badge>
            <span className="font-hand text-0.5 text-slate-500 ml-2">• Test Bench</span>
          </div>
          <div className="relative inline-block">
            <h1 className="text-1.5 md:text-2 font-bold text-slate-900 tracking-tight font-sans translate-y-[6px]">
              Component &amp; Fixture Test Suite
            </h1>
            <DoodleUnderline color="#f43f5e" className="absolute -bottom-2 left-0 w-full" />
          </div>
        </div>
        <p className="font-hand text-0.5 md:text-0.75 text-slate-600 max-w-md align-to-rule">
          Live interactive playground to test the UI framework used in my portfolio.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 1. DYNAMIC INTERACTIVE PLAYGROUND SANDBOX                                 */}
      {/* ========================================================================= */}
      <section className="bg-white sketch-box-thick doodle-shadow-lg p-line-1 sm:p-line-1.5">
        <div className="flex items-center justify-between mb-line-1 pb-line-0.5 border-b border-dashed border-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <h2 className="text-1 font-bold text-slate-900 font-sans">
              Dynamic Interactive Sandbox
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              className={showGridOverlay ? 'bg-yellow-200' : ''}
            >
              <Grid className="w-3.5 h-3.5 mr-1" />
              <span>{showGridOverlay ? 'Hide Ruled Lines' : 'Show Ruled Lines'}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={resetDefaults}>
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              <span>Reset</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-line-1.5 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4 bg-[#fdfbf7] p-4 sketch-box-sm text-0.375 font-sans">
            {/* Container Selector */}
            <div>
              <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                1. Container Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['card', 'sticky'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setContainerType(t)}
                    className={`py-1.5 px-3 rounded sketch-box-sm font-sketch text-0.375 font-bold transition-all ${
                      containerType === t
                        ? 'bg-yellow-200 text-slate-900 border-slate-900 shadow-doodle-sm'
                        : 'bg-white text-slate-700 hover:bg-yellow-100'
                    }`}
                  >
                    {t === 'card' ? 'Card' : 'StickyNote'}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Theme Selector */}
            <div>
              <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                2. Color Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {(['yellow', 'blue', 'pink', 'green', 'paper', 'white', 'slate'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1 rounded sketch-box-sm font-sketch text-0.375 capitalize transition-all ${
                      color === c
                        ? 'ring-2 ring-slate-900 font-bold scale-105 shadow-doodle-sm'
                        : 'opacity-80 hover:opacity-100'
                    } ${
                      c === 'yellow'
                        ? 'bg-yellow-200 text-slate-900'
                        : c === 'blue'
                        ? 'bg-sky-200 text-slate-900'
                        : c === 'pink'
                        ? 'bg-rose-200 text-slate-900'
                        : c === 'green'
                        ? 'bg-emerald-200 text-slate-900'
                        : c === 'paper'
                        ? 'bg-[#f6f2e8] text-slate-900'
                        : c === 'white'
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Fixture Selector */}
            <div>
              <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                3. Fixture / Fastener Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['tape', 'tape-corners', 'pin', 'staple', 'paperclip', 'none'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFixtureType(f)}
                    className={`py-1.5 px-2 rounded sketch-box-sm font-sketch text-0.375 font-bold transition-all ${
                      fixtureType === f
                        ? 'bg-yellow-200 text-slate-900 shadow-doodle-sm'
                        : 'bg-white text-slate-700 hover:bg-yellow-100'
                    }`}
                  >
                    {f === 'tape'
                      ? 'Washi Tape Strip 🏷️'
                      : f === 'tape-corners'
                      ? 'Corner Tape 🌟'
                      : f === 'pin'
                      ? 'Pushpin'
                      : f === 'staple'
                      ? 'Staple'
                      : f === 'paperclip'
                      ? 'Paperclip'
                      : 'None'}
                  </button>
                ))}
              </div>
            </div>

            {/* Fixture Specific Controls: Single Tape */}
            {fixtureType === 'tape' && (
              <div className="p-2.5 bg-yellow-50/80 sketch-box-sm space-y-2">
                <span className="font-sketch font-bold text-slate-800 block">
                  Washi Tape Strip Options:
                </span>
                <div className="flex gap-2">
                  {(['top-middle', 'top-left', 'top-right'] as const).map((tp) => (
                    <button
                      key={tp}
                      onClick={() => setTapePos(tp)}
                      className={`flex-1 py-1 px-1.5 text-0.375 rounded sketch-box-sm font-sketch capitalize ${
                        tapePos === tp ? 'bg-yellow-300 font-bold' : 'bg-white'
                      }`}
                    >
                      {tp.replace('-', ' ')}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-slate-600 font-sketch">Tape Color:</span>
                  {(['yellow', 'blue', 'pink', 'green'] as const).map((tc) => (
                    <button
                      key={tc}
                      onClick={() => setTapeColor(tc)}
                      className={`px-2 py-0.5 rounded text-0.25 font-sketch ${
                        tapeColor === tc ? 'ring-2 ring-slate-900 font-bold' : ''
                      } ${
                        tc === 'yellow'
                          ? 'bg-yellow-200'
                          : tc === 'blue'
                          ? 'bg-sky-200'
                          : tc === 'pink'
                          ? 'bg-rose-200'
                          : 'bg-emerald-200'
                      }`}
                    >
                      {tc}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fixture Specific Controls: Corner Tape */}
            {fixtureType === 'tape-corners' && (
              <div className="p-2.5 bg-yellow-50/80 sketch-box-sm space-y-2">
                <span className="font-sketch font-bold text-slate-800 block">
                  Corner Tape Options:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCornerOrient('top-left-bottom-right')}
                    className={`flex-1 py-1 px-2 text-0.375 rounded sketch-box-sm font-sketch ${
                      cornerOrient === 'top-left-bottom-right' ? 'bg-yellow-300 font-bold' : 'bg-white'
                    }`}
                  >
                    Top-Left &amp; Bottom-Right ( \ )
                  </button>
                  <button
                    onClick={() => setCornerOrient('top-right-bottom-left')}
                    className={`flex-1 py-1 px-2 text-0.375 rounded sketch-box-sm font-sketch ${
                      cornerOrient === 'top-right-bottom-left' ? 'bg-yellow-300 font-bold' : 'bg-white'
                    }`}
                  >
                    Top-Right &amp; Bottom-Left ( / )
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-slate-600 font-sketch">Tape Color:</span>
                  {(['yellow', 'blue', 'pink', 'green'] as const).map((tc) => (
                    <button
                      key={tc}
                      onClick={() => setTapeColor(tc)}
                      className={`px-2 py-0.5 rounded text-0.25 font-sketch ${
                        tapeColor === tc ? 'ring-2 ring-slate-900 font-bold' : ''
                      } ${
                        tc === 'yellow'
                          ? 'bg-yellow-200'
                          : tc === 'blue'
                          ? 'bg-sky-200'
                          : tc === 'pink'
                          ? 'bg-rose-200'
                          : 'bg-emerald-200'
                      }`}
                    >
                      {tc}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {fixtureType === 'pin' && (
              <div className="p-2.5 bg-rose-50/80 sketch-box-sm space-y-2">
                <span className="font-sketch font-bold text-slate-800 block">Pin Color:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['rose', 'red', 'blue', 'yellow', 'green', 'slate'] as const).map((pc) => (
                    <button
                      key={pc}
                      onClick={() => setPinColor(pc)}
                      className={`px-2.5 py-1 rounded text-0.25 font-sketch capitalize ${
                        pinColor === pc ? 'ring-2 ring-slate-900 font-bold' : ''
                      } ${
                        pc === 'rose'
                          ? 'bg-rose-500 text-white'
                          : pc === 'red'
                          ? 'bg-red-500 text-white'
                          : pc === 'blue'
                          ? 'bg-sky-500 text-white'
                          : pc === 'yellow'
                          ? 'bg-amber-400 text-slate-900'
                          : pc === 'green'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {pc}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {fixtureType === 'staple' && (
              <div className="p-2.5 bg-slate-100 sketch-box-sm space-y-2">
                <span className="font-sketch font-bold text-slate-800 block">Staple Position:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['top-left', 'diagonal-left', 'top-middle', 'top-right', 'diagonal-right'] as const).map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setStaplePos(sp)}
                      className={`py-1 px-2 rounded text-0.25 font-sketch ${
                        staplePos === sp ? 'bg-yellow-200 text-slate-900 font-bold' : 'bg-white text-slate-700'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content Size */}
            <div>
              <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                4. Content Length &amp; Overflow Stress
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'micro', label: 'Micro' },
                    { id: 'short', label: 'Short' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'long', label: 'Long' },
                    { id: 'card-full', label: 'Full Card' },
                    { id: 'overflow-url', label: 'URL Wrap 🚨' },
                    { id: 'overflow-scroll', label: 'Scroll Log 📜' },
                    { id: 'overflow-badges', label: 'Badge Cloud 🏷️' },
                    { id: 'overflow-code', label: 'Code Scroll 💻' },
                    { id: 'empty', label: 'Empty' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setContentSize(id as ContentSizeType)}
                    className={`py-1 px-1.5 rounded sketch-box-sm font-sketch text-0.375 text-center transition-all ${
                      contentSize === id
                        ? 'bg-yellow-200 text-slate-900 shadow-doodle-sm font-bold'
                        : 'bg-white text-slate-700 hover:bg-yellow-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Size & Stack Count (if sticky note) */}
            {containerType === 'sticky' && (
              <div className="space-y-3 p-2.5 bg-yellow-50/80 sketch-box-sm">
                <div>
                  <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                    Sticky Note Size (1:1 Square Lines)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['3x3', '5x5', '7x7', '10x10'] as StickyNoteSize[]).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setStickySize(sz)}
                        className={`py-1 px-1.5 rounded text-0.25 font-sketch transition-all ${
                          stickySize === sz
                            ? 'bg-yellow-300 font-bold shadow-doodle-sm border border-slate-800'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-yellow-100'
                        }`}
                      >
                        {sz} ({sz === '3x3' ? '3 lines' : sz === '5x5' ? '5 lines' : sz === '7x7' ? '7 lines' : '10 lines'})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                    Stack Layers (1 to 5): {stackCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={stackCount}
                    onChange={(e) => setStackCount(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Rotation */}
            <div>
              <label className="block font-sketch font-bold uppercase text-slate-700 mb-1.5">
                Container Rotation: {rotation}°
              </label>
              <input
                type="range"
                min="-6"
                max="6"
                step="0.5"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Live Preview Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[420px] p-8 bg-[#fdfbf7] sketch-box-dashed relative overflow-hidden">
            {/* Optional Ruled Lines Background Overlay */}
            {showGridOverlay && (
              <div
                className="absolute inset-0 pointer-events-none notebook-paper-bg opacity-70 z-0"
                aria-hidden="true"
              />
            )}

            <div className="relative z-10 max-w-md w-full flex items-center justify-center p-4">
              {containerType === 'card' && (
                <Card
                  variant={color === 'white' ? 'default' : color === 'paper' ? 'paper' : color}
                  fixture={fixtureType}
                  fixtureProps={{
                    pinColor,
                    staplePosition: staplePos,
                    tapeVariant: tapeColor,
                    tapePosition: tapePos,
                    cornerOrientation: cornerOrient,
                  }}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  className="w-full shadow-doodle-hover"
                >
                  {LOREM_CONTENTS[contentSize]}
                </Card>
              )}

              {containerType === 'sticky' && (
                <StickyNoteStack
                  count={stackCount}
                  color={color === 'white' || color === 'slate' ? 'paper' : (color as StickyNoteColor)}
                  fixture={fixtureType}
                  pinColor={pinColor}
                  staplePosition={staplePos}
                  tapeVariant={tapeColor}
                  tapePosition={tapePos}
                  cornerOrientation={cornerOrient}
                  rotation={rotation}
                  size={stickySize}
                >
                  {LOREM_CONTENTS[contentSize]}
                </StickyNoteStack>
              )}
            </div>

            <div className="absolute bottom-3 right-4 font-mono text-0.25 text-slate-400 bg-white/80 px-2 py-1 sketch-box-sm">
              Container: {containerType} | Size: {stickySize} (Square) | Fixture: {fixtureType} | Color: {color}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DEDICATED CORNER TAPE SHOWCASE                                        */}
      {/* ========================================================================= */}
      <section className="bg-[#fffdf9] sketch-box p-line-1 sm:p-line-1.5 doodle-shadow">
        <div className="flex items-center gap-2 mb-line-0.5">
          <Badge variant="yellow" className="text-0.375">NEW FEATURE</Badge>
          <span className="font-sketch text-0.375 font-bold uppercase tracking-widest text-slate-500">
            Opposite-Corner Tape Matrix
          </span>
        </div>
        <h2 className="text-1 font-bold text-slate-900 font-sans mb-line-0.5">
          Corner Tape Architecture
        </h2>
        <p className="text-0.5 text-slate-600 font-sans mb-line-1 max-w-2xl">
          Instead of single top-center tape, washi tape strips span two opposite corners with calculated diagonal rotations (<code className="text-0.375 bg-yellow-100 px-1 py-0.5 rounded">top-left-bottom-right</code> or <code className="text-0.375 bg-yellow-100 px-1 py-0.5 rounded">top-right-bottom-left</code>).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-line-1 pt-2">
          {/* Card 1: Yellow with Top-Left & Bottom-Right */}
          <Card
            variant="yellow"
            fixture="tape-corners"
            fixtureProps={{ cornerOrientation: 'top-left-bottom-right', tapeVariant: 'yellow' }}
            className="rotate-[-1deg] hover:rotate-0 transition-transform"
          >
            <span className="font-sketch text-0.375 font-bold text-amber-900 block mb-1">
              Diagonal: Top-Left &amp; Bottom-Right
            </span>
            <h4 className="font-sans font-bold text-0.5 text-slate-900 mb-1">
              Yellow Washi Corners
            </h4>
            <p className="font-hand text-0.5 text-slate-800">
              Pinned down at both ends like a physical memo taped into a lab notebook.
            </p>
          </Card>

          {/* Card 2: Blue with Top-Right & Bottom-Left */}
          <Card
            variant="blue"
            fixture="tape-corners"
            fixtureProps={{ cornerOrientation: 'top-right-bottom-left', tapeVariant: 'blue' }}
            className="rotate-[1deg] hover:rotate-0 transition-transform"
          >
            <span className="font-sketch text-0.375 font-bold text-sky-900 block mb-1">
              Diagonal: Top-Right &amp; Bottom-Left
            </span>
            <h4 className="font-sans font-bold text-0.5 text-slate-900 mb-1">
              Sky Blue Corners
            </h4>
            <p className="font-sans text-0.375 text-slate-700">
              Opposite diagonal geometry creates asymmetrical balance on card grids.
            </p>
          </Card>

          {/* Card 3: Pink Sticky Note with Corner Tape */}
          <StickyNoteStack
            count={3}
            color="pink"
            fixture="tape-corners"
            cornerOrientation="top-left-bottom-right"
            tapeVariant="pink"
            rotation={-0.5}
            className="w-full"
          >
            <span className="font-sketch text-0.375 font-bold text-rose-900 block mb-1">
              Sticky Note 3-Stack
            </span>
            <p className="font-hand text-0.5 text-slate-800">
              Corner tape works across multi-layer sticky note stacks seamlessly.
            </p>
          </StickyNoteStack>

          {/* Card 4: Green with Code Snippet */}
          <Card
            variant="green"
            fixture="tape-corners"
            fixtureProps={{ cornerOrientation: 'top-right-bottom-left', tapeVariant: 'green' }}
            className="rotate-[0.5deg] hover:rotate-0 transition-transform"
          >
            <span className="font-sketch text-0.375 font-bold text-emerald-900 block mb-1">
              Emerald Spec Memo
            </span>
            <pre className="font-mono text-0.25 bg-emerald-200/50 p-2 rounded sketch-box-sm text-slate-800">
              {`<Card fixture="tape-corners"\n  cornerOrientation="..." />`}
            </pre>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FULL MATRIX: CONTAINERS × FIXTURES                                     */}
      {/* ========================================================================= */}
      <section className="bg-white sketch-box p-line-1 sm:p-line-1.5 doodle-shadow">
        <div className="flex items-center gap-2 mb-line-0.5">
          <span className="font-sketch text-0.375 font-bold uppercase tracking-widest text-slate-500">
            Matrix Suite
          </span>
        </div>
        <h2 className="text-1 font-bold text-slate-900 font-sans mb-line-0.5">
          All Fixtures × Container Types
        </h2>
        <p className="text-0.5 text-slate-600 font-sans mb-line-1">
          Every container component can accept any fixture with calibrated zero-drift alignment and proportional sizing.
        </p>

        {/* Subsection A: Card Containers */}
        <div className="mb-line-1.5">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="font-sketch text-0.75 font-bold text-slate-800 uppercase tracking-wide">
              Container Type A // Standard Cards (6 Fixture Types)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* 1. None */}
            <Card variant="paper" fixture="none" className="p-4 text-center">
              <span className="font-sketch text-0.375 font-bold text-slate-500 block mb-1">Fixture: none</span>
              <p className="font-sans text-0.375 text-slate-800 font-bold">Standard Card</p>
            </Card>

            {/* 2. Pin */}
            <Card variant="yellow" fixture="pin" fixtureProps={{ pinColor: 'rose', size: 'sm' }} className="p-4 text-center">
              <span className="font-sketch text-0.375 font-bold text-slate-600 block mb-1">Fixture: pin (sm)</span>
              <p className="font-sans text-0.375 text-slate-900 font-bold">3D Pushpin</p>
            </Card>

            {/* 3. Staple */}
            <Card variant="blue" fixture="staple" fixtureProps={{ staplePosition: 'top-left', size: 'sm' }} className="p-4 text-center">
              <span className="font-sketch text-0.375 font-bold text-slate-600 block mb-1">Fixture: staple (sm)</span>
              <p className="font-sans text-0.375 text-slate-900 font-bold">Gunmetal Wire</p>
            </Card>

            {/* 4. Single Tape */}
            <Card variant="pink" fixture="tape" fixtureProps={{ tapeVariant: 'pink', size: 'sm' }} className="p-4 text-center">
              <span className="font-sketch text-0.375 font-bold text-slate-600 block mb-1">Fixture: tape (sm)</span>
              <p className="font-sans text-0.375 text-slate-900 font-bold">Washi Strip</p>
            </Card>

            {/* 5. Corner Tape */}
            <Card variant="green" fixture="tape-corners" fixtureProps={{ tapeVariant: 'green', size: 'sm' }} className="p-4 text-center">
              <span className="font-sketch text-0.375 font-bold text-slate-600 block mb-1">Fixture: tape-corners (sm)</span>
              <p className="font-sans text-0.375 text-slate-900 font-bold">Dual Corners</p>
            </Card>

            {/* 6. Paperclip */}
            <Card variant="white" fixture="paperclip" fixtureProps={{ size: 'sm' }} className="p-4 text-center">
              <span className="font-sketch text-0.375 font-bold text-slate-500 block mb-1">Fixture: paperclip (sm)</span>
              <p className="font-sans text-0.375 text-slate-800 font-bold">Wire Paperclip</p>
            </Card>
          </div>
        </div>

        {/* Subsection B: Sticky Note Stacks (All Stack Counts 1 to 5) */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <h3 className="font-sketch text-0.75 font-bold text-slate-800 uppercase tracking-wide">
              Container Type B // Sticky Note Stacks (All Stack Depths: 1 to 5 Sheets)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            {/* 1-Note Pad */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#fdfbf7] rounded sketch-box-sm">
              <StickyNoteStack
                count={1}
                color="yellow"
                fixture="tape"
                tapePosition="top-middle"
                tapeVariant="yellow"
                size="sm"
                className="w-full max-w-[160px]"
              >
                <span className="font-sketch text-0.25 font-bold text-amber-900 block uppercase">
                  1 Sheet // Single
                </span>
                <p className="font-hand text-0.375 text-slate-800">
                  Single Post-it pad with washi strip.
                </p>
              </StickyNoteStack>
              <span className="font-mono text-0.25 text-slate-500 mt-2">count=1 • tape (sm)</span>
            </div>

            {/* 2-Note Stack */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#fdfbf7] rounded sketch-box-sm">
              <StickyNoteStack
                count={2}
                color="blue"
                fixture="pin"
                pinColor="blue"
                size="sm"
                rotation={1}
                className="w-full max-w-[160px]"
              >
                <span className="font-sketch text-0.25 font-bold text-sky-900 block uppercase">
                  2 Sheets // 2-Stack
                </span>
                <p className="font-hand text-0.375 text-slate-800">
                  Dual layer stack with blue pushpin.
                </p>
              </StickyNoteStack>
              <span className="font-mono text-0.25 text-slate-500 mt-2">count=2 • pin (sm)</span>
            </div>

            {/* 3-Note Stack */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#fdfbf7] rounded sketch-box-sm">
              <StickyNoteStack
                count={3}
                color="pink"
                fixture="staple"
                staplePosition="diagonal-left"
                size="sm"
                rotation={-1}
                className="w-full max-w-[160px]"
              >
                <span className="font-sketch text-0.25 font-bold text-rose-900 block uppercase">
                  3 Sheets // 3-Stack
                </span>
                <p className="font-hand text-0.375 text-slate-800">
                  Triple layer with diagonal staple.
                </p>
              </StickyNoteStack>
              <span className="font-mono text-0.25 text-slate-500 mt-2">count=3 • staple (sm)</span>
            </div>

            {/* 4-Note Stack */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#fdfbf7] rounded sketch-box-sm">
              <StickyNoteStack
                count={4}
                color="green"
                fixture="tape-corners"
                cornerOrientation="top-left-bottom-right"
                tapeVariant="green"
                size="sm"
                rotation={0.5}
                className="w-full max-w-[160px]"
              >
                <span className="font-sketch text-0.25 font-bold text-emerald-900 block uppercase">
                  4 Sheets // 4-Stack
                </span>
                <p className="font-hand text-0.375 text-slate-800">
                  Quad layer with dual corner tape.
                </p>
              </StickyNoteStack>
              <span className="font-mono text-0.25 text-slate-500 mt-2">count=4 • corners (sm)</span>
            </div>

            {/* 5-Note Stack */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#fdfbf7] rounded sketch-box-sm">
              <StickyNoteStack
                count={5}
                color="paper"
                fixture="paperclip"
                paperclipPosition="top-right"
                size="sm"
                rotation={-1.5}
                className="w-full max-w-[160px]"
              >
                <span className="font-sketch text-0.25 font-bold text-slate-700 block uppercase">
                  5 Sheets // 5-Stack
                </span>
                <p className="font-hand text-0.375 text-slate-800">
                  Full 5-layer stack with wire paperclip.
                </p>
              </StickyNoteStack>
              <span className="font-mono text-0.25 text-slate-500 mt-2">count=5 • clip (sm)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONTENT SIZE & EDGE-CASE STRESS SUITE                                  */}
      {/* ========================================================================= */}
      <section className="bg-[#fdfbf7] sketch-box-thick p-line-1 sm:p-line-1.5 doodle-shadow-lg">
        <div className="flex items-center gap-2 mb-line-0.5">
          <Badge variant="pink" className="text-0.375">EDGE CASES</Badge>
          <span className="font-sketch text-0.375 font-bold uppercase tracking-widest text-slate-500">
            Content Resilience Test
          </span>
        </div>
        <h2 className="text-1 font-bold text-slate-900 font-sans mb-line-0.5">
          Lorem Ipsum &amp; Overflow Resilience Suite
        </h2>
        <p className="text-0.5 text-slate-600 font-sans mb-line-1">
          Stress-testing unbreakable URLs, vertical scroll containment, multi-line clamping, badge cloud wrapping, horizontal code containment, and multi-layer sticky note stacks.
        </p>

        {/* Subheader: Part A - Card Containers */}
        <div className="flex items-center gap-2 mb-line-0.5 pb-2 border-b border-dashed border-slate-300">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <h3 className="font-sketch text-0.75 font-bold text-slate-800 uppercase tracking-wide">
            Part A // Card Container Resilience (6 Cases)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-line-1 mb-line-1.5">
          {/* 1. Unbroken Strings & URL Overflow */}
          <Card variant="yellow" fixture="tape" fixtureProps={{ tapePosition: 'top-middle', tapeVariant: 'yellow' }} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="default" className="text-0.25">BREAK-ALL STRESS</Badge>
                <span className="font-mono text-0.25 text-slate-500">word-break: break-all</span>
              </div>
              <h4 className="font-sans font-bold text-0.75 text-slate-900 break-all mb-2">
                SUPER_LONG_UNBREAKABLE_IDENTIFIER_STRING_WITHOUT_SPACES_0123456789_BUFFER_TEST
              </h4>
              <p className="font-mono text-0.25 text-slate-800 bg-white/80 p-2.5 rounded sketch-box-sm break-all mb-3 border border-dashed border-amber-300">
                https://catocannizzo.design/deep/v2/extremely-long-unbroken-slug-without-whitespace-testing-overflow-containment-and-word-breaks?ref=test_bench&amp;env=production&amp;trace_id=9876543210_abcdef
              </p>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-amber-300">
              ✓ Unbroken 120+ char strings wrap cleanly without expanding the card or blowing out grid columns.
            </p>
          </Card>

          {/* 2. Fixed-Height Vertical Scroll Container */}
          <Card variant="blue" fixture="staple" fixtureProps={{ staplePosition: 'top-left' }} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="blue" className="text-0.25">SCROLL CONTAINER</Badge>
                <span className="font-mono text-0.25 text-slate-500">max-h-44 overflow-y-auto</span>
              </div>
              <h4 className="font-sans font-bold text-0.75 text-slate-900 mb-2">
                Constrained Event Stream
              </h4>
              <div className="max-h-44 overflow-y-auto pr-1.5 space-y-2 p-2.5 bg-white/80 sketch-box-sm border border-dashed border-sky-300 mb-3">
                <div className="font-mono text-0.25 text-slate-700 pb-1 border-b border-slate-200">
                  <span className="text-sky-700 font-bold">[19:42:01.102]</span> Master grid initialized at 32px line interval scale. Baseline calibration active.
                </div>
                <div className="font-mono text-0.25 text-slate-700 pb-1 border-b border-slate-200">
                  <span className="text-emerald-700 font-bold">[19:42:01.240]</span> PushPin and CornerTape fixture transforms calculated without line-box drift.
                </div>
                <div className="font-mono text-0.25 text-slate-700 pb-1 border-b border-slate-200">
                  <span className="text-amber-700 font-bold">[19:42:01.350]</span> Multi-line paragraph stream test: scroll bounds isolate within card box.
                </div>
                <div className="font-mono text-0.25 text-slate-700">
                  <span className="text-purple-700 font-bold">[19:42:01.480]</span> All assertions verified. Scrollbar renders inside paper boundary.
                </div>
              </div>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-sky-300">
              ✓ Smooth internal scrolling prevents oversized content from overflowing adjacent sections.
            </p>
          </Card>

          {/* 3. Multi-Line Clamping (line-clamp-2 & 3) */}
          <Card variant="pink" fixture="pin" fixtureProps={{ pinColor: 'rose' }} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="pink" className="text-0.25">LINE CLAMPING</Badge>
                <span className="font-mono text-0.25 text-slate-500">clamp-2 / clamp-3</span>
              </div>
              <h4 className="font-sans font-bold text-0.75 text-slate-900 mb-2 line-clamp-2" title="Deliberately Excessive Multi-Line Headline That Exceeds Normal Card Title Budgets Across Viewports">
                Deliberately Excessive Multi-Line Headline That Exceeds Normal Card Title Budgets Across Viewports
              </h4>
              <p className="font-sans text-0.5 text-slate-700 line-clamp-3 mb-3" title="When content creators input lengthy descriptions, line-clamping prevents cards from stretching unpredictably while maintaining strict line-height alignment with the background notebook ruled grid. This paragraph continues for many lines to demonstrate clean ellipsis termination.">
                When content creators input lengthy descriptions, line-clamping prevents cards from stretching unpredictably while maintaining strict line-height alignment with the background notebook ruled grid. This paragraph continues for many lines to demonstrate clean ellipsis termination.
              </p>
            </div>
            <div className="pt-2 border-t border-dashed border-rose-300 flex items-center justify-between">
              <span className="font-sketch text-0.375 text-rose-800">Clamped to 2-line title / 3-line body</span>
              <span className="font-mono text-0.25 bg-rose-200 px-1.5 py-0.5 rounded">ELLIPSIS ✓</span>
            </div>
          </Card>

          {/* 4. Badge Cloud Explosion & Flex Wrap */}
          <Card variant="paper" fixture="paperclip" className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="paper" className="text-0.25">FLEX-WRAP BURST</Badge>
                <span className="font-sketch text-0.375 text-slate-500">14 Badges</span>
              </div>
              <h4 className="font-sans font-bold text-0.75 text-slate-900 mb-2">
                Dense Tag Cloud Wrap
              </h4>
              <div className="flex flex-wrap gap-1.5 p-2 bg-white/70 rounded sketch-box-sm border border-dashed border-slate-300 mb-3">
                <Badge variant="yellow">#Astro</Badge>
                <Badge variant="blue">#TypeScript</Badge>
                <Badge variant="pink">#TailwindCSS-v3.4</Badge>
                <Badge variant="green">#TactileGrid</Badge>
                <Badge variant="paper">#RadixUI</Badge>
                <Badge variant="yellow">#LucideIcons</Badge>
                <Badge variant="outline">#WCAG-AAA</Badge>
                <Badge variant="pink">#32px-Rhythm</Badge>
                <Badge variant="blue">#ZeroJS</Badge>
                <Badge variant="green">#Post-it</Badge>
                <Badge variant="paper">#WashiTape</Badge>
                <Badge variant="outline">#CornerFix</Badge>
              </div>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300">
              ✓ Tag pills wrap dynamically onto multiple rows without clipping or breaking parent padding.
            </p>
          </Card>

          {/* 5. Horizontal Code Block Isolation */}
          <Card variant="green" fixture="tape-corners" fixtureProps={{ cornerOrientation: 'top-right-bottom-left', tapeVariant: 'green' }} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="green" className="text-0.25">OVERFLOW-X SCROLL</Badge>
                <span className="font-mono text-0.25 text-slate-500">overflow-x-auto</span>
              </div>
              <h4 className="font-sans font-bold text-0.75 text-slate-900 mb-2">
                Wide Code Line Isolation
              </h4>
              <div className="overflow-x-auto p-2.5 rounded bg-slate-900 text-emerald-300 font-mono text-0.25 border border-slate-800 mb-3">
                <pre className="whitespace-pre">
                  {`const systemMatrix = { id: "resilience-matrix-01", status: "PASS", unbrokenEndpoint: "https://catocannizzo.design/deep/v2/systems/grid/audit-trail-logs-with-unbreakable-tokens-2026?auth_mode=tactile_zero_drift_grid_compliance" };`}
                </pre>
              </div>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-emerald-300">
              ✓ Horizontal code scrolling is isolated within card boundary and never spills into page width.
            </p>
          </Card>

          {/* 6. Multi-Section Structure & Nested Container Overflow */}
          <Card variant="white" fixture="none" className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="paper" className="text-0.25">NESTED STRUCTURE</Badge>
                <span className="font-mono text-0.25 text-slate-500">multi-layer</span>
              </div>
              <h4 className="font-sans font-bold text-0.75 text-slate-900 mb-2">
                Composite Nested Layout
              </h4>
              <div className="p-2.5 bg-slate-50 rounded sketch-box-sm border border-dashed border-slate-300 space-y-2 mb-3">
                <div className="flex items-center justify-between text-0.25 font-mono text-slate-500 border-b border-slate-200 pb-1">
                  <span>SPEC_HIERARCHY_01</span>
                  <Badge variant="yellow" className="text-0.25">PASS</Badge>
                </div>
                <p className="font-sans text-0.375 text-slate-700">
                  Nested hierarchy blocks scale dynamically without overflowing or breaking the 32px line rhythm.
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="font-mono text-0.25 bg-white px-1.5 py-0.5 rounded border border-slate-200">grid-auto-rows: 32px</span>
                  <span className="font-mono text-0.25 bg-white px-1.5 py-0.5 rounded border border-slate-200">align-to-rule: 5px</span>
                </div>
              </div>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300">
              ✓ Multi-level hierarchical content stays contained within outer card boundary.
            </p>
          </Card>
        </div>

        {/* Subheader: Part B - Sticky Notes */}
        <div className="flex items-center gap-2 mb-line-0.5 pb-2 border-b border-dashed border-slate-300">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <h3 className="font-sketch text-0.75 font-bold text-slate-800 uppercase tracking-wide">
            Part B // Sticky Note (Post-It) Resilience Suite (6 Cases)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-line-1">
          {/* Sticky 1: Unbroken URL & Break-All Wrap */}
          <div className="p-4 bg-white/70 rounded sketch-box flex flex-col items-center justify-between min-h-[320px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="yellow" className="text-0.25">STICKY // BREAK-ALL</Badge>
              <span className="font-mono text-0.25 text-slate-500">word-break: break-all</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                count={3}
                color="yellow"
                fixture="tape"
                tapePosition="top-middle"
                tapeVariant="yellow"
                rotation={-1}
                className="w-full max-w-[220px]"
              >
                <span className="font-sketch text-0.375 font-bold text-amber-900 block mb-1">
                  URL Wrap in 1:1 Note
                </span>
                <p className="font-mono text-0.25 text-slate-800 bg-white/70 p-2 rounded sketch-box-sm break-all mb-2 border border-dashed border-amber-300">
                  https://catocannizzo.design/deep/resilience/unbroken-postit-slug-0123456789
                </p>
                <p className="font-sans text-0.25 text-amber-950 font-bold">
                  ✓ No pad width blowout
                </p>
              </StickyNoteStack>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300 w-full text-center">
              ✓ Unbroken 70+ char URLs break across lines inside compact 1:1 square note bounds.
            </p>
          </div>

          {/* Sticky 2: Constrained Internal Scroll */}
          <div className="p-4 bg-white/70 rounded sketch-box flex flex-col items-center justify-between min-h-[320px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="blue" className="text-0.25">STICKY // SCROLL</Badge>
              <span className="font-mono text-0.25 text-slate-500">max-h-28 overflow-y-auto</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                count={2}
                color="blue"
                fixture="staple"
                staplePosition="top-left"
                rotation={1}
                className="w-full max-w-[220px]"
              >
                <span className="font-sketch text-0.375 font-bold text-sky-900 block mb-1">
                  Scrollable Memo Sheet
                </span>
                <div className="max-h-28 overflow-y-auto pr-1 space-y-1.5 p-2 bg-white/80 sketch-box-sm border border-dashed border-sky-300 text-slate-800">
                  <p className="font-mono text-0.25">
                    <span className="font-bold text-sky-700">[10:00]</span> Layer offset Y sync verified.
                  </p>
                  <p className="font-mono text-0.25">
                    <span className="font-bold text-sky-700">[10:01]</span> Pinned note dimensions locked 1:1.
                  </p>
                  <p className="font-mono text-0.25">
                    <span className="font-bold text-sky-700">[10:02]</span> Internal scroll isolated from body grid.
                  </p>
                  <p className="font-mono text-0.25">
                    <span className="font-bold text-sky-700">[10:03]</span> Descender alignment: 5px offset.
                  </p>
                </div>
              </StickyNoteStack>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300 w-full text-center">
              ✓ Constrained event logs scroll smoothly within the top paper sheet boundaries.
            </p>
          </div>

          {/* Sticky 3: Multi-Line Clamping */}
          <div className="p-4 bg-white/70 rounded sketch-box flex flex-col items-center justify-between min-h-[320px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="pink" className="text-0.25">STICKY // LINE CLAMP</Badge>
              <span className="font-mono text-0.25 text-slate-500">line-clamp-2 / clamp-3</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                count={3}
                color="pink"
                fixture="pin"
                pinColor="rose"
                rotation={-0.5}
                className="w-full max-w-[220px]"
              >
                <span className="font-sketch text-0.375 font-bold text-rose-900 block mb-1">
                  Clamped Post-it Note
                </span>
                <h4 className="font-sans font-bold text-0.5 text-slate-900 line-clamp-2 mb-1" title="Deliberately Verbose Post-It Title That Exceeds The Pad Heading Area">
                  Deliberately Verbose Post-It Title That Exceeds The Pad Heading Area
                </h4>
                <p className="font-hand text-0.5 text-slate-800 line-clamp-3" title="This memo contains detailed annotations that continue past the visible boundary of the physical sticky note sheet so we truncate with ellipsis.">
                  This memo contains detailed annotations that continue past the visible boundary of the physical sticky note sheet so we truncate with ellipsis.
                </p>
              </StickyNoteStack>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300 w-full text-center">
              ✓ CSS line-clamping prevents long notes from inflating square pad aspect ratios.
            </p>
          </div>

          {/* Sticky 4: Tag Cloud Flex-Wrap */}
          <div className="p-4 bg-white/70 rounded sketch-box flex flex-col items-center justify-between min-h-[320px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="green" className="text-0.25">STICKY // BADGE CLOUD</Badge>
              <span className="font-sketch text-0.375 text-slate-500">Flex Wrap</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                count={2}
                color="green"
                fixture="paperclip"
                paperclipPosition="top-right"
                rotation={1}
                className="w-full max-w-[220px]"
              >
                <span className="font-sketch text-0.375 font-bold text-emerald-900 block mb-1">
                  Packed Badge Cloud
                </span>
                <div className="flex flex-wrap gap-1 p-1 bg-white/60 rounded sketch-box-sm border border-dashed border-emerald-300">
                  <Badge variant="green" size="sm">#Astro</Badge>
                  <Badge variant="yellow" size="sm">#React</Badge>
                  <Badge variant="blue" size="sm">#TS</Badge>
                  <Badge variant="pink" size="sm">#Tailwind</Badge>
                  <Badge variant="paper" size="sm">#Radix</Badge>
                  <Badge variant="outline" size="sm">#WCAG</Badge>
                  <Badge variant="green" size="sm">#ZeroJS</Badge>
                </div>
              </StickyNoteStack>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300 w-full text-center">
              ✓ Badge tokens wrap snugly inside the sticky note without breaking paper margins.
            </p>
          </div>

          {/* Sticky 5: Horizontal Code Scroll */}
          <div className="p-4 bg-white/70 rounded sketch-box flex flex-col items-center justify-between min-h-[320px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="paper" className="text-0.25">STICKY // CODE SCROLL</Badge>
              <span className="font-mono text-0.25 text-slate-500">overflow-x-auto</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                count={3}
                color="paper"
                fixture="tape-corners"
                cornerOrientation="top-left-bottom-right"
                tapeVariant="yellow"
                rotation={-1.5}
                className="w-full max-w-[220px]"
              >
                <span className="font-sketch text-0.375 font-bold text-slate-700 block mb-1">
                  Inline Code Snippet
                </span>
                <div className="overflow-x-auto p-1.5 rounded bg-slate-900 text-amber-300 font-mono text-0.25 border border-slate-800 mb-1">
                  <code>{`const note = { count: 3, fixture: "tape-corners" };`}</code>
                </div>
                <p className="font-hand text-0.375 text-slate-600">
                  Code stays inside scroll viewport.
                </p>
              </StickyNoteStack>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300 w-full text-center">
              ✓ Horizontal code scrollbars are isolated inside the top paper sheet boundary.
            </p>
          </div>

          {/* Sticky 6: 5-Layer Stack & Narrow Jitter Stress */}
          <div className="p-4 bg-white/70 rounded sketch-box flex flex-col items-center justify-between min-h-[320px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="yellow" className="text-0.25">STICKY // 5-LAYER STACK</Badge>
              <span className="font-mono text-0.25 text-slate-500">count=5 / rot=-2°</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                count={5}
                color="yellow"
                fixture="tape-corners"
                cornerOrientation="top-right-bottom-left"
                tapeVariant="yellow"
                rotation={-2}
                className="w-full max-w-[220px]"
              >
                <span className="font-sketch text-0.375 font-bold text-amber-900 block mb-1">
                  5-Layer Stack Stress
                </span>
                <p className="font-hand text-0.5 text-slate-800">
                  Testing organic jitter, multi-sheet paper shadows &amp; opposite corner tape.
                </p>
              </StickyNoteStack>
            </div>
            <p className="font-sans text-0.375 text-slate-700 pt-2 border-t border-dashed border-slate-300 w-full text-center">
              ✓ All 5 underlying paper sheets preserve matching dimensions and organic offsets.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MULTI-PAGE STICKY NOTE DECK & TACTILE SHUFFLE TEST BENCH              */}
      {/* ========================================================================= */}
      <section className="bg-white sketch-box-thick doodle-shadow-lg p-line-1 sm:p-line-1.5 space-y-line-1.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-line-0.5 border-b border-dashed border-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <h2 className="text-1 font-bold text-slate-900 font-sans">
              6. Multi-Page Sticky Note Deck &amp; Tactile Shuffle Test Bench
            </h2>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="yellow" className="text-0.25">Declarative Sub-Components</Badge>
            <Badge variant="blue" className="text-0.25">Tactile Shuffling</Badge>
            <Badge variant="pink" className="text-0.25">ARIA Region &amp; Keyboard</Badge>
          </div>
        </div>

        <p className="font-hand text-0.5 text-slate-700">
          Stress-testing multi-sheet sticky note pads with declarative <code className="bg-yellow-200/50 px-1 py-0.5 rounded text-0.375 font-sans">&lt;StickyNotePage&gt;</code> children, physical 3D paper peeling/reordering animations, corner tab indicators (<code className="bg-yellow-200/50 px-1 py-0.5 rounded text-0.375 font-sans">1/# ↻</code>), hover jiggle, keyboard navigation (<kbd className="font-mono text-0.25 bg-slate-200 px-1 rounded">Space</kbd> / <kbd className="font-mono text-0.25 bg-slate-200 px-1 rounded">Enter</kbd> / <kbd className="font-mono text-0.25 bg-slate-200 px-1 rounded">Arrows</kbd>), reduced-motion fallbacks, interactive child guards, and quantized line sizing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Test 1: 7-Sheet Stack (Exceeds 5 Sheets) */}
          <div className="p-4 bg-[#fdfbf7] rounded sketch-box flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="yellow" className="text-0.25">TEST 1: 7-SHEET PAD (MAX 5 VISUAL)</Badge>
              <span className="font-mono text-0.25 text-slate-500">7 Pages / 5 Layers</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                color="yellow"
                fixture="pin"
                pinColor="rose"
                size="7x7"
                className="w-full max-w-[224px]"
                aria-label="7-Sheet Project Workflow Pad"
              >
                <StickyNotePage title="01 // Ideation">
                  <p className="font-hand text-0.5 text-slate-800">
                    ✏️ Sketch minimal interface layouts on tactile notebook grid.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="02 // Architecture">
                  <p className="font-hand text-0.5 text-slate-800">
                    📐 Quantize margins and spacing to 32px line rhythm scale.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="03 // Fasteners">
                  <p className="font-hand text-0.5 text-slate-800">
                    📌 Attach pushpins, washi tape, metallic staples, and paperclips.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="04 // Animation">
                  <p className="font-hand text-0.5 text-slate-800">
                    🎴 Lift top note, rotate outward, and slip cleanly behind stack.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="05 // Accessibility">
                  <p className="font-hand text-0.5 text-slate-800">
                    ♿ ARIA region, live reader announcer, Space &amp; Arrow keys.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="06 // Fallbacks">
                  <p className="font-hand text-0.5 text-slate-800">
                    📜 Graceful internal scrollbars &amp; dev console warnings.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="07 // Release">
                  <p className="font-hand text-0.5 text-emerald-800 font-bold">
                    🚀 Fully polished, tactile 2026 portfolio experience shipped!
                  </p>
                </StickyNotePage>
              </StickyNoteStack>
            </div>
            <div className="pt-2 border-t border-dashed border-slate-300 w-full text-center space-y-1">
              <p className="font-sans text-0.375 text-slate-700">
                ✓ Visual paper depth clamped to 5 physical layers while cycling all 7 pages (<code className="bg-yellow-200/60 px-1 rounded text-0.25">1/7</code> to <code className="bg-yellow-200/60 px-1 rounded text-0.25">7/7</code>).
              </p>
              <span className="font-sketch text-0.25 text-slate-500 block">
                Click pad or corner tab, or press Space/Enter/Arrows
              </span>
            </div>
          </div>

          {/* Test 2: Interactive Elements Inside Note */}
          <div className="p-4 bg-[#fdfbf7] rounded sketch-box flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="blue" className="text-0.25">TEST 2: INTERACTIVE CHILD GUARD</Badge>
              <span className="font-sketch text-0.375 text-slate-500">e.target check</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                color="blue"
                fixture="staple"
                staplePosition="top-left"
                size="7x7"
                className="w-full max-w-[224px]"
              >
                <StickyNotePage title="Sheet 1 // Actions">
                  <div className="space-y-2">
                    <p className="font-sans text-0.375 text-slate-700">
                      Buttons &amp; links inside notes work independently without shuffling:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => setInteractiveBtnClicks((c) => c + 1)}
                        className="w-full text-0.375 font-sketch"
                      >
                        Click Counter: {interactiveBtnClicks}
                      </Button>
                      <a
                        href="#test-link"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Interactive link clicked without triggering sheet shuffle!');
                        }}
                        className="text-0.375 font-sketch text-blue-700 underline text-center block hover:text-blue-900"
                      >
                        [Test Action Link]
                      </a>
                    </div>
                  </div>
                </StickyNotePage>
                <StickyNotePage title="Sheet 2 // Navigated">
                  <p className="font-hand text-0.5 text-slate-800">
                    🎉 You clicked the non-interactive note body or corner tab to shuffle here!
                  </p>
                </StickyNotePage>
              </StickyNoteStack>
            </div>
            <div className="pt-2 border-t border-dashed border-slate-300 w-full text-center space-y-1">
              <p className="font-sans text-0.375 text-slate-700">
                ✓ Clicking the button increments state ({interactiveBtnClicks}) without shuffling the note.
              </p>
              <span className="font-sketch text-0.25 text-slate-500 block">
                Click empty space or corner tab to flip to Sheet 2
              </span>
            </div>
          </div>

          {/* Test 3: Fast Repeated Clicks & Lock Guard */}
          <div className="p-4 bg-[#fdfbf7] rounded sketch-box flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="green" className="text-0.25">TEST 3: RAPID CLICK LOCK GUARD</Badge>
              <span className="font-mono text-0.25 text-slate-500">isShuffling Guard</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                ref={fastClickTargetRef}
                color="green"
                fixture="paperclip"
                paperclipPosition="top-right"
                size="7x7"
                onPageChange={(idx) => setFastClickCount((c) => c + 1)}
                className="w-full max-w-[224px]"
              >
                <StickyNotePage title="Burst Test Sheet A">
                  <p className="font-hand text-0.5 text-slate-800">
                    ⚡ Rapid clicks are locked during the 420ms shuffle transition.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="Burst Test Sheet B">
                  <p className="font-hand text-0.5 text-slate-800">
                    🛡️ Prevents race conditions and duplicate animation triggers.
                  </p>
                </StickyNotePage>
                <StickyNotePage title="Burst Test Sheet C">
                  <p className="font-hand text-0.5 text-slate-800">
                    🎯 Total verified sheet cycles: {fastClickCount}
                  </p>
                </StickyNotePage>
              </StickyNoteStack>
            </div>
            <div className="pt-2 border-t border-dashed border-slate-300 w-full text-center space-y-2">
              <div className="flex items-center justify-between text-0.25 font-mono px-2 py-1 bg-white rounded border border-slate-200">
                <span>Lock Status: <strong className="text-emerald-700">{fastClickLockStatus}</strong></span>
                <span>Transitions: <strong>{fastClickCount}</strong></span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setFastClickLockStatus('Locked & Debouncing');
                  // Trigger 5 rapid simulated clicks in 200ms
                  for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                      fastClickTargetRef.current?.click();
                      if (i === 4) {
                        setTimeout(() => setFastClickLockStatus('Ready'), 500);
                      }
                    }, i * 35);
                  }
                }}
                className="w-full text-0.375 font-sketch h-7"
              >
                ⚡ Trigger 5 Rapid Clicks in 150ms
              </Button>
            </div>
          </div>

          {/* Test 4: Overloaded Content & Console Warning */}
          <div className="p-4 bg-[#fdfbf7] rounded sketch-box flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex items-center justify-between mb-2">
              <Badge variant="pink" className="text-0.25">TEST 4: OVERFLOW &amp; DEV WARNING</Badge>
              <span className="font-mono text-0.25 text-slate-500">warnOnOverflow=true</span>
            </div>
            <div className="py-2 w-full flex justify-center items-center flex-1">
              <StickyNoteStack
                color="pink"
                fixture="tape"
                tapeVariant="pink"
                size="5x5"
                className="w-full max-w-[160px]"
              >
                <StickyNotePage title="Overloaded Sheet" warnOnOverflow={true}>
                  <div className="space-y-1.5 text-0.25 text-slate-700 font-sans">
                    <p className="font-bold text-rose-900">Overload Stress Simulation:</p>
                    <p>Paragraph 1: Notebook grid lines cycle strictly at 32px.</p>
                    <p>Paragraph 2: When content exceeds sheet lines, scrollbar acts as fallback.</p>
                    <p>Paragraph 3: Dev console logs a warning advising multi-page splitting.</p>
                    <p>Paragraph 4: All content remains 100% accessible and readable.</p>
                  </div>
                </StickyNotePage>
                <StickyNotePage title="Clean Page 2">
                  <p className="font-hand text-0.5 text-slate-800">
                    ✨ Splitting content across sheets keeps notes clean and scrollbar-free!
                  </p>
                </StickyNotePage>
              </StickyNoteStack>
            </div>
            <div className="pt-2 border-t border-dashed border-slate-300 w-full text-center space-y-1">
              <p className="font-sans text-0.375 text-slate-700">
                ✓ Internal <code className="bg-pink-200/60 px-1 rounded text-0.25">notebook-scrollbar</code> fallback active.
              </p>
              <span className="font-sketch text-0.25 text-rose-700 block">
                ⚠️ Open browser DevTools console to see the [StickyNoteStack] warning
              </span>
            </div>
          </div>

          {/* Test 5: Quantized Line-Grid Sizes Matrix */}
          <div className="p-4 bg-[#fdfbf7] rounded sketch-box flex flex-col items-center justify-between min-h-[380px] md:col-span-2 lg:col-span-2">
            <div className="w-full flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="yellow" className="text-0.25">TEST 5: QUANTIZED LINE-GRID SIZE EXTENSIONS</Badge>
                <span className="font-mono text-0.25 text-slate-500">32px Line Multiples</span>
              </div>
              <div className="flex gap-1">
                {(['3x3', '5x5', '7x7', '10x10'] as StickyNoteSize[]).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSizeDemo(sz)}
                    className={`px-2 py-0.5 font-sketch text-0.25 font-bold rounded sketch-box-sm transition-all ${
                      sizeDemo === sz
                        ? 'bg-yellow-200 text-slate-900 border-slate-900 shadow-doodle-sm'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-yellow-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-4 w-full flex justify-center items-center flex-1 min-h-[260px]">
              <StickyNoteStack
                key={sizeDemo}
                color="paper"
                fixture="tape-corners"
                cornerOrientation="top-left-bottom-right"
                tapeVariant="yellow"
                size={sizeDemo}
                className="transition-all duration-300"
              >
                <StickyNotePage title={`${sizeDemo} Pad // Sheet 1`}>
                  <p className="font-hand text-0.5 text-slate-800">
                    {sizeDemo === '3x3' && '📌 3x3 Micro Note (96px = 3 lines)'}
                    {sizeDemo === '5x5' && '📌 5x5 Compact Note (160px = 5 lines)'}
                    {sizeDemo === '7x7' && '📌 7x7 Standard Tactile Post-it (224px = 7 lines)'}
                    {sizeDemo === '10x10' && '📌 10x10 Large Square Canvas (320px = 10 lines)'}
                  </p>
                </StickyNotePage>
                <StickyNotePage title={`${sizeDemo} Pad // Sheet 2`}>
                  <p className="font-hand text-0.5 text-slate-800">
                    Multi-page shuffling works seamlessly at any quantized grid size!
                  </p>
                </StickyNotePage>
              </StickyNoteStack>
            </div>

            <div className="pt-2 border-t border-dashed border-slate-300 w-full text-center">
              <p className="font-sans text-0.375 text-slate-700">
                ✓ Active line size: <strong className="font-mono text-slate-900">{sizeDemo}</strong> (
                {sizeDemo === '3x3' && '96px × 96px, 3 lines'}
                {sizeDemo === '5x5' && '160px × 160px, 5 lines'}
                {sizeDemo === '7x7' && '224px × 224px, 7 lines — Standard'}
                {sizeDemo === '10x10' && '320px × 320px, 10 lines — Expanded'}
                ) strictly synchronized with the 32px notebook line rhythm scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Return to Notebook */}
      <div className="pt-line-1 text-center">
        <Button variant="outline" size="lg" asChild className="font-sketch text-0.5">
          <a href="/">← Return to Main Notebook Portfolio</a>
        </Button>
      </div>
    </div>
  );
};

