import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        violet: 'var(--violet)',
        card: 'var(--card)',
        muted: 'var(--muted)',
        g1: 'var(--g1)',
        g2: 'var(--g2)',
        g3: 'var(--g3)',
        g4: 'var(--g4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tight: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },
      fontFeatureSettings: {
        'tnum': '"tnum"',
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, var(--g1), var(--g2) 40%, var(--g3) 70%, var(--g4))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
