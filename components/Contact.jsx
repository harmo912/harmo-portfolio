'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SpringBox from './SpringBox'
import styles from './Contact.module.css'

const content = {
  fr: {
    label: 'Contact',
    title1: 'Travaillons',
    title2: 'ensemble.',
    desc: 'Un projet, une idée, une mission freelance ? Écrivez-moi directement.',
    name: 'Votre nom',
    email: 'Votre email',
    subject: 'Sujet',
    message: 'Votre message',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Message envoyé ! Je vous réponds très vite.',
    error: 'Erreur. Contactez-moi directement sur WhatsApp.',
    or: 'Ou directement via',
  },
  en: {
    label: 'Contact',
    title1: "Let's work",
    title2: 'together.',
    desc: 'A project, an idea, a freelance mission? Write to me directly.',
    name: 'Your name',
    email: 'Your email',
    subject: 'Subject',
    message: 'Your message',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Message sent! I will reply very soon.',
    error: 'Error. Contact me directly on WhatsApp.',
    or: 'Or directly via',
  }
}

const links = [
  {
    icon: 'bi bi-whatsapp',
    label: 'WhatsApp',
    value: '+229 01 64 01 17 46',
    href: 'https://wa.me/2290164011746',
  },
  {
    icon: 'bi bi-envelope',
    label: 'Email',
    value: 'harmohlb01@gmail.com',
    href: 'mailto:harmohlb01@gmail.com',
  },
  {
    icon: 'bi bi-linkedin',
    label: 'LinkedIn',
    value: 'Harmonic Hounleba',
    href: 'https://www.linkedin.com/in/harmonic-hounleba-7babba33b',
  },
]

export default function Contact({ lang }) {
  const t = content[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      {/* Blob décoratif */}
      <div className={styles.blob} />

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
          <SpringBox delay={0.2}>
  <p className={styles.desc}>{t.desc}</p>
</SpringBox>
        </div>

        <div className={styles.grid}>
          {/* Formulaire */}
          <SpringBox delay={0.1}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.name}
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <input
                    type="email"
                    name="email"
                    placeholder={t.email}
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <input
                  type="text"
                  name="subject"
                  placeholder={t.subject}
                  value={form.subject}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.field}>
                <textarea
                  name="message"
                  placeholder={t.message}
                  value={form.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={6}
                  required
                />
              </div>

              {status && (
                <motion.div
                  className={`${styles.status} ${status === 'success' ? styles.success : styles.error}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {status === 'success' ? t.success : t.error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className={styles.btn}
                disabled={loading}
                whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? t.sending : t.send}
                {!loading && <span>→</span>}
              </motion.button>
            </form>
          </SpringBox>

          {/* Liens directs */}
          <div className={styles.linksCol}>
            <p className={styles.orText}>{t.or}</p>
            {links.map((l, i) => (
              <SpringBox key={i} delay={i * 0.12}>
                <motion.a
                  href={l.href}
                  className={styles.contactLink}
                  whileHover={{
                    x: 6,
                    transition: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                >
                  <div className={styles.linkIcon}>
                    <i className={l.icon} />
                  </div>
                  <div className={styles.linkBody}>
                    <span className={styles.linkLabel}>{l.label}</span>
                    <span className={styles.linkValue}>{l.value}</span>
                  </div>
                  <span className={styles.linkArrow}>→</span>
                </motion.a>
              </SpringBox>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}