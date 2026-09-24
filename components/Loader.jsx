'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './Loader.module.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const fillRef = useRef(null)
  const numRef = useRef(null)
  const logoRef = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' }
    )

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 7 + 2
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setPct(100)

        setTimeout(() => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            scale: 0.97,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              loaderRef.current.style.display = 'none'
              onComplete?.()
            }
          })
        }, 400)
      } else {
        setPct(Math.floor(progress))
      }
    }, 55)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div ref={logoRef} className={styles.logo}>
        Harmoni<em>c</em>
      </div>
      <div className={styles.trackWrap}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.num}>{pct}%</div>
      </div>
    </div>
  )
}