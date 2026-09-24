'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const links = {
  fr: ['À propos', 'Stack', 'Projets', 'Contact'],
  en: ['About', 'Stack', 'Projects', 'Contact'],
}
const hrefs = ['#about', '#stack', '#projects', '#contact']

export default function Navbar({ lang, setLang }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloque le scroll quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#" className={styles.brand}>
          Harmoni<em>c</em>
        </a>

        {/* Desktop links */}
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
            className={`${styles.cta} ${styles.desktopCta}`}
            whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.96 }}
          >
            {lang === 'fr' ? 'Me contacter' : 'Contact me'}
          </motion.a>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
            <div className={styles.mobileInner}>
              {links[lang].map((l, i) => (
                <motion.a
                  key={i}
                  href={hrefs[i]}
                  className={styles.mobileLink}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 18,
                    delay: i * 0.08
                  }}
                  whileHover={{
                    x: 12,
                    color: '#dc2626',
                    transition: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                >
                  <span className={styles.mobileLinkNum}>0{i + 1}</span>
                  {l}
                </motion.a>
              ))}

              <motion.div
                className={styles.mobileBottom}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.35 }}
              >
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
                  onClick={closeMenu}
                  whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                  whileTap={{ scale: 0.96 }}
                >
                  {lang === 'fr' ? 'Me contacter' : 'Contact me'}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}