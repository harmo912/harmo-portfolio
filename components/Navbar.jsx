'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './Navbar.module.css'
import { motion } from 'framer-motion'

const links = {
  fr: ['À propos', 'Stack', 'Projets', 'Contact'],
  en: ['About', 'Stack', 'Projects', 'Contact'],
}
const hrefs = ['#about', '#stack', '#projects', '#contact']

export default function Navbar({ lang, setLang }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.brand}>
        Harmoni<em>c</em>
      </a>
      <ul className={styles.links}>
        {links[lang].map((l, i) => (
          <li key={i}>
            <a href={hrefs[i]}>{l}</a>
          </li>
        ))}
      </ul>
      <div className={styles.right}>
        <div className={styles.langToggle}>
          <button
            className={`${styles.langBtn} ${lang === 'fr' ? styles.active : ''}`}
            onClick={() => setLang('fr')}
          >FR</button>
          <button
            className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
        </div>
        <motion.a
  href="#contact"
  className={styles.cta}
  whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
  whileTap={{ scale: 0.96 }}
>
  {lang === 'fr' ? 'Me contacter' : 'Contact me'}
</motion.a>
      </div>
    </nav>
  )
}