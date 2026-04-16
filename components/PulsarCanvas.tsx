'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface PulsarCanvasProps {
  className?: string
  mousePosition: { x: number; y: number }
}

export function PulsarCanvas({ className, mousePosition }: PulsarCanvasProps) {
  const mainRef = useRef<HTMLCanvasElement>(null)
  const bloomRef = useRef<HTMLCanvasElement>(null)

  const stateRef = useRef({
    W: 0, H: 0, cx: 0, cy: 0, dpr: 1,
    stars: [] as any[],
    mxRaw: 0.5, smoothMx: 0.5,
    t: 0, last: 0, curAngle: 0,
    clickOscTime: -1, clickOscDir: 1, clickFlash: 0,
    raf: 0,
  })

  // Sync mouse from parent (normalized -1..1 to 0..1)
  useEffect(() => {
    stateRef.current.mxRaw = (mousePosition.x + 1) / 2
  }, [mousePosition.x])

  const makeStars = useCallback(() => {
    const NSTARS = 400
    return Array.from({ length: NSTARS }, () => {
      const isBright = Math.random() < 0.15
      return {
        x: Math.random(), y: Math.random(),
        r: isBright ? Math.random() * 1.8 + 1.2 : Math.random() * 1.3 + 0.4,
        br: isBright ? Math.random() * 0.3 + 0.7 : Math.random() * 0.45 + 0.25,
        sp: Math.random() * 1.2 + 0.3,
        ph: Math.random() * 6.28,
        dp: Math.random() * 0.7 + 0.3,
        hue: Math.random() < 0.3 ? 1 : 0,
      }
    })
  }, [])

  useEffect(() => {
    const mainCvs = mainRef.current
    const bloomCvs = bloomRef.current
    if (!mainCvs || !bloomCvs) return

    const ctx = mainCvs.getContext('2d', { alpha: true })
    const bCtx = bloomCvs.getContext('2d', { alpha: true })
    if (!ctx || !bCtx) return

    const S = stateRef.current
    const TAU = Math.PI * 2
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const CLICK_FLASH = 1.0
    const FLASH_DECAY = 3.5
    const OSC_AMPLITUDE = 1.5 * Math.PI / 180
    const OSC_FREQ = 2
    const OSC_DURATION = 1.1

    function resize() {
      S.dpr = Math.min(devicePixelRatio || 1, 2)
      S.W = innerWidth; S.H = innerHeight
      for (const c of [mainCvs!, bloomCvs!]) {
        c.width = S.W * S.dpr; c.height = S.H * S.dpr
      }
      ctx!.setTransform(S.dpr, 0, 0, S.dpr, 0, 0)
      bCtx!.setTransform(S.dpr, 0, 0, S.dpr, 0, 0)
      S.cx = S.W / 2; S.cy = S.H / 2
      S.stars = makeStars()
    }

    function onClick() {
      S.clickOscDir = Math.random() < 0.5 ? 1 : -1
      S.clickOscTime = 0
      S.clickFlash = Math.min(S.clickFlash + CLICK_FLASH, 1.5)
    }

    window.addEventListener('mousedown', onClick)
    window.addEventListener('touchstart', onClick, { passive: true })
    window.addEventListener('resize', resize)
    resize()

    // ── Draw functions ──

    function drawStars(parallax: number) {
      for (const s of S.stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(S.t * s.sp + s.ph)
        const a = s.br * (0.5 + 0.5 * twinkle)
        const px = ((s.x * S.W + parallax * s.dp * 40) % S.W + S.W) % S.W
        const py = s.y * S.H
        const col = s.hue ? `rgba(255,235,210,${a})` : `rgba(210,225,255,${a})`
        if (s.br > 0.5) {
          const glowR = s.r * 5
          const ga = a * 0.3
          const grd = ctx!.createRadialGradient(px, py, 0, px, py, glowR)
          grd.addColorStop(0, s.hue ? `rgba(255,235,210,${ga})` : `rgba(200,180,240,${ga})`)
          grd.addColorStop(1, 'rgba(0,0,0,0)')
          ctx!.fillStyle = grd
          ctx!.fillRect(px - glowR, py - glowR, glowR * 2, glowR * 2)
        }
        ctx!.globalAlpha = a
        ctx!.fillStyle = col
        ctx!.beginPath()
        ctx!.arc(px, py, s.r, 0, TAU)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    function drawBeam(angle: number, dir: number, pulse: number) {
      const len = Math.hypot(S.W, S.H) * 0.85
      const flicker = 1 + 0.06 * Math.sin(S.t * 7.3 + dir * 2) + 0.04 * Math.sin(S.t * 13.1 + dir)
      const ip = pulse * flicker

      ctx!.save()
      ctx!.translate(S.cx, S.cy)
      ctx!.rotate(angle + (dir < 0 ? Math.PI : 0))

      const layers = [
        { w: 160, color: [116,42,169],  a: 0.03,  fade: 2.2 },
        { w: 95,  color: [130,55,190],  a: 0.055, fade: 2.0 },
        { w: 50,  color: [150,80,210],  a: 0.11,  fade: 1.8 },
        { w: 22,  color: [190,160,235], a: 0.28,  fade: 1.5 },
        { w: 8,   color: [230,220,250], a: 0.65,  fade: 1.3 },
        { w: 2.5, color: [255,255,255], a: 0.90,  fade: 1.1 },
      ]

      const thickMod = 1 + 0.06 * Math.sin(S.t * 1.8 + dir * 0.7)

      for (const L of layers) {
        const hw = L.w * thickMod * 0.5
        const segs = 32
        for (let i = 0; i < segs; i++) {
          const t0 = i / segs, t1 = (i + 1) / segs
          const tMid = (t0 + t1) * 0.5
          const y0 = -t0 * len, y1 = -t1 * len
          const taper0 = 1 + Math.pow(t0, 0.6) * 1.8
          const taper1 = 1 + Math.pow(t1, 0.6) * 1.8
          const w0 = hw * taper0, w1 = hw * taper1
          const fade = Math.pow(1 - tMid, L.fade)

          ctx!.globalAlpha = L.a * ip * fade
          const [r, g, b] = L.color
          const gw = Math.max(w0, w1)
          const grd = ctx!.createLinearGradient(-gw, 0, gw, 0)
          grd.addColorStop(0, `rgba(${r},${g},${b},0)`)
          grd.addColorStop(0.2, `rgba(${r},${g},${b},0.4)`)
          grd.addColorStop(0.4, `rgba(${r},${g},${b},0.85)`)
          grd.addColorStop(0.5, `rgba(${r},${g},${b},1)`)
          grd.addColorStop(0.6, `rgba(${r},${g},${b},0.85)`)
          grd.addColorStop(0.8, `rgba(${r},${g},${b},0.4)`)
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx!.fillStyle = grd

          ctx!.beginPath()
          ctx!.moveTo(-w0, y0)
          ctx!.lineTo(-w1, y1)
          ctx!.lineTo(w1, y1)
          ctx!.lineTo(w0, y0)
          ctx!.closePath()
          ctx!.fill()
        }
      }

      // Chromatic aberration
      const abOff = 5 * thickMod
      const abPairs: [string, number][] = [['rgba(255,60,60,', 1], ['rgba(60,60,255,', -1]]
      for (const [color, sign] of abPairs) {
        const hw2 = 10 * thickMod * 0.5
        for (let i = 0; i < 10; i++) {
          const t0 = i / 10, t1 = (i + 1) / 10
          const y0 = -t0 * len, y1 = -t1 * len
          const tp0 = 1 + Math.pow(t0, 0.6) * 1.8
          const tp1 = 1 + Math.pow(t1, 0.6) * 1.8
          const w0 = hw2 * tp0, w1 = hw2 * tp1
          const fade = Math.pow(1 - (t0 + t1) * 0.5, 1.8)
          ctx!.globalAlpha = 0.045 * ip * fade
          ctx!.fillStyle = color + '1)'
          ctx!.beginPath()
          ctx!.moveTo(-w0 + abOff * sign, y0)
          ctx!.lineTo(-w1 + abOff * sign, y1)
          ctx!.lineTo(w1 + abOff * sign, y1)
          ctx!.lineTo(w0 + abOff * sign, y0)
          ctx!.closePath()
          ctx!.fill()
        }
      }

      ctx!.globalAlpha = 1
      ctx!.restore()
    }

    function drawHaloRays(pulse: number) {
      const n = 28
      const r0 = Math.min(S.W, S.H) * 0.025
      const rMax = r0 * 5.5
      ctx!.save()
      ctx!.translate(S.cx, S.cy)
      ctx!.rotate(S.t * 0.025)
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU
        const lv = 0.55 + 0.45 * Math.sin(S.t * 0.7 + i * 1.9)
        const rl = rMax * lv
        const al = (0.022 + 0.015 * Math.sin(S.t * 1.1 + i * 0.8)) * pulse
        const grd = ctx!.createLinearGradient(0, 0, Math.cos(a) * rl, Math.sin(a) * rl)
        grd.addColorStop(0, `rgba(150,80,210,${al})`)
        grd.addColorStop(0.5, `rgba(116,42,169,${al * 0.45})`)
        grd.addColorStop(1, 'rgba(116,42,169,0)')
        ctx!.beginPath()
        ctx!.moveTo(0, 0)
        ctx!.lineTo(Math.cos(a - 0.018) * rl, Math.sin(a - 0.018) * rl)
        ctx!.lineTo(Math.cos(a + 0.018) * rl, Math.sin(a + 0.018) * rl)
        ctx!.closePath()
        ctx!.fillStyle = grd
        ctx!.fill()
      }
      ctx!.restore()
    }

    function drawCore(pulse: number) {
      const r = Math.min(S.W, S.H) * 0.023
      const radials: [number, [number, number, number, number, number][]][] = [
        [r * 14, [[0, 116,42,169, 0.06],[0.35, 116,42,169, 0.028],[1, 116,42,169, 0]]],
        [r * 8,  [[0, 130,55,190, 0.13],[0.45, 140,65,200, 0.05],[1, 130,55,190, 0]]],
        [r * 4.5,[[0, 170,110,230, 0.35],[0.5, 150,80,210, 0.12],[1, 140,70,200, 0]]],
        [r * 2.4,[[0, 220,200,245, 0.75],[0.4, 190,160,235, 0.35],[1, 170,130,225, 0]]],
        [r * 1.1,[[0, 255,255,255, 0.97],[0.25, 248,245,255, 0.9],[0.55, 210,190,240, 0.5],[1, 180,150,230, 0]]],
      ]
      for (const [radius, stops] of radials) {
        const rr = radius * (0.93 + 0.07 * pulse)
        const g = ctx!.createRadialGradient(S.cx, S.cy, 0, S.cx, S.cy, rr)
        for (const [pos, rv, gv, bv, av] of stops) {
          g.addColorStop(pos, `rgba(${rv},${gv},${bv},${av * pulse})`)
        }
        ctx!.fillStyle = g
        ctx!.fillRect(S.cx - rr, S.cy - rr, rr * 2, rr * 2)
      }
    }

    function drawDisk(angle: number, pulse: number) {
      ctx!.save()
      ctx!.translate(S.cx, S.cy)
      ctx!.rotate(angle)
      const rx = Math.min(S.W, S.H) * 0.065
      ctx!.scale(1, 0.16)
      const g = ctx!.createRadialGradient(0, 0, rx * 0.55, 0, 0, rx * 1.35)
      g.addColorStop(0, 'rgba(116,42,169,0)')
      g.addColorStop(0.35, `rgba(116,42,169,${0.04 * pulse})`)
      g.addColorStop(0.55, `rgba(140,65,200,${0.055 * pulse})`)
      g.addColorStop(0.8, `rgba(116,42,169,${0.02 * pulse})`)
      g.addColorStop(1, 'rgba(116,42,169,0)')
      ctx!.fillStyle = g
      ctx!.beginPath()
      ctx!.arc(0, 0, rx * 1.35, 0, TAU)
      ctx!.fill()
      ctx!.restore()
    }

    function drawSpikes(pulse: number) {
      const n = 4, maxL = Math.min(S.W, S.H) * 0.13 * pulse
      ctx!.save()
      ctx!.translate(S.cx, S.cy)
      ctx!.rotate(Math.PI / 4)
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU
        const l = maxL * (0.75 + 0.25 * Math.sin(S.t * 2.2 + i))
        const al = 0.065 * pulse
        const g = ctx!.createLinearGradient(0, 0, Math.cos(a) * l, Math.sin(a) * l)
        g.addColorStop(0, `rgba(220,200,245,${al})`)
        g.addColorStop(0.25, `rgba(170,110,230,${al * 0.4})`)
        g.addColorStop(1, 'rgba(116,42,169,0)')
        ctx!.fillStyle = g
        ctx!.beginPath()
        ctx!.moveTo(Math.cos(a - 0.006) * 3, Math.sin(a - 0.006) * 3)
        ctx!.lineTo(Math.cos(a) * l, Math.sin(a) * l)
        ctx!.lineTo(Math.cos(a + 0.006) * 3, Math.sin(a + 0.006) * 3)
        ctx!.closePath()
        ctx!.fill()
      }
      ctx!.restore()
    }

    function drawBloom() {
      bCtx!.clearRect(0, 0, S.W, S.H)
      bCtx!.save()
      bCtx!.filter = `blur(${Math.round(Math.min(S.W, S.H) * 0.018)}px)`
      bCtx!.drawImage(mainCvs!, 0, 0, S.W, S.H)
      bCtx!.restore()
    }

    // ── Main loop ──
    S.last = performance.now()

    function frame(now: number) {
      const dt = Math.min((now - S.last) / 1000, 0.05)
      S.last = now
      S.t += dt

      S.smoothMx = lerp(S.smoothMx, S.mxRaw, 1 - Math.pow(0.0001, dt))

      // Click oscillation
      let clickAngleOffset = 0
      if (S.clickOscTime >= 0) {
        S.clickOscTime += dt
        if (S.clickOscTime < OSC_DURATION) {
          const progress = S.clickOscTime / OSC_DURATION
          const envelope = 1 - progress
          const wave = Math.sin(progress * OSC_FREQ * TAU)
          clickAngleOffset = OSC_AMPLITUDE * envelope * envelope * wave * S.clickOscDir
        } else {
          S.clickOscTime = -1
        }
      }
      S.clickFlash *= Math.exp(-FLASH_DECAY * dt)
      if (S.clickFlash < 0.005) S.clickFlash = 0

      const maxTilt = 25 * Math.PI / 180
      const target = (S.smoothMx - 0.5) * 2 * maxTilt
      S.curAngle = lerp(S.curAngle, target, 1 - Math.pow(0.001, dt))
      S.curAngle += clickAngleOffset

      const p1 = Math.sin(S.t * TAU / 3.8)
      const p2 = Math.sin(S.t * TAU / 5.3 + 1.2)
      const p3 = Math.sin(S.t * TAU / 7.1 + 2.7)
      const pulse = Math.min(1.5, (0.72 + 0.28 * (p1 * 0.45 + p2 * 0.35 + p3 * 0.2)) + S.clickFlash * 0.5)

      // Clear
      ctx!.clearRect(0, 0, S.W, S.H)

      drawStars((S.smoothMx - 0.5) * 2)

      ctx!.save()
      ctx!.globalCompositeOperation = 'screen'
      drawHaloRays(pulse)
      drawDisk(S.curAngle, pulse)
      ctx!.restore()

      ctx!.save()
      ctx!.globalCompositeOperation = 'screen'
      drawBeam(S.curAngle, 1, pulse)
      drawBeam(S.curAngle, -1, pulse)
      ctx!.restore()

      ctx!.save()
      ctx!.globalCompositeOperation = 'screen'
      drawSpikes(pulse)
      drawCore(pulse)
      ctx!.restore()

      drawBloom()

      S.raf = requestAnimationFrame(frame)
    }

    S.raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(S.raf)
      window.removeEventListener('mousedown', onClick)
      window.removeEventListener('touchstart', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [makeStars])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 0.2 }}
    >
      <canvas
        ref={mainRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
      />
      <canvas
        ref={bloomRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          mixBlendMode: 'screen',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}
