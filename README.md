# Notebook Design System & Engineering Portfolio

A tactile, hand-crafted personal portfolio and design system built with **Astro 4**, **React 18**, **Tailwind CSS**, and **ShadCN UI**. The aesthetic is centered around a physical lined notebook theme featuring custom baseline grid alignment, doodle micro-interactions, washi tape accents, and detached glassmorphism overlays.

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
.font-sketch.align-to-rule { --baseline-offset: 6px; } /* Patrick Hand */
```

---

### 5. Detached Glassmorphism Modals & Dialogs

Interactive modal dialogs (`src/components/ui/dialog.tsx`) are **intentionally detached** from the 32px baseline grid:
- **Backdrop Scrim**: `bg-slate-950/40 backdrop-blur-md` creates an artful, frosted blur over the background notebook paper.
- **Acrylic Surface**: `bg-[#fffefc]/90 backdrop-blur-xl` with inner glow (`shadow-[0_20px_50px_rgba(30,41,59,0.25),0_0_0_1px_rgba(255,255,255,0.8)_inset]`) floating cleanly above the page.

---

### 6. Tactile & Doodle Components

- **Washi Tape (`<DoodleTape variant="yellow | blue | pink" />`)**: Hand-drawn colored washi tape strips for pinning cards and modals.
- **Scribble Animations (`<DoodleCircle />`, `<DoodleUnderline />`, `<DoodleCheck />`, `<DoodleArrow />`)**: Vector SVG animations styled like ink doodles.
- **Hand-drawn Borders & Shadows**: `.sketch-box`, `.sketch-box-thick`, `.doodle-shadow`, and `.doodle-shadow-hover`.

---

## 🛠️ Project Structure

```text
src/
├── components/
│   ├── ui/               # Reusable primitives (badge, button, card, dialog)
│   ├── ContactSection.tsx# Inbox & message modal
│   ├── Doodles.tsx       # Hand-drawn SVGs, circles, arrows, underlines
│   ├── Experience.tsx    # Capabilities checklist & work journal timeline
│   ├── Footer.tsx        # Minimal notebook footer
│   ├── Header.tsx        # 64px synchronized sticky navigation
│   ├── Hero.tsx          # Hero section with 2-line headline & annotations
│   └── Projects.tsx      # Selected work folder & preview modal
├── layouts/
│   └── Layout.astro      # Master layout with .notebook-paper-bg & view transitions
├── pages/
│   ├── index.astro       # Master grid page container
│   └── projects/
│       └── [slug].astro  # Project case study template
└── styles/
    └── globals.css       # Notebook paper gradient, grid rules & transitions
```

---

## 🧞 Available Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server at `localhost:4321` |
| `npm run build` | Build static production bundle to `./dist/` |
| `npm run preview` | Preview production build locally |
