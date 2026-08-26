# Agent Guidelines & Typography System

This document specifies the design system rules, typography scale, spacing conventions, layout architecture, container tokens, fixture mechanics, and debugging protocols for this project. All AI agents working on this codebase must strictly adhere to these guidelines.

---

## 1. Background Grid & Master CSS Grid Architecture

The portfolio aesthetic is built around a tactile, lined notebook theme (`.notebook-paper-bg` in `src/styles/globals.css`). The background ruled lines have a fixed cycle distance of **32px** (2rem).

### Master Grid Layout (`.notebook-grid`)
- Pages use `<main class="notebook-grid relative z-10 w-full">` with `grid-auto-rows: minmax(32px, auto)` (`auto-rows-line` in Tailwind).
- Sections naturally expand to fit dynamic content with quantized vertical padding (`py-line-2` or `py-line-3`).
- **Header Synchronization**: The header is fixed to `h-16` (64px = exactly 2 lines) with `border-b-2`, ensuring that content in `<main>` starts flush on Line 3 (`Y = 64px`).
- **No Arbitrary Viewport Heights**: Never use `vh` units (`min-h-screen`, `min-h-[calc(100vh-...)]`) on content sections, as arbitrary browser heights divided by 32px yield fractional line positions that throw all subsequent sections off-grid.

---

## 2. Strict Rule: Background Line Interval Typography

**DO NOT use standard Tailwind font size classes** (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, etc.) or arbitrary pixel sizes (`text-[14px]`).
**DO NOT use arbitrary Tailwind relative leading overrides** (`leading-tight`, `leading-snug`, `leading-relaxed`, `leading-loose`) as they break the 32px line interval rhythm.

Instead, **ALWAYS use the custom line interval scale** configured in `tailwind.config.mjs`:

| Tailwind Class | Line Interval | Font Size | Line Height | Typical Usage / Roles |
|---|---|---|---|---|
| `text-0.25` | 0.25 lines | `8px` (`0.5rem`) | `16px` (`1rem`) | Micro tags, tiny indicators |
| `text-0.375` | 0.375 lines | `12px` (`0.75rem`) | `16px` (`1rem`) | Badges, tags, folder markers ("Folder 01 // Selected Work"), small button sizes |
| `text-0.5` | 0.5 lines | `16px` (`1rem`) | `32px` (`2rem` / 1 line) | Standard body text, button labels, inputs, handwritten annotations ("2026 portfolio notes") |
| `text-0.75` | 0.75 lines | `24px` (`1.5rem`) | `32px` (`2rem` / 1 line) | Card titles, prominent subheadings, sticky note quotes |
| `text-1` | 1 line | `32px` (`2rem`) | `32px` (`2rem` / 1 line) | Section H2 headings ("Featured Projects", "Core Stack & Skills"), dialog titles |
| `text-1.25` | 1.25 lines | `40px` (`2.5rem`) | `64px` (`4rem` / 2 lines) | Intermediate display titles |
| `text-1.5` | 1.5 lines | `48px` (`3rem`) | `64px` (`4rem` / 2 lines) | Page titles, large banner headlines |
| `text-2` | 2 lines | `64px` (`4rem`) | `64px` (`4rem` / 2 lines) | Hero H1 main headline ("Building refined web products with...") |
| `text-2.5` | 2.5 lines | `80px` (`5rem`) | `96px` (`6rem` / 3 lines) | Extra large display numbers / titles |
| `text-3` | 3 lines | `96px` (`6rem`) | `96px` (`6rem` / 3 lines) | Giant decorative display accents |

---

## 3. Strict Rule: Multi-Line Text Line-Box Invariant (Inline vs Inline-Block)

**NEVER use `inline-block` with padding/margins inside multiline text blocks (like headings).**
- An `inline-block` box with padding inflates that specific line's line-box height (e.g. from 64px to 70px+), causing all subsequent wrapped lines to drift away from the background notebook lines.
- **Rule**: Always use `display: inline; padding: 0;` for inline decorations (markers, highlights, tags), drawing visual backgrounds with `::before` pseudo-elements positioned absolutely so they do not expand the line-box.

---

## 4. Strict Rule: Quantized Spacing Scale (`line-*`)

**DO NOT use arbitrary Tailwind spacing classes** (`p-3`, `p-5`, `mb-7`, `mt-10`, etc.) for vertical margins, paddings, and heights.

Instead, **ALWAYS use the quantized `line-*` spacing scale**:
- `*-line-0.25`: 8px (0.25 line)
- `*-line-0.5`: 16px (0.5 line — symmetric padding `py-line-0.5` equals 32px total)
- `*-line-0.75`: 24px (0.75 line)
- `*-line-1`: 32px (1 line — standard margins, card padding, buttons)
- `*-line-1.5`: 48px (1.5 lines — section heading margins, button heights `h-line-1.5`)
- `*-line-2`: 64px (2 lines — section vertical padding)
- `*-line-3`: 96px (3 lines — large desktop section padding)

---

## 5. Optical Baseline Calibration (`.align-to-rule`)

When text needs to physically rest on top of the blue ruled line:
- Add `.align-to-rule` to apply the calibrated vertical shift per font family (`--baseline-offset: 4px` for Caveat, `5px` for Sans, `6px` for Kalam).
- For large display headings (`text-1.5` / `text-2`), use `translate-y-[6px]` so letter baselines physically sit flat on top of the blue ruled line, allowing descenders (`p`, `g`, `y`, `j`, `q`) to dip naturally below.

---

## 6. Unified Fixture & Fastener System (`src/components/ui/fixture.tsx`)

