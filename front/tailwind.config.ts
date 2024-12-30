import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green500: "#3c9083",
        customGreen: {
          50: "#F3FAF8",
          100: "#D7F0E9",
          200: "#B0DFD4",
          300: "#74C3B3",
          400: "#55AC9D",
          500: "#3C9083",
          600: "#2E736A",
          700: "#285D57",
          800: "#244B47",
          900: "#21403D",
          950: "#0E2523",
        },
        snowWhite: '#FFFAFA',
        pearl: '#F5F3F2',
      },

      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        run: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100px)' },
        },
      },
      animation: {
        jump: 'jump 1s ease-in-out infinite',
        run: 'run 1s linear infinite',
      },
    },
  },
  
  plugins: [],
} satisfies Config;
