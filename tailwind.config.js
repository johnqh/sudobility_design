import { createTailwindPreset } from "@sudobility/design";

/** @type {import('tailwindcss').Config} */
export default {
  // Maps the design system's semantic tokens (bg-primary, border-input, ...) to
  // hsl(var(--primary)) etc. The variable values come from index.css (:root /
  // .dark), so the design components are theme-aware and flip light/dark. The
  // brand colors / gradients in theme.extend below are intentional and kept.
  presets: [createTailwindPreset()],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Scan installed npm packages for dynamic Tailwind classes
    "./node_modules/@sudobility/components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@sudobility/design/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@sudobility/devops-components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@sudobility/subscription-components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@sudobility/building_blocks/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          "bg-primary": "var(--color-bg-primary)",
          "bg-secondary": "var(--color-bg-secondary)",
          "bg-tertiary": "var(--color-bg-tertiary)",
          "text-primary": "var(--color-text-primary)",
          "text-secondary": "var(--color-text-secondary)",
          "text-tertiary": "var(--color-text-tertiary)",
          border: "var(--color-border)",
          "border-light": "var(--color-border-light)",
          "hover-bg": "var(--color-hover-bg)",
          "hover-border": "var(--color-hover-border)",
        },
        // Sudobility custom colors (used by landing content components)
        primary: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
        },
        accent: {
          cyan: "#06B6D4",
          pink: "#EC4899",
        },
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          border: "#334155",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
        "gradient-accent": "linear-gradient(135deg, #06B6D4 0%, #EC4899 100%)",
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        blob: "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
