import { useRef, useState, useCallback } from 'react'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievement from './components/Achievement'
import Contact from './components/Contact'
import { useScrollSnap } from './hooks/useScrollSnap'

export default function App() {
  const [progress, setProgress] = useState({ pct: 0, active: false })

  const heroRef = useRef(null)
  const educationRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const achievementRef = useRef(null)
  const contactRef = useRef(null)

  const sectionRefs = [heroRef, educationRef, experienceRef, projectsRef, achievementRef, contactRef]

  const onProgress = useCallback((pct, active) => {
    setProgress({ pct, active })
  }, [])

  const { scrollToSection } = useScrollSnap(sectionRefs, onProgress)

  return (
    <>
      <ParticleBackground />
      <Navbar onNavClick={scrollToSection} />
      
      <Hero ref={heroRef} onScrollDown={scrollToSection} />
      <Education ref={educationRef} />
      <Experience ref={experienceRef} />
      <Projects ref={projectsRef} />
      <Achievement ref={achievementRef} />
      <Contact ref={contactRef} />

      <ScrollProgress percentage={progress.pct} active={progress.active} />
    </>
  )
}
