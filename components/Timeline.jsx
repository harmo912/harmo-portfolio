'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import styles from './Timeline.module.css'
import SpringBox from './SpringBox'

const content = {
  fr: {
    label: 'Parcours',
    title1: 'Mon',
    title2: 'histoire.',
    items: [
      {
        year: '2024',
        title: 'ENEAM — Réseaux informatiques',
        desc: "Intégration à l'École Nationale d'Économie Appliquée et de Management, filière réseaux et systèmes informatiques.",
        tag: 'Formation'
      },
      {
        year: '2025',
        title: 'Fondateur — QYNEX',
        desc: "Création de QYNEX, plateforme e-commerce pensée pour le marché béninois avec paiements intégrés.",
        tag: 'Entrepreneuriat'
      },
      {
        year: '2026',
        title: 'Certification D-CLIC OIF',
        desc: "Certification en développement mobile obtenue via le programme D-CLIC de l'Organisation Internationale de la Francophonie.",
        tag: 'Certification'
      },
      {
        year: '2026',
        title: 'Stage — DRWINTECH',
        desc: "Développement de StageLink, une plateforme de gestion de stages en Laravel et Next.js.",
        tag: 'Expérience'
      },
      {
        year: '2026',
        title: 'Freelance — Concepteur.bj',
        desc: "Missions freelance en développement web, mobile et audit de sécurité sur la plateforme Concepteur.bj.",
        tag: 'Freelance'
      },
    ]
  },
  en: {
    label: 'Journey',
    title1: 'My',
    title2: 'story.',
    items: [
      {
        year: '2024',
        title: 'ENEAM — Computer Networks',
        desc: "Joined the École Nationale d'Économie Appliquée et de Management, computer networks and systems track.",
        tag: 'Education'
      },
      {
        year: '2025',
        title: 'Founder — QYNEX',
        desc: "Created QYNEX, an e-commerce platform designed for the Beninese market with integrated payments.",
        tag: 'Entrepreneurship'
      },
      {
        year: '2026',
        title: 'D-CLIC OIF Certification',
        desc: "Mobile development certification obtained through the D-CLIC program of the Organisation Internationale de la Francophonie.",
        tag: 'Certification'
      },
      {
        year: '2026',
        title: 'Internship — DRWINTECH',
        desc: "Developed StageLink, an internship management platform built with Laravel and Next.js.",
        tag: 'Experience'
      },
      {
        year: '2026',
        title: 'Freelance — Concepteur.bj',
        desc: "Freelance missions in web development, mobile and security audits on the Concepteur.bj platform.",
        tag: 'Freelance'
      },
    ]
  }
}

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`${styles.item} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 18,
        delay: 0.1
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 15 }
      }}
    >
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <span className={styles.year}>{item.year}</span>
          <span className={styles.tag}>{item.tag}</span>
        </div>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDesc}>{item.desc}</p>
      </div>
      <div className={styles.dot} />
    </motion.div>
  )
}

export default function Timeline({ lang }) {
  const t = content[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" className={styles.timeline} ref={ref}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <SpringBox delay={0}>
  <div className={styles.label}>{t.label}</div>
</SpringBox>
          <SpringBox delay={0.1}>
  <h2 className={styles.title}>
    <span className={styles.t1}>{t.title1}</span>
    <span className={styles.t2}>{t.title2}</span>
  </h2>
</SpringBox>
        </div>

        {/* Timeline */}
        <div className={styles.track}>
          {/* Ligne centrale qui se dessine au scroll */}
          <div className={styles.lineTrack}>
            <motion.div
              className={styles.lineFill}
              style={{ height: lineHeight }}
            />
          </div>

          {/* Items */}
          {t.items.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}