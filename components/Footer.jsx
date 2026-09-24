'use client'

import { motion } from 'framer-motion'
import styles from './Footer.module.css'

const socials = [
  { icon: 'bi bi-linkedin', href: 'https://www.linkedin.com/in/harmonic-hounleba-7babba33b' },
  { icon: 'bi bi-instagram', href: 'https://www.instagram.com/harmonic_hounleba' },
  { icon: 'bi bi-facebook', href: 'https://www.facebook.com/harmonichounleba' },
  { icon: 'bi bi-twitter-x', href: 'https://x.com/Harmo912' },
  { icon: 'bi bi-github', href: 'https://github.com/harmo912' },
]

const content = {
  fr: { rights: 'Tous droits réservés', back: 'Retour en haut', made: 'Conçu & développé par' },
  en: { rights: 'All rights reserved', back: 'Back to top', made: 'Designed & built by' },
}

export default function Footer({ lang }) {
  const t = content[lang]

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          Harmoni<em>c</em>
        </div>
        <div className={styles.socials}>
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              className={styles.social}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.2,
                y: -4,
                transition: { type: 'spring', stiffness: 400, damping: 15 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={s.icon} />
            </motion.a>
          ))}
        </div>
        <motion.button
          className={styles.backTop}
          onClick={scrollTop}
          whileHover={{
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 15 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {t.back} ↑
        </motion.button>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Harmonic Hounleba — {t.rights}
        </p>
        <p className={styles.made}>
          {t.made} <em>Harmonic</em>
        </p>
      </div>
    </footer>
  )
}