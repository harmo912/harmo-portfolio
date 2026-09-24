'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SpringBox from './SpringBox'
import styles from './Projects.module.css'

const content = {
  fr: {
    label: 'Projets',
    title1: 'Ce que j\'ai',
    title2: 'construit.',
    status_live: 'En ligne',
    status_wip: 'En cours',
    visit: 'Voir le projet',
    projects: [
      {
        num: '01',
        title: 'QYNEX',
        desc: 'Plateforme e-commerce pensée pour le marché béninois. Catalogue produits, panier, système de comptes utilisateurs et paiements intégrés.',
        stack: ['PHP', 'MySQL', 'HTML/CSS', 'JS'],
        link: 'https://qynex.wuaze.com/',
        status: 'live',
      },
      {
        num: '02',
        title: 'StageLink',
        desc: 'Plateforme de gestion des stages académiques au Bénin — mise en relation étudiants, entreprises et écoles. Développée en stage chez DRWINTECH.',
        stack: ['Laravel', 'Next.js', 'MySQL'],
        link: 'https://stagelink-gamma.vercel.app',
        status: 'live',
      },
      {
        num: '03',
        title: 'Ever After Events',
        desc: 'Site événementiel élégant pour célébration de mariage. Design soigné, galerie photos, RSVP et informations pratiques pour les invités.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://stackhive-project.netlify.app/',
        status: 'live',
      },
      {
        num: '04',
        title: 'SoftLife',
        desc: 'Application de vente, suivi de commandes et gestion de livraison de produits d\'hygiène féminine. Interface client et tableau de bord vendeur.',
        stack: ['Laravel', 'Next.js', 'MySQL', 'PHP'],
        link: null,
        status: 'wip',
      },
      {
        num: '05',
        title: 'BeninStay',
        desc: 'Plateforme de location de chambres et d\'hôtels au Bénin, conçue pour faciliter la recherche de logement aux voyageurs et expatriés.',
        stack: ['Laravel', 'Next.js', 'MySQL', 'PHP'],
        link: null,
        status: 'wip',
      },
    ]
  },
  en: {
    label: 'Projects',
    title1: 'What I\'ve',
    title2: 'built.',
    status_live: 'Live',
    status_wip: 'In progress',
    visit: 'Visit project',
    projects: [
      {
        num: '01',
        title: 'QYNEX',
        desc: 'E-commerce platform designed for the Beninese market. Product catalog, cart, user account system and integrated payments.',
        stack: ['PHP', 'MySQL', 'HTML/CSS', 'JS'],
        link: 'https://qynex.wuaze.com/',
        status: 'live',
      },
      {
        num: '02',
        title: 'StageLink',
        desc: 'Academic internship management platform in Benin — connecting students, companies and schools. Built during internship at DRWINTECH.',
        stack: ['Laravel', 'Next.js', 'MySQL'],
        link: 'https://stagelink-gamma.vercel.app',
        status: 'live',
      },
      {
        num: '03',
        title: 'Ever After Events',
        desc: 'Elegant event website for wedding celebration. Refined design, photo gallery, RSVP and practical information for guests.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://stackhive-project.netlify.app/',
        status: 'live',
      },
      {
        num: '04',
        title: 'SoftLife',
        desc: 'Sales, order tracking and delivery management app for feminine hygiene products. Customer interface and seller dashboard.',
        stack: ['Laravel', 'Next.js', 'MySQL', 'PHP'],
        link: null,
        status: 'wip',
      },
      {
        num: '05',
        title: 'BeninStay',
        desc: 'Room and hotel rental platform in Benin, designed to help travelers and expats quickly find accommodation.',
        stack: ['Laravel', 'Next.js', 'MySQL', 'PHP'],
        link: null,
        status: 'wip',
      },
    ]
  }
}

export default function Projects({ lang }) {
  const t = content[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className={styles.projects} ref={ref}>
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

        {/* Liste projets */}
        <div className={styles.list}>
          {t.projects.map((p, i) => (
            <SpringBox key={i} delay={i * 0.08}>
              <div className={styles.card}>
                <div className={styles.cardLeft}>
                  <span className={styles.num}>{p.num}</span>
                </div>

                <div className={styles.cardMain}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <span className={`${styles.status} ${p.status === 'live' ? styles.live : styles.wip}`}>
                      <span className={styles.statusDot} />
                      {p.status === 'live' ? t.status_live : t.status_wip}
                    </span>
                  </div>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.stack}>
                    {p.stack.map((s, j) => (
                      <span key={j} className={styles.stackTag}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardRight}>
                  {p.link ? (
                    <motion.a
                      href={p.link}
                      className={styles.visitBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.06,
                        transition: { type: 'spring', stiffness: 400, damping: 15 }
                      }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {t.visit}
                      <span className={styles.arrow}>→</span>
                    </motion.a>
                  ) : (
                    <span className={styles.wipBtn}>
                      <i className="bi bi-hammer" /> WIP
                    </span>
                  )}
                </div>
              </div>
            </SpringBox>
          ))}
        </div>
      </div>
    </section>
  )
}