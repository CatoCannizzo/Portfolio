# Notebook Design System & Engineering Portfolio

A tactile, hand-crafted personal portfolio and design system built with **Astro 4**, **React 18**, **Tailwind CSS**, and **ShadCN UI**. The aesthetic is centered around a physical lined notebook theme featuring custom baseline grid alignment, doodle micro-interactions, washi tape accents, unified fixtures, and detached glassmorphism overlays.

---

## 📐 Design Framework Briefs & Architecture

This codebase implements a custom vertical rhythm and baseline grid system designed to lock text and sections to the background ruled notebook lines (`32px` line cycle).

### 1. The 32px Vertical Baseline Grid & Master CSS Grid

The background ruled paper (`.notebook-paper-bg` in `src/styles/globals.css`) repeats horizontally every **32px** (2rem). To prevent cumulative vertical drift across the page:

- **Master Page Grid (`.notebook-grid`)**: The page `<main>` element uses `display: grid; grid-auto-rows: minmax(32px, auto);` (`auto-rows-line` in Tailwind).
- **Fluid Section Rows**: Sections naturally expand to fit content with quantized vertical padding (`py-line-2` = 64px, `py-line-3` = 96px). Every section naturally starts and ends on a ruled blue notebook line without hardcoded height clipping on mobile viewports.
- **Header Synchronization**: The top header is locked to `h-16` (64px = 2 lines) with `border-b-2`, ensuring that content in `<main>` starts flush on Line 3 (`Y = 64px`).

```astro
<!-- src/pages/index.astro -->
<main class="notebook-grid relative z-10 w-full">
  <Hero client:load />
  <Projects client:visible />
  <Experience client:visible />
  <ContactSection client:visible />
</main>
```

---

### 2. Line Interval Typography Scale

**Rule**: Standard Tailwind font sizes (`text-xs`, `text-sm`, `text-base`, `text-lg`, etc.) and arbitrary pixel sizes or relative `leading-*` overrides (`leading-relaxed`, `leading-tight`, `leading-snug`) are prohibited. All typography uses the custom line interval scale in `tailwind.config.mjs`:

| Class | Interval | Font Size | Line Height | Usage |
|---|---|---|---|---|
| `text-0.25` | 0.25 lines | `8px` (`0.5rem`) | `16px` (`1rem`) | Micro indicators, tiny badges |
| `text-0.375` | 0.375 lines | `12px` (`0.75rem`) | `16px` (`1rem`) | Badges, tags, section markers ("Folder 01 // Selected Work") |
| `text-0.5` | 0.5 lines | `16px` (`1rem`) | `32px` (`2rem`) | Body text, buttons, handwritten annotations ("2026 portfolio notes"), inputs |
| `text-0.75` | 0.75 lines | `24px` (`1.5rem`) | `32px` (`2rem`) | Card titles, prominent subheadings, sticky note quotes |
| `text-1` | 1 line | `32px` (`2rem`) | `32px` (`2rem`) | Section H2 headings ("Featured Projects", "Core Stack & Skills"), dialog titles |
| `text-1.25` | 1.25 lines | `40px` (`2.5rem`) | `64px` (`4rem` / 2 lines) | Intermediate display titles |
| `text-1.5` | 1.5 lines | `48px` (`3rem`) | `64px` (`4rem` / 2 lines) | Case study titles, large section banners |
| `text-2` | 2 lines | `64px` (`4rem`) | `64px` (`4rem` / 2 lines) | Hero H1 headline ("Building refined web products with...") |
| `text-2.5` | 2.5 lines | `80px` (`5rem`) | `96px` (`6rem` / 3 lines) | Extra large display numbers |
| `text-3` | 3 lines | `96px` (`6rem`) | `96px` (`6rem` / 3 lines) | Giant decorative accents |

---

### 3. Quantized Spacing Scale (`line-*`)

All margins, paddings, gaps, and heights use quantized `line-*` units defined in `tailwind.config.mjs`:

