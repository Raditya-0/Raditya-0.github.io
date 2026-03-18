import React, { useState, forwardRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const mainProjects = [
  {
    num: '01',
    category: 'AI Research · Signal Processing',
    title: 'Atrial Fibrillation Detection',
    desc: 'Analisis kinerja model Transformer untuk klasifikasi sinyal ECG dalam mendeteksi Atrial Fibrillation. Membandingkan beberapa arsitektur pada data time-series biomedis.',
    tags: ['Python', 'Transformer', 'ECG', 'PyTorch', 'HuggingFace'],
    links: [
      { href: 'https://github.com/Raditya-0', icon: 'Asset/logo/github.png', label: 'GitHub' },
      { href: 'https://huggingface.co/spaces/Raditya-0/Atrial-Fibrillation-Detect', icon: 'Asset/logo/huggingface.png', label: 'HuggingFace' },
      { href: 'Asset/docs/Analisis Kinerja Model Transformer untuk Klasifikasi.pdf', icon: 'Asset/logo/book.png', label: 'Paper' },
    ],
  },
  {
    num: '02',
    category: 'Game Development · OOP',
    title: 'Dual Dimension',
    desc: 'Game platformer 2D dengan pemain berpindah antar dimensi untuk menghindari jebakan dan musuh yang berbahaya. Platform aman di satu dimensi bisa menjadi bahaya di dimensi lainnya.',
    tags: ['Python', 'Pygame', 'OOP', '2D Platformer', 'Game Design'],
    links: [
      { href: 'https://github.com/Raditya-0/dual-dimension-platformer', icon: 'Asset/logo/github.png', label: 'GitHub' },
    ],
  },
]

const extraProjects = [
  {
    num: '03',
    category: 'Web Development · Marketplace',
    title: 'Project Marketplace',
    desc: 'Aplikasi web marketplace sederhana dengan halaman produk, slider produk unggulan, pencarian dengan rekomendasi real-time, halaman detail produk, dan form login.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'React Router'],
    links: [
      { href: 'https://github.com/Raditya-0/marketplace-front-end-web', icon: 'Asset/logo/github.png', label: 'GitHub' },
      { href: 'https://raditya-0.github.io/marketplace-front-end-web/', icon: 'Asset\\logo\\chrome.png', label: 'Live Demo' },
    ],
  },
  {
    num: '04',
    category: 'Game Development · Unity',
    title: 'Unravel The Adventure',
    desc: 'Game platformer 2D di mana ksatria berani menjelajahi dunia fantasi, menghadapi perangkap, berinteraksi dengan NPC, dan mengalahkan bos epik. Juara 3 Lomba MAGE 9.',
    tags: ['Unity', 'C#', 'Game Design', '2D Platformer'],
    links: [
      { href: 'Asset/docs/Sertifikat_MAGE9_GameDev.pdf', icon: 'Asset/logo/award.png', label: 'Award' },
    ],
  },
  {
    num: '05',
    category: 'Game Development · Construct 3',
    title: 'Operation Gearbreak',
    desc: 'Operation Gearbreak is a retro-style 2.5D First-Person Shooter (FPS) game developed using Construct 3.',
    tags: ['Construct 3', '2.5D FPS', 'Game Design'],
    links: [
      { href: 'https://github.com/Raditya-0/operation-gearbreak', icon: 'Asset/logo/github.png', label: 'GitHub' },
      { href: 'https://raditya-0.github.io/operation-gearbreak/', icon: 'Asset/logo/chrome.png', label: 'Live Demo' },
    ],
  },
]

function ProjectCard({ project }) {
  const cardClass = "project-card group bg-[#151515] border border-[#222] rounded-[8px] p-[30px] relative transition-all duration-[800ms] ease-out opacity-0 translate-y-[40px] [&.show-element]:opacity-100 [&.show-element]:translate-y-0 hover:-translate-y-[5px]"
  const numClass = "absolute top-[20px] right-[20px] text-[2rem] text-[#222] font-[800]"
  const catClass = "block text-[#4a90e2] text-[0.9rem] tracking-[2px] mb-[10px]"
  const titleClass = "text-[1.5rem] text-white mt-[10px] mb-[15px]"
  const descClass = "text-[#aaa] mb-[20px] text-[0.95rem]"
  const tagsWrap = "flex flex-wrap gap-[10px]"
  const tagClass = "bg-[#222] text-[#ccc] py-[5px] px-[12px] rounded-[20px] text-[0.8rem] border border-[#333]"
  const linksWrap = "flex gap-[16px] mt-[20px] items-center"
  const linkClass = "group/link inline-flex opacity-50 transition-all duration-200 ease-in hover:opacity-100 hover:-translate-y-[3px] active:scale-90"
  const imgClass = "w-[26px] h-[26px] object-contain invert brightness-0 transition-[filter] duration-200 ease-in group-hover/link:brightness-[1.4]"

  return (
    <div className={cardClass}>
      <div className={numClass}>{project.num}</div>
      <div className="project-info">
        <span className={catClass}>{project.category}</span>
        <h3 className={titleClass}>{project.title}</h3>
        <p className={descClass}>{project.desc}</p>
        <div className={tagsWrap}>
          {project.tags.map(tag => <span key={tag} className={tagClass}>{tag}</span>)}
        </div>
        <div className={linksWrap}>
          {project.links.map(link => (
            <a key={link.label} href={link.href} target="_blank" aria-label={link.label} rel="noreferrer" className={linkClass}>
              <img src={link.icon} alt={link.label} className={imgClass} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const Projects = forwardRef(function Projects(_, ref) {
  const [expanded, setExpanded] = useState(false)
  useReveal(ref, [expanded])

  const sectionClass = "h-[100vh] overflow-y-auto flex flex-col border-b border-white/5 box-border no-scrollbar"
  const innerClass = "pt-[100px] pb-[100px] px-[5%] max-w-[1200px] w-full mx-auto"
  const headerWrap = "section-header mb-[60px] opacity-0 translate-y-[40px] transition-all duration-[800ms] ease-out [&.show-element]:opacity-100 [&.show-element]:translate-y-0"
  const titleClass = "text-[2.8rem] md:text-[3.5rem] text-white font-[300] tracking-[-1px]"
  const gridClass = "grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[30px]"
  const extraWrap = `overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${expanded ? 'max-h-[1200px] opacity-100 mt-[30px]' : 'max-h-0 opacity-0 mt-0'}`
  const btnWrap = "flex justify-center mt-[36px]"
  const btnClass = "bg-transparent border border-[#4a90e2]/35 text-[#4a90e2] py-[10px] px-[28px] rounded-[30px] text-[0.9rem] font-[600] tracking-[0.5px] cursor-pointer flex items-center gap-[10px] transition-all duration-200 ease-in hover:bg-[#4a90e2]/10 hover:border-[#4a90e2]/60 hover:shadow-[0_0_16px_rgba(74,144,226,0.2)] active:scale-95"

  return (
    <section id="projects" className={sectionClass} ref={ref}>
      <div className={innerClass}>
        <div className={headerWrap}>
          <h2 className={titleClass}>Projects</h2>
        </div>

        <div className={gridClass}>
          {mainProjects.map(p => <ProjectCard key={p.num} project={p} />)}
        </div>

        <div className={extraWrap} id="projects-extra">
          <div className={gridClass}>
            {extraProjects.map(p => <ProjectCard key={p.num} project={p} />)}
          </div>
        </div>

        <div className={btnWrap}>
          <button
            className={btnClass}
            id="see-more-btn"
            onClick={() => {
              setExpanded(!expanded)
              if (expanded && ref.current) {
                ref.current.scrollTop = 0
              }
            }}
          >
            {expanded ? 'See Less ' : 'See More Projects '}
            <span className={`inline-block transition-transform duration-350 ease-in ${expanded ? 'rotate-180' : ''}`}>↓</span>
          </button>
        </div>
      </div>
    </section>
  )
})

export default Projects
