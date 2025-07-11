/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'background-tertiary': 'var(--background-tertiary)',
        foreground: 'var(--foreground)',
        'foreground-secondary': 'var(--foreground-secondary)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        border: 'var(--border)',
        'glow-cyan': 'var(--glow-cyan)',
        'glow-pink': 'var(--glow-pink)',
        'glow-green': 'var(--glow-green)',
      },
      maxWidth: {
        'navbar': '1600px',
        'navbar-content': '1400px',
      },
      minWidth: {
        'navbar': '320px',
        'nav-item': '60px',
      },
      spacing: {
        'navbar-x': 'clamp(1rem, 2vw, 2rem)',
        'navbar-y': 'clamp(0.75rem, 1.5vw, 1rem)',
        'nav-gap': 'clamp(0.25rem, 1vw, 1rem)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'Courier New', 'monospace'],
        mono: ['Courier New', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
        'cyber-float': 'cyber-float 6s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 3s linear infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 65, 0.5)',
        'cyber': '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
