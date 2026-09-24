'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SpringBox from './SpringBox'
import styles from './Services.module.css'

const content = {
  fr: {
    label: 'Services',
    title1: 'Ce que je',
    title2: 'fais.',
    services: [
      {
        num: '01',
        title: 'Développement Web',
        desc: 'Sites vitrine, applications web full-stack, dashboards admin. Du design à la mise en ligne.',
        items: ['PHP / Laravel', 'Next.js', 'HTML / CSS / JS', 'WordPress'],
      },
      {
        num: '02',
        title: 'Développement Mobile',
        desc: 'Applications mobiles cross-platform performantes et bien designées.',
        items: ['Flutter / Dart', 'iOS & Android', 'UI Mobile'],
      },
      {
        num: '03',
        title: 'Audit & Pentesting',
        desc: "Tests d'intrusion web, analyse de vulnérabilités, rapport détaillé et recommandations.",
        items: ['OWASP Top 10', 'Burp Suite', 'Kali Linux', 'Rapport'],
      },
      {
        num: '04',
        title: 'E-Commerce',
        desc: 'Boutiques en ligne adaptées au marché africain, paiements intégrés, gestion des stocks.',
        items: ['Catalogue produits', 'Paiements', 'Panel admin'],
      },
    ]
  },
  en: {
    label: 'Services',
    title1: 'What I',
    title2: 'do.',
    services: [
      {
        num: '01',
        title: 'Web Development',
        desc: 'Showcase sites, full-stack web apps, admin dashboards. From design to deployment.',
        items: ['PHP / Laravel', 'Next.js', 'HTML / CSS / JS', 'WordPress'],
      },
      {
        num: '02',
        title: 'Mobile Development',
        desc: 'Performant cross-platform mobile apps with clean UI.',
        items: ['Flutter / Dart', 'iOS & Android', 'Mobile UI'],
      },
      {
        num: '03',
        title: 'Audit & Pentesting',
        desc: 'Web penetration testing, vulnerability analysis, detailed report and recommendations.',
        items: ['OWASP Top 10', 'Burp Suite', 'Kali Linux', 'Report'],
      },
      {
        num: '04',
        title: 'E-Commerce',
        desc: 'Online stores adapted to the African market, integrated payments, stock management.',
        items: ['Product catalog', 'Payments', 'Admin panel'],
      },
    ]
  }
}

export default function Services({ lang }) {
  const t = content[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className={styles.services} ref={ref}>
      <div className={styles.inner}>
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

        <div className={styles.grid}>
          {t.services.map((s, i) => (
            <SpringBox key={i} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.num}>{s.num}</span>
                  <motion.div
                    className={styles.arrow}
                    whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                  >
                    →
                  </motion.div>
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.tags}>
                  {s.items.map((item, j) => (
                    <span key={j} className={styles.tag}>{item}</span>
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