'use client'

import { motion, useInView } from 'framer-motion'
import styles from './About.module.css'
import { useRef, useState, useEffect } from 'react'
import SpringBox from './SpringBox'

const content = {
  fr: {
    label: 'À propos',
    title1: 'Qui je',
    title2: 'suis.',
    bio: "Étudiant en réseaux informatiques à l'ENEAM, Cotonou. Je construis des produits numériques depuis plus de 3 ans — du web au mobile, du front-end à la sécurité.",
    label2: 'Mon parcours',
    p1: "Fondateur de QYNEX, une plateforme e-commerce pensée pour le marché béninois. Certifié D-CLIC OIF en développement mobile.",
    p2: "Actuellement en stage chez DRWINTECH sur StageLink, une plateforme de gestion de stages en Laravel/Next.js. Disponible pour des missions freelance.",
    stat1: "Ans d'XP",
    stat2: 'Projets',
    stat3: 'Technologies',
    tags: ['PHP','Laravel','Next.js','Flutter','WordPress','MySQL','Pentesting','OWASP','HTML/CSS','JavaScript','Dart','Kali Linux'],
  },
  en: {
    label: 'About me',
    title1: 'Who I',
    title2: 'am.',
    bio: "Computer networking student at ENEAM, Cotonou. Building digital products for over 3 years — from web to mobile, from front-end to security.",
    label2: 'My background',
    p1: "Founder of QYNEX, an e-commerce platform built for the Beninese market. D-CLIC OIF certified in mobile development.",
    p2: "Currently interning at DRWINTECH on StageLink, an internship management platform built with Laravel/Next.js. Available for freelance missions.",
    stat1: "Years XP",
    stat2: 'Projects',
    stat3: 'Technologies',
    tags: ['PHP','Laravel','Next.js','Flutter','WordPress','MySQL','Pentesting','OWASP','HTML/CSS','JavaScript','Dart','Kali Linux'],
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
}

const stats = [
  { target: 3, key: 'stat1' },
  { target: 5, key: 'stat2' },
  { target: 8, key: 'stat3' },
]

function StatBox({ target, label, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <SpringBox delay={index * 0.15}>
      <div ref={ref} className={styles.statBox}>
        <span className={styles.statNum}>{count}+</span>
        <span className={styles.statLbl}>{label}</span>
      </div>
    </SpringBox>
  )
}

export default function About({ lang }) {
  const t = content[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.accentLine} style={{ height: inView ? '55%' : '0' }} />

      <div className={styles.grid}>
        {/* Gauche */}
        <div className={styles.left}>
          <SpringBox delay={0}>
  <div className={styles.label}>{t.label}</div>
</SpringBox>

          <SpringBox delay={0.1}>
  <h2 className={styles.title}>
    <span className={styles.t1}>{t.title1}</span>
    <span className={styles.t2}>{t.title2}</span>
  </h2>
</SpringBox>

<SpringBox delay={0.2}>
  <p className={styles.bio}>{t.bio}</p>
</SpringBox>

          <div className={styles.statsRow}>
            {stats.map((s, i) => (
              <StatBox key={i} target={s.target} label={t[s.key]} index={i} />
            ))}
          </div>
        </div>

        {/* Droite */}
        <div className={styles.right}>
          <SpringBox delay={0.1}>
  <div className={styles.label}>{t.label2}</div>
</SpringBox>

       <SpringBox delay={0.2}>
  <div className={styles.textBlock}>
    <p>{t.p1}</p>
    <p>{t.p2}</p>
  </div>
</SpringBox>

          {/* Marquee tags */}
          <SpringBox delay={0.3}>
  <div className={styles.marqueeWrap}>
            <div className={styles.marqueeTrack}>
              {[...t.tags, ...t.tags].map((tag, i) => (
                <span key={i} className={styles.tag}>
                  <span className={styles.tagDot} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          </SpringBox>
        </div>
      </div>
    </section>
  )
}