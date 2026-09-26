'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import styles from './Hero.module.css'

const content = {
  fr: {
    desc: "Je transforme des idées ambitieuses en produits numériques robustes — web, mobile et sécurité.",
    cta1: 'Voir mon travail',
    cta2: 'Prendre contact',
    scroll: 'scroll',
    srv1: 'Développement Web',
    srv2: 'Développement Mobile',
    srv3: 'Audit & Pentesting',
  },
  en: {
    desc: "I turn ambitious ideas into robust digital products — web, mobile and security.",
    cta1: 'See my work',
    cta2: 'Get in touch',
    scroll: 'scroll',
    srv1: 'Web Development',
    srv2: 'Mobile Development',
    srv3: 'Audit & Pentesting',
  }
}

const WORD = 'Hounleba'

export default function Hero({ lang, loaderDone }) {
  const t = content[lang]
  const scanRef = useRef(null)
  const scanInterval = useRef(null)
  const descRef = useRef(null)
  const btnsRef = useRef(null)
  const scrollRef = useRef(null)
  const nameRef = useRef(null)

  // Scan animation sur Hounleba
  useEffect(() => {
    if (!loaderDone) return

    const letters = scanRef.current?.querySelectorAll('span')
    if (!letters) return

    let idx = 0
    let active = -1

    function step() {
      if (active >= 0) letters[active].classList.remove(styles.lit)
      active = idx
      letters[active].classList.add(styles.lit)
      idx++
      if (idx < letters.length) {
        scanInterval.current = setTimeout(step, 110)
      } else {
        scanInterval.current = setTimeout(() => {
          letters[active].classList.remove(styles.lit)
          idx = 0
          active = -1
          scanInterval.current = setTimeout(step, 1800)
        }, 300)
      }
    }

    const delay = setTimeout(step, 500)
    return () => {
      clearTimeout(delay)
      clearTimeout(scanInterval.current)
    }
  }, [loaderDone])

  // Reveal hero au loaderDone
  useEffect(() => {
    if (!loaderDone) return
    const tl = gsap.timeline()
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=.4'
    )
    .fromTo(btnsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=.3'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }, '-=.1'
    )
  }, [loaderDone])

  return (
    <section className={styles.hero}>
      {/* Particules plein écran */}
      <img
  src="/images/photo.jpg"
  alt="Harmonic Hounleba"
  className={styles.photo}
/>

      {/* Overlays */}
      <div className={styles.overlay} />
      <div className={styles.grain} />

      {/* Blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      {/* Contenu */}
      <div className={styles.content}>
        <h1 ref={nameRef} className={styles.name} style={{ opacity: 0 }}>
          <span className={styles.w1}>Harmonic</span>
          <span className={styles.w2} ref={scanRef}>
            {WORD.split('').map((l, i) => {
              const ratio = i / (WORD.length - 1)
              const r = Math.round(220 + (255 - 220) * ratio)
              const g = Math.round(38 + (255 - 38) * ratio)
              const b = Math.round(38 + (255 - 38) * ratio)
              return (
                <span
                  key={i}
                  className={styles.scanLetter}
                  style={{ color: `rgb(${r},${g},${b})` }}
                >
                  {l}
                </span>
              )
            })}
          </span>
        </h1>

        <div className={styles.bottom}>
          <p
            ref={descRef}
            className={styles.desc}
            style={{ opacity: 0 }}
            dangerouslySetInnerHTML={{ __html: t.desc }}
          />
<div ref={btnsRef} className={styles.btns} style={{ opacity: 0 }}>
  <motion.a
    href="#projects"
    className={styles.btnPrimary}
    whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
    whileTap={{ scale: 0.96 }}
  >
    {t.cta1} <span>→</span>
  </motion.a>

  <motion.a
    href="#contact"
    className={styles.btnSecondary}
    whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
    whileTap={{ scale: 0.96 }}
  >
    {t.cta2}
  </motion.a>

<motion.a
  href="/cv.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.btnCV}
  whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
  whileTap={{ scale: 0.96 }}
>
  <i className="bi bi-download" /> CV
</motion.a>
</div>
        </div>
      </div>

<motion.a
  href="/cv.pdf"
  download="CV_Harmonic_Hounleba.pdf"
  className={styles.btnCV}
  whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
  whileTap={{ scale: 0.96 }}
>
  <i className="bi bi-download" /> CV
</motion.a>      

      {/* Scroll hint */}
      <div ref={scrollRef} className={styles.scrollHint} style={{ opacity: 0 }}>
        <span className={styles.shText}>{t.scroll}</span>
        <div className={styles.shLine} />
      </div>
    </section>
  )
}