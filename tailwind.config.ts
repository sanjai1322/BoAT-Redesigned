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
        'bg-primary': '#0A0A0A',
        'accent-red': '#FF2D2D',
        'accent-red-glow': 'rgba(255, 45, 45, 0.4)',
        'text-primary': '#F5F5F5',
        'text-muted': '#888888',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        fraunces: ['var(--font-fraunces)', 'serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
