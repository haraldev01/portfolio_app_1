import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: { height: "0" },
        },
        "skip-button-click": {
          from: {
            transform: "scale(0.7)",
            opacity: "0.7",
          },
          to: { transform: "scale(1)", opacity: "0" },
        },
        "text-scroll-horizontal": {
          "0%": { transform: "translateX(0px)" },
          "30%": {
            transform: "translateX(calc(-100% + var(--translate-distance)))",
          },
          "50%": {
            transform: "translateX(calc(-100% + var(--translate-distance)))",
          },
          "80%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(0px)" },
        },
        "text-scroll-vertical": {
          "0%": { transform: "translateY(0px)" },
          "30%": {
            transform: "translateY(calc(-100% + var(--translate-distance)))",
          },
          "50%": {
            transform: "translateY(calc(-100% + var(--translate-distance)))",
          },
          "80%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(0px)" },
        },
        /**
         * --translate-distance: how far should the content be translated in a given direction
         * --translate-time: what is the total animation time
         */
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "skip-button-click": "skip-button-click 0.2s ease-out",
        "text-scroll-horizontal":
          "text-scroll-horizontal var(--translate-time) linear infinite",
        "text-scroll-vertical":
          "text-scroll-vertical var(--translate-time) linear infinite",
        gradient: "gradient 8s linear infinite",
        "spin-slow": "spin 5s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        "conic-progress":
          "conic-gradient(#fff var(--progress), #fff8 var(--progress))",
      },
    },
  },
} satisfies Config;

export default config;
