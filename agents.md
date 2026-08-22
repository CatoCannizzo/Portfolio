# Agent Guidelines & Typography System

This document specifies the design system rules, typography scale, spacing conventions, and layout architecture for this project. All AI agents working on this codebase must strictly adhere to these guidelines.

---

## 1. Background Grid & Master CSS Grid Architecture

The portfolio aesthetic is built around a tactile, lined notebook theme (`.notebook-paper-bg` in `src/styles/globals.css`). The background ruled lines have a fixed cycle distance of **32px** (2rem).

### Master Grid Layout (`.notebook-grid`)
- Pages use `<main class="notebook-grid relative z-10 w-full">` with `grid-auto-rows: minmax(32px, auto)` (`auto-rows-line` in Tailwind).
- Sections naturally expand to fit dynamic content with quantized vertical padding (`py-line-2` or `py-line-3`).
- **Header Synchronization**: The header is fixed to `h-16` (64px = exactly 2 lines) with `border-b-2`, ensuring that content in `<main>` starts flush on Line 3 (`Y = 64px`).

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

## 3. Strict Rule: Quantized Spacing Scale (`line-*`)

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

## 4. Optical Baseline Calibration (`.align-to-rule`)

When text needs to physically rest on top of the blue ruled line:
- Add `.align-to-rule` to apply the calibrated vertical shift per font family (`--baseline-offset: 4px` for Caveat, `5px` for Sans, `6px` for Patrick Hand).

---

## 5. Detached Glassmorphism Modals & Dialogs

- Modals and dialogs (`src/components/ui/dialog.tsx`) are **intentionally detached** from the 32px grid.
- Use `bg-slate-950/40 backdrop-blur-md` for the overlay scrim to artfully blur the notebook background.
- Use `bg-[#fffefc]/90 backdrop-blur-xl sketch-box-thick` with frosted acrylic shadow for the modal card.

---

## 6. Responsive Font Size Rules

For large headings, use responsive interval pairings:
- **Hero H1**: `className="text-1.5 md:text-2 font-bold ..."`
- **Subtitles**: `className="text-0.5 md:text-0.75 ..."`
- **Section Headings**: `className="text-1 font-bold ..."`

---

## 7. Font Families

- `font-sans`: `Plus Jakarta Sans` — Clean modern sans-serif.
- `font-hand`: `Caveat` — Expressive handwriting for margin notes, stickers, timestamps.
- `font-sketch`: `Patrick Hand` — Architectural/doodle lettering for badges, buttons, folder tabs.

---

## 8. UI Components Conventions

- **`Badge` (`src/components/ui/badge.tsx`)**: Defaults to `text-0.375 font-sketch`.
- **`Button` (`src/components/ui/button.tsx`)**: `sm` uses `h-line-1 text-0.375`, `default` and `lg` use `h-line-1.5 text-0.5`.
- **`CardTitle` (`src/components/ui/card.tsx`)**: Uses `text-0.75 font-bold font-sans`.
- **`CardDescription` (`src/components/ui/card.tsx`)**: Uses `text-0.5 font-normal`.
- **`DialogTitle` (`src/components/ui/dialog.tsx`)**: Uses `text-1 font-bold font-sans`.
- **`DialogDescription` (`src/components/ui/dialog.tsx`)**: Uses `text-0.5 font-normal`.
