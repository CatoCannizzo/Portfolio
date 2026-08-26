/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
        sketch: ['"Kalam"', 'cursive'],
      },
      fontSize: {
        '0.25': ['0.5rem', { lineHeight: '1rem' }],      /* 8px (0.25 lines, 16px line-height) */
        '0.375': ['0.75rem', { lineHeight: '1rem' }],    /* 12px (0.375 lines, 16px line-height) */
        '0.5': ['1rem', { lineHeight: '2rem' }],         /* 16px (0.5 lines, 32px / 1 line-height) */
        '0.75': ['1.5rem', { lineHeight: '2rem' }],      /* 24px (0.75 lines, 32px / 1 line-height) */
        '1': ['2rem', { lineHeight: '2rem' }],           /* 32px (1 line, 32px / 1 line-height) */
        '1.25': ['2.5rem', { lineHeight: '4rem' }],      /* 40px (1.25 lines, 64px / 2 line-height) */
        '1.5': ['3rem', { lineHeight: '4rem' }],         /* 48px (1.5 lines, 64px / 2 line-height) */
        '2': ['4rem', { lineHeight: '4rem' }],           /* 64px (2 lines, 64px / 2 line-height) */
        '2.5': ['5rem', { lineHeight: '6rem' }],         /* 80px (2.5 lines, 96px / 3 line-height) */
        '3': ['6rem', { lineHeight: '6rem' }],           /* 96px (3 lines, 96px / 3 line-height) */
      },
      gridAutoRows: {
        'line': '32px',
        'line-0.5': '16px',
        'line-2': '64px',
      },
      spacing: {
        'line-0.25': '8px',
        'line-0.5': '16px',
        'line-0.75': '24px',
        'line-1': '32px',
        'line-1.5': '48px',
        'line-2': '64px',
        'line-2.5': '80px',
        'line-3': '96px',
        'line-4': '128px',
        'line-5': '160px',
        'line-6': '192px',
        'line-8': '256px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        sketch: "255px 15px 225px 15px/15px 225px 15px 255px",
        'sketch-sm': "255px 10px 225px 10px/10px 225px 10px 255px",
        'sketch-lg': "255px 25px 225px 25px/25px 225px 25px 255px",
      },
      boxShadow: {
        doodle: "3px 3px 0px 0px #1e293b",
        'doodle-sm': "2px 2px 0px 0px #1e293b",
        'doodle-lg': "5px 5px 0px 0px #1e293b",
        'doodle-hover': "6px 6px 0px 0px #1e293b",
        'paper-shadow': "0 4px 12px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03)",
      },
      keyframes: {
        "scribble-draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "scribble-draw": "scribble-draw 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
