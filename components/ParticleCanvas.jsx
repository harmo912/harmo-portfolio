'use client'

import { useEffect, useRef } from 'react'
import styles from './ParticleCanvas.module.css'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    let W, H, pts = [], animId

    function resize() {
      W = cv.width = window.innerWidth
      H = cv.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', () => { resize(); build() })

    function makeSilhouette() {
      const off = document.createElement('canvas')
      off.width = W; off.height = H
      const oc = off.getContext('2d')
      const cx = W * .70, cy = H * .46
      const s = Math.min(W, H) * .0044
      oc.save(); oc.translate(cx, cy); oc.scale(s, s)
      oc.fillStyle = '#fff'
      // Tête
      oc.beginPath(); oc.arc(0, -88, 44, 0, Math.PI * 2); oc.fill()
      // Cou
      oc.fillRect(-12, -44, 24, 24)
      // Corps
      oc.beginPath()
      oc.moveTo(-58, -22); oc.bezierCurveTo(-95, 32, -78, 95, -58, 135)
      oc.lineTo(58, 135); oc.bezierCurveTo(78, 95, 95, 32, 58, -22)
      oc.closePath(); oc.fill()
      // Bras G
      oc.beginPath()
      oc.moveTo(-58, -10); oc.bezierCurveTo(-115, 22, -135, 78, -118, 128)
      oc.lineTo(-95, 122); oc.bezierCurveTo(-112, 76, -90, 24, -42, -4)
      oc.closePath(); oc.fill()
      // Bras D
      oc.beginPath()
      oc.moveTo(58, -10); oc.bezierCurveTo(115, 22, 135, 78, 118, 128)
      oc.lineTo(95, 122); oc.bezierCurveTo(112, 76, 90, 24, 42, -4)
      oc.closePath(); oc.fill()
      // Jambe G
      oc.beginPath()
      oc.moveTo(-44, 133); oc.bezierCurveTo(-54, 178, -52, 220, -48, 264)
      oc.lineTo(-23, 264); oc.bezierCurveTo(-19, 220, -15, 178, -6, 133)
      oc.closePath(); oc.fill()
      // Jambe D
      oc.beginPath()
      oc.moveTo(44, 133); oc.bezierCurveTo(54, 178, 52, 220, 48, 264)
      oc.lineTo(23, 264); oc.bezierCurveTo(19, 220, 15, 178, 6, 133)
      oc.closePath(); oc.fill()
      oc.restore()
      return oc.getImageData(0, 0, W, H)
    }

    function build() {
      pts = []
      const img = makeSilhouette()
      const d = img.data
      const step = Math.max(4, Math.floor(Math.min(W, H) / 70))
      const pal = ['#dc2626','#ef4444','#ffffff','#fca5a5','#991b1b','#f87171']
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (d[(y * W + x) * 4 + 3] > 20) {
            pts.push({
              x, y, ox: x, oy: y,
              r: Math.random() * 1.7 + .4,
              col: pal[Math.floor(Math.random() * pal.length)],
              op: Math.random() * .5 + .5,
              ph: Math.random() * Math.PI * 2,
              sp: Math.random() * .03 + .014
            })
          }
        }
      }
    }
    build()

    let mx = W * .70, my = H * .46
    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, W, H)
      t += .01
      pts.forEach(p => {
        const fx = Math.sin(t * p.sp * 60 + p.ph) * 3.2
        const fy = Math.cos(t * p.sp * 42 + p.ph) * 2.8
        const dx = p.ox + fx - mx, dy = p.oy + fy - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const rep = dist < 95 ? ((95 - dist) / 95) * 24 : 0
        const ang = Math.atan2(dy, dx)
        const tx = p.ox + fx + (rep ? Math.cos(ang) * rep : 0)
        const ty = p.oy + fy + (rep ? Math.sin(ang) * rep : 0)
        p.x += (tx - p.x) * .09
        p.y += (ty - p.y) * .09
        const pulse = Math.sin(t * 1.9 + p.ph) * .12 + .88
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.col
        ctx.globalAlpha = p.op * pulse
        ctx.fill()
        ctx.globalAlpha = 1
      })
      for (let i = 0; i < pts.length; i += 3) {
        for (let j = i + 1; j < pts.length && j < i + 10; j += 3) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 20) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(220,38,38,${0.22 * (1 - d / 20)})`
            ctx.lineWidth = .4
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', () => { resize(); build() })
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}