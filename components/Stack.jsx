'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Stack.module.css'
import SpringBox from './SpringBox'

const content = {
  fr: {
    label: 'Stack technique',
    title1: 'Ce que je',
    title2: 'maîtrise.',
    categories: [
      {
        name: 'Web',
        skills: [
          { name: 'PHP', level: 85 },
          { name: 'Laravel', level: 80 },
          { name: 'Next.js', level: 78 },
          { name: 'HTML / CSS', level: 92 },
          { name: 'JavaScript', level: 82 },
          { name: 'WordPress', level: 75 },
        ]
      },
      {
        name: 'Mobile',
        skills: [
          { name: 'Flutter', level: 72 },
          { name: 'Dart', level: 70 },
        ]
      },
      {
        name: 'Sécurité',
        skills: [
          { name: 'Pentesting Web', level: 68 },
          { name: 'OWASP Top 10', level: 70 },
          { name: 'Kali Linux', level: 65 },
          { name: 'Burp Suite', level: 62 },
        ]
      },
      {
        name: 'Base de données',
        skills: [
          { name: 'MySQL', level: 80 },
        ]
      },
    ]
  },
  en: {
    label: 'Tech stack',
    title1: 'What I',
    title2: 'master.',
    categories: [
      {
        name: 'Web',
        skills: [
          { name: 'PHP', level: 85 },
          { name: 'Laravel', level: 80 },
          { name: 'Next.js', level: 78 },
          { name: 'HTML / CSS', level: 92 },
          { name: 'JavaScript', level: 82 },
          { name: 'WordPress', level: 75 },
        ]
      },
      {
        name: 'Mobile',
        skills: [
          { name: 'Flutter', level: 72 },
          { name: 'Dart', level: 70 },
        ]
      },
      {
        name: 'Security',
        skills: [
          { name: 'Web Pentesting', level: 68 },
          { name: 'OWASP Top 10', level: 70 },
          { name: 'Kali Linux', level: 65 },
          { name: 'Burp Suite', level: 62 },
        ]
      },
      {
        name: 'Database',
        skills: [
          { name: 'MySQL', level: 80 },
        ]
      },
    ]
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
}

function SkillBar({ name, level, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={styles.skillRow}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPct}>{level}%</span>
      </div>
      <div className={styles.skillTrack}>
        <motion.div
          className={styles.skillFill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.07 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Stack({ lang }) {
  const t = content[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stack" className={styles.stack} ref={ref}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.label}
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
          >
            {t.label}
          </motion.div>
          <motion.h2
            className={styles.title}
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            <span className={styles.t1}>{t.title1}</span>
            <span className={styles.t2}>{t.title2}</span>
          </motion.h2>
        </div>

        {/* Categories grid */}
        <div className={styles.categoriesGrid}>
{t.categories.map((cat, ci) => (
  <SpringBox key={ci} delay={ci * 0.1}>
    <div className={styles.category}>
      <div className={styles.catName}>{cat.name}</div>
      <div className={styles.skills}>
        {cat.skills.map((skill, si) => (
          <SkillBar key={si} name={skill.name} level={skill.level} index={si} />
        ))}
      </div>
    </div>
  </SpringBox>
))}
        </div>
      </div>
    </section>
  )
}