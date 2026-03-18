import React, { useEffect, useState } from 'react'

function Navbar({ onNavClick }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievement', id: 'achievement' },
    { name: 'Contact', id: 'contact' }
  ]

  const linkClass = "relative pb-[6px] text-[0.85rem] font-[600] uppercase tracking-[1.5px] text-[#a0aab5] transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#4a90e2] after:transition-[width] after:duration-300 after:ease-out after:rounded-[2px] after:shadow-[0_0_8px_rgba(74,144,226,0.6)]"

  return (
    <nav className={`fixed top-0 w-full z-[1000] flex justify-between items-center px-[6%] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] border-b ${isScrolled ? 'py-[15px] bg-[#0a0e17]/85 backdrop-blur-[16px] border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'py-[35px] bg-transparent border-transparent'}`}>
        <a className="text-[1.25rem] font-[800] tracking-[2px] text-white transition-opacity duration-300 hover:opacity-80" href="#about" onClick={e => { e.preventDefault(); onNavClick(0); }}>Raditya Akmal</a>
        <ul className="flex list-none gap-[35px] m-0 p-0">
            {navLinks.map((item, idx) => (
                <li key={item.id}>
                    <a href={`#${item.id}`} className={linkClass} onClick={e => { e.preventDefault(); onNavClick(idx); }}>{item.name}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default React.memo(Navbar)
