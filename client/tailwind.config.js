/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          pink: 'var(--color-accent-pink)',
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