| Spacing Class | Pixel Value | Equivalent | Usage |
|---|---|---|---|
| `*-line-0.25` | `8px` | 0.25 lines | Tight gaps, small card offsets |
| `*-line-0.5` | `16px` | 0.5 lines | Symmetric padding (`py-line-0.5` = 32px total), component gaps |
| `*-line-0.75` | `24px` | 0.75 lines | Medium card spacing |
| `*-line-1` | `32px` | 1 line | Standard vertical margins (`mb-line-1`), padding (`p-line-1`), buttons, footer |
| `*-line-1.5` | `48px` | 1.5 lines | Section heading gaps, button heights (`h-line-1.5`), case study spacing |
| `*-line-2` | `64px` | 2 lines | Section vertical padding (`py-line-2`), hero spacing |
| `*-line-3` | `96px` | 3 lines | Large desktop section padding (`py-line-3`) |

---

### 4. Optical Baseline Calibration (`.align-to-rule`)

Because CSS distributes line height symmetrically around glyphs (half-leading), letter descenders and baselines can float between notebook lines. The `.align-to-rule` utility applies calibrated vertical shifts for each font family:

```css
.font-hand.align-to-rule { --baseline-offset: 4px; }   /* Caveat cursive */
.font-sans.align-to-rule { --baseline-offset: 5px; }   /* Plus Jakarta Sans */
.font-sketch.align-to-rule { --baseline-offset: 6px; } /* Kalam */
```

For large display headings (`text-1.5` / `text-2`), use `translate-y-[6px]` so letter baselines physically sit flat on top of the blue ruled line, allowing descenders (`p`, `g`, `y`, `j`, `q`) to dip naturally below.

---

### 5. Unified Fixture & Fastener System (`src/components/ui/fixture.tsx`)

A unified physical fastener system that attaches to any container (`Card`, `Badge`, `StickyNoteStack`):

- **Corner Washi Tape (`<CornerTape />`)**: Tapes **two opposite corners** diagonally or **all four corners**:
  - `orientation="top-left-bottom-right"` ( \ )
  - `orientation="top-right-bottom-left"` ( / )
  - `orientation="all"` / `orientation="four-corners"` or `fixture="tape-4-corners"` ( ❖ )
- **3D Pushpin (`<PushPin />` / `<PushPinIcon />`)**: Realistic pushpin with metallic head, needle shadow, and glare in 6 colors (`rose`, `red`, `blue`, `yellow`, `green`, `slate`).
- **Metallic Staple (`<Staple />`)**: Dark gunmetal wire SVG with puncture slits and wire shadow.
- **Wire Paperclip (`<Paperclip />` / `<DoodlePaperclip />`)**: Tactile paperclip placed on card edges.

---

### 6. Container Components & Sticky Note Architecture

#### `Card` (`src/components/ui/card.tsx`)
- Built with `cva` supporting `variant` (`default`, `paper`, `yellow`, `blue`, `pink`, `green`, `slate`), `borderStyle`, `shadowStyle`, and native `fixture` props:
```tsx
<Card fixture="tape-corners" fixtureProps={{ tapeVariant: 'yellow' }}>
  <CardTitle>Aura Design System</CardTitle>
  <CardDescription>Minimal lightweight tactile UI</CardDescription>
</Card>
```

#### `StickyNoteStack` (`src/components/StickyNoteStack.tsx`)
- **1:1 Square Aspect Ratio**: Defaults to `aspectRatio="square"` (`aspect-square min-w-[160px] min-h-[160px]`) like real Post-it pads.
- **90° Clean Square Edges**: Clean 90-degree corners (`rounded-none` and solid border lines) mirroring authentic paper.
- **Synchronized Layers**: 1 to 5 layers of paper notes with organic jitter where all sheets match 1:1 in dimensions.

```tsx
<StickyNoteStack count={3} color="yellow" fixture="tape-corners">
  <p className="font-hand text-0.5">Quick memo note</p>
</StickyNoteStack>
```

#### `Badge` (`src/components/ui/badge.tsx`)
- Built with `cva` aligning to the shared token palette (`yellow`, `blue`, `pink`, `green`, `paper`, `outline`, `tape`) with optional micro-fixtures (`fixture="staple"`, `fixture="pin"`).

---

### 7. Highlighter Marker Effects & Variable Tilt System

Tactile, translucent highlighter marks with chisel-tip geometry, realistic ink gradient density, and `mix-blend-mode: multiply` allowing the blue notebook ruled lines and background paper to show through.

