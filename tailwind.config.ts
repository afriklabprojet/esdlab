import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7fe",
          100: "#e0edfb",
          200: "#b9d9f8",
          300: "#7dbdf2",
          400: "#509be2",
          500: "#3478BE",
          600: "#2862a5",
          700: "#214f88",
          800: "#1c4371",
          900: "#15355e",
          950: "#0e2340",
        },
        secondary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fdd7a9",
          300: "#fbb870",
          400: "#f99338",
          500: "#E8721D",
          600: "#d05d0e",
          700: "#ac470c",
          800: "#8a3a11",
          900: "#703211",
          950: "#3d1606",
        },
        accent: {
          50: "#fdf9ec",
          100: "#f9f0ce",
          200: "#f3e09d",
          300: "#eacb63",
          400: "#e3b53a",
          500: "#D4A843",
          600: "#b78a2a",
          700: "#966921",
          800: "#7a5422",
          900: "#654621",
          950: "#39240f",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in-down": "fadeInDown 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-down": "slideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-left": "slideLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-right": "slideRight 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-soft": "bounceSoft 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(52, 120, 190, 0.2)" },
          "100%": { boxShadow: "0 0 30px rgba(232, 114, 29, 0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        elegant: "0 12px 30px rgba(15, 23, 42, 0.08)",
        "elegant-lg": "0 24px 60px rgba(15, 23, 42, 0.14)",
        "elegant-xl": "0 32px 80px rgba(15, 23, 42, 0.16)",
        "glow-primary": "0 0 40px rgba(52, 120, 190, 0.15)",
        "glow-secondary": "0 0 40px rgba(232, 114, 29, 0.15)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};

export default config;
