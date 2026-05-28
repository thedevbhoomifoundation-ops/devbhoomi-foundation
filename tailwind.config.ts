import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0B3C5D", // Deep Himalayan Blue
          950: "#051e30",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#E58A1F", // Sacred Orange
          950: "#C97015",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        accent: ["'Cormorant Garamond'", "serif"],
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "4rem",
        "5xl": "5rem",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(11, 60, 93, 0.05)",
        md: "0 4px 6px -1px rgba(11, 60, 93, 0.1), 0 2px 4px -1px rgba(11, 60, 93, 0.06)",
        lg: "0 10px 15px -3px rgba(11, 60, 93, 0.1), 0 4px 6px -2px rgba(11, 60, 93, 0.05)",
        xl: "0 20px 25px -5px rgba(11, 60, 93, 0.1), 0 10px 10px -5px rgba(11, 60, 93, 0.04)",
        "2xl": "0 25px 50px -12px rgba(11, 60, 93, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(11, 60, 93, 0.05)",
        premium: "0 20px 40px -10px rgba(11, 60, 93, 0.15)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #0B3C5D 0%, #1A5A7D 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #E58A1F 0%, #F0A33A 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0B3C5D 0%, #1A5A7D 50%, #3F7D3A 100%)",
        "gradient-soft":
          "linear-gradient(135deg, rgba(11, 60, 93, 0.05) 0%, rgba(229, 138, 31, 0.05) 100%)",
        "gradient-dark":
          "linear-gradient(135deg, #071826 0%, #122B3D 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-down": "slideDown 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "bounce-light": "bounceLight 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        bounceLight: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        pulseSoft: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms",
        slower: "700ms",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