Container components (`Card`, `StickyNoteStack`) share a unified fixture engine via `<Fixture type="..." />` or container props (`fixture="tape-corners" | "tape" | "pin" | "staple" | "paperclip" | "none"`).

### Fixture Types & Geometry Rules
1. **`PushPin` (`pin`)**:
   - 3D tactile pushpin with needle shadow, metallic core, and highlight glare.
   - Supported colors: `rose`, `red`, `blue`, `yellow`, `green`, `slate`.
   - Positions: `top-middle` (centered across top edge), `top-left`, `top-right`.
2. **`Staple` (`staple`)**:
   - Realistic gunmetal metallic wire SVG with paper slits and wire shadow.
   - Positions: `top-middle`, `top-left` (`top-3.5 left-4`), `top-right` (`top-3.5 right-4`), `diagonal-left` (`top-3.5 left-3.5 rotate-[-35deg]`), `diagonal-right` (`top-3.5 right-3.5 rotate-[35deg]`).
3. **`Tape` (`tape`)**:
   - Single washi tape strip with dashed cut edges and semi-translucent colors (`yellow`, `blue`, `pink`, `green`).
   - Standard Tailwind sizes: `sm` (`h-4 w-16`), `default` (`h-6 w-24`), `lg` (`h-7 w-32`).
   - **Isolation Rule**: Positioning coordinate translation (`-translate-x-1/2 -translate-y-1/2`) is placed on an outer wrapper div to prevent CSS rotation properties from overriding translate coordinates.
4. **`CornerTape` (`tape-corners`)**:
   - Tapes **two opposite corners** of a card/container diagonally:
     - `orientation="top-left-bottom-right"` ( \ )
     - `orientation="top-right-bottom-left"` ( / )
5. **`Paperclip` (`paperclip`)**:
   - Hand-drawn tactile wire paperclip placed on card edges.

---

## 7. Container Tokens & Sticky Note Architecture

### Unified Design Tokens (`src/lib/container-tokens.ts`)
- Colors: `yellow`, `blue`, `pink`, `green`, `paper`, `white`, `slate`.
- Borders: `sketch-box`, `sketch-box-sm`, `sketch-box-thick`, `sketch-box-dashed`.
- Shadows: `doodle-shadow`, `doodle-shadow-sm`, `doodle-shadow-lg`, `doodle-shadow-hover`.

### Sticky Note Rules (`StickyNoteStack.tsx`)
- **Authentic 90° Square Edges**: Sticky notes must use clean 90-degree square/rectangular edges (`rounded-none` and solid border lines). Do NOT apply curved sketch borders to sticky notes, as physical Post-it pads are clean-cut paper.
- **1:1 Square Post-It Proportions**: Defaults to `aspectRatio="square"` (`aspect-square min-w-[160px] min-h-[160px]`). For wide horizontal banners, specify `aspectRatio="auto"`.
- **Height Synchronization**: The top note and all underlying stacked layers must maintain identical `h-full w-full` dimensions to prevent the top sheet from rendering as a short strip on top of stretched background sheets.

---

## 8. Detached Glassmorphism Modals & Dialogs

- Modals and dialogs (`src/components/ui/dialog.tsx`) are **intentionally detached** from the 32px grid.
- Use `bg-slate-950/40 backdrop-blur-md` for the overlay scrim to artfully blur the notebook background.
- Use `bg-[#fffefc]/90 backdrop-blur-xl sketch-box-thick` with frosted acrylic shadow for the modal card.

---

## 9. UI Components Conventions

- **`Badge` (`src/components/ui/badge.tsx`)**: Defaults to quantized 1-line height (`min-h-line-1 px-3 py-line-0.25 text-0.375 font-sketch`). Supports `variant` and `size` (`sm`, `default`, `lg`).
- **`Button` (`src/components/ui/button.tsx`)**: `sm` uses `h-line-1 text-0.375`, `default` and `lg` use `h-line-1.5 text-0.5`.
- **`Card` (`src/components/ui/card.tsx`)**: Supports `variant`, `borderStyle`, `shadowStyle`, and native `fixture` (`pin`, `staple`, `tape`, `tape-corners`, `paperclip`).
- **`CardTitle` (`src/components/ui/card.tsx`)**: Uses `text-0.75 font-bold font-sans`.
- **`CardDescription` (`src/components/ui/card.tsx`)**: Uses `text-0.5 font-normal`.
- **`DialogTitle` (`src/components/ui/dialog.tsx`)**: Uses `text-1 font-bold font-sans`.
- **`DialogDescription` (`src/components/ui/dialog.tsx`)**: Uses `text-0.5 font-normal`.

---

## 10. Automated Debugging & Testing Protocols

1. **Interactive Component Test Bench**:
   - Access **`/test`** (`src/pages/test.astro` and `src/components/ComponentPlayground.tsx`) to dynamically verify all container types, fixture combinations, and lorem ipsum content lengths.
2. **Headless Visual Audit**:
   ```bash
   google-chrome --headless=new --disable-gpu --window-size=1280,900 --screenshot=desktop.png http://localhost:4321
   google-chrome --headless=new --disable-gpu --window-size=390,844 --screenshot=mobile.png http://localhost:4321
   ```
3. **Inspect Line Bounding Rects**:
   ```javascript
   const h1 = document.querySelector('h1');
   const range = document.createRange();
   range.selectNodeContents(h1);
   const rects = Array.from(range.getClientRects());
   // Check that (rects[i+1].top - rects[i].top) strictly equals 64px (or 32px)
   ```
