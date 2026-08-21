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
        sketch: ['"Patrick Hand"', 'cursive'],
      },
      colors: {
        paper: {
          DEFAULT: "#fdfbf7",
          dark: "#f6f2e8",
          card: "#ffffff",
          yellow: "#fef9c3",
          blue: "#eff6ff",
          pink: "#fdf2f8",
        },
        ink: {
          DEFAULT: "#1e293b",
          light: "#475569",
          muted: "#94a3b8",
          blue: "#1d4ed8",
        },
        ruled: {
          blue: "rgba(96, 165, 250, 0.45)",
          red: "rgba(244, 63, 94, 0.75)",
        },
        highlighter: {
          yellow: "rgba(254, 240, 138, 0.7)",
          blue: "rgba(186, 230, 253, 0.7)",
          pink: "rgba(251, 207, 232, 0.7)",
          green: "rgba(187, 247, 208, 0.7)",
        },
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
        "doodle-wiggle": {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "25%": { transform: "rotate(-1.5deg) scale(1.02)" },
          "75%": { transform: "rotate(1.5deg) scale(1.02)" },
        },
        "doodle-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05) rotate(1deg)" },
        },
        "scribble-draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-4px) rotate(0.5deg)" },
        },
      },
      animation: {
        "doodle-wiggle": "doodle-wiggle 0.35s ease-in-out",
        "doodle-pulse": "doodle-pulse 2s ease-in-out infinite",
        "scribble-draw": "scribble-draw 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
