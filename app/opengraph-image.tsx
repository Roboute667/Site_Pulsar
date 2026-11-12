import { ImageResponse } from 'next/og'

export const alt = 'Pulsar | Alternative Multi-Strategy Investment Fund'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The image shown when a page of the site is shared: the site's own name and headline. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #362462 0%, #0a0a0a 70%)',
          color: '#e8e6ee',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: 16 }}>PULSAR</div>
        <div style={{ marginTop: 24, fontSize: 44, color: '#b477e0' }}>
          Alternative Multi-Strategy Investment Fund
        </div>
      </div>
    ),
    size,
  )
}
