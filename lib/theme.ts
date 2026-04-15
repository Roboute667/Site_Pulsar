export const colors = {
  bg: '#0a0a0a',
  fg: '#e8e6ee',
  violet: '#742aa9',
  card: '#111218',
  muted: '#a8a2b6',
  g1: '#b477e0',
  g2: '#8a52ba',
  g3: '#362462',
  g4: '#1a143c',
} as const

export const gradients = {
  violet: 'linear-gradient(135deg, #b477e0, #8a52ba 40%, #362462 70%, #1a143c)',
  radial: 'radial-gradient(circle at center, #742aa9 0%, transparent 70%)',
  text: 'linear-gradient(135deg, #b477e0, #8a52ba)',
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
