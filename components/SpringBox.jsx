'use client'

import { motion } from 'framer-motion'

export default function SpringBox({ children, className, style, delay = 0, x = 0, y = 60 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 13,
        delay,
      }}
      whileHover={{
        scale: 1.03,
        transition: { type: 'spring', stiffness: 400, damping: 12 }
      }}
      whileTap={{
        scale: 0.97,
        transition: { type: 'spring', stiffness: 400, damping: 18 }
      }}
    >
      {children}
    </motion.div>
  )
}