/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          pink: '#f43f5e',
          purple: '#8b5cf6',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
        stage: {
          light: '#f8fafc',
          dark: '#0b0f19',
          surfaceLight: '#ffffff',
          surfaceDark: '#111827',
          borderLight: '#e2e8f0',
          borderDark: '#1e293b',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-pink': '0 0 25px -5px rgba(244, 63, 94, 0.4)',
      },
    },
  },
  plugins: [],
}
