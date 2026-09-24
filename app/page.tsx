'use client'

import { useState } from 'react'
import SmoothScroll from '@/components/SmoothScroll'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stack from '@/components/Stack'
import Timeline from '@/components/Timeline'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Projects from '@/components/Projects'

export default function Home() {
  const [lang, setLang] = useState('fr')
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <SmoothScroll>
      <Loader onComplete={() => setLoaderDone(true)} />
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} loaderDone={loaderDone} />
        <About lang={lang} />
        <Stack lang={lang} />
        <Timeline lang={lang} />
        <Services lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </SmoothScroll>
  )
}