#### Marker Colors
- `.marker-yellow`: Classic fluorescent yellow highlighter ink.
- `.marker-blue`: Translucent sky blue ink.
- `.marker-pink`: Vibrant soft rose highlighter.
- `.marker-green`: Crisp mint green marker.

#### 8 Extreme Tilt & Height Modifiers (`marker-tilt-*`)

| Class | Rotation (`--marker-rot`) | Chisel Skew (`--marker-skew`) | Height / Coverage | Visual Character |
|---|---|---|---|---|
| `marker-tilt-1` | `-3.5deg` | `-16deg` | Standard (`-3px`) | **Heavy Classic Chisel**: Bold upward slant and thick felt tip body. |
| `marker-tilt-2` | `+3.0deg` | `+16deg` (Positive) | Standard (`-2px`) | **Reversed Angle (Left-Handed)**: Inverted `/ /` chisel slant sloping downward. |
| `marker-tilt-3` | `0.0deg` | `0deg` (Perpendicular) | Boxy (`-2px`) | **Straight Vertical Stamp**: 90° straight cut boxy marker with zero skew. |
| `marker-tilt-4` | `-2.0deg` | `-25deg` (Deep Acute) | Extended X (`-10px`) | **Razor Diamond Slant**: Sharp acute parallelogram blade cut. |
| `marker-tilt-5` | `+1.2deg` | `-8deg` | **Tall (`-8px` top, `-7px` btm)** | **Extra Tall Juicy Block**: Maximum vertical coverage overflowing the line. |
| `marker-tilt-6` | `-1.2deg` | `-14deg` | **Slim (`48%` top)** | **Slim Lower-Half Underline**: Highlights only bottom half of text like a ribbon. |
| `marker-tilt-7` | `+4.8deg` | `+14deg` (Positive) | Standard (`-3px`) | **Steep Downward Cascade**: Steep positive downward angle with reverse slant. |
| `marker-tilt-8` | `-5.5deg` | `-22deg` | Extended X (`-9px`) | **Steep Upward Slash**: Fast dynamic aggressive slash across the word. |

---

### 8. Interactive Component Test Bench (`/test`)

A live testing suite is available at route **`/test`** (`src/pages/test.astro` & `src/components/ComponentPlayground.tsx`):
- **Live Interactive Sandbox**: Switch between `Card`, `StickyNoteStack`, and `Badge`, toggle any fixture (corner tape, washi tape strip, pushpin, staple, paperclip), customize colors/positions, and test against 6 content lengths.
- **Rule Inspector**: Toggle ruled notebook lines overlay to visually inspect 32px line rhythm.
- **Full Matrix Showcase**: Side-by-side verification of all containers × fixture combinations.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── ui/                    # Reusable primitives (badge, button, card, dialog, fixture)
│   ├── ComponentPlayground.tsx# Interactive test bench and matrix suite
│   ├── ContactSection.tsx     # Inbox & message modal
│   ├── Doodles.tsx            # Hand-drawn SVGs, circles, arrows, underlines
│   ├── Experience.tsx         # Capabilities checklist & work journal timeline
│   ├── Footer.tsx             # Minimal notebook footer with test bench link
│   ├── Header.tsx             # 64px synchronized sticky navigation
│   ├── Hero.tsx               # Hero section with 2-line headline & annotations
│   ├── Highlight.tsx          # Reusable Highlighter component with variable tilt presets
│   ├── Projects.tsx           # Selected work folder & preview modal
│   └── StickyNoteStack.tsx    # 1:1 square Post-it stack with 90° clean edges
├── layouts/
│   └── Layout.astro           # Master layout with .notebook-paper-bg & view transitions
├── lib/
│   ├── container-tokens.ts    # Unified design tokens (palettes, borders, shadows)
│   └── utils.ts               # cn() helper
├── pages/
│   ├── index.astro            # Master grid page container
│   ├── test.astro             # Dedicated component test bench route (/test)
│   └── projects/
│       └── [slug].astro       # Project case study template
└── styles/
    └── globals.css            # Notebook paper gradient, grid rules & transitions
```

---

## 🧞 Available Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server at `localhost:4321` |
| `npm run build` | Build static production bundle to `./dist/` |
| `npm run preview` | Preview production build locally |
