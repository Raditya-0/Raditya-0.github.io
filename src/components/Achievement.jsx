import React, { forwardRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const Achievement = forwardRef(function Achievement(_, ref) {
  useReveal(ref)

  const sectionClass = "pt-[100px] pb-[100px] px-[5%] max-w-[1200px] w-full mx-auto min-h-[100vh] flex flex-col box-border border-b border-white/5"
  const headerWrap = "section-header mb-[60px] opacity-0 translate-y-[40px] transition-all duration-[800ms] ease-out [&.show-element]:opacity-100 [&.show-element]:translate-y-0"
  const titleClass = "text-[2.8rem] md:text-[3.5rem] text-white font-[300] tracking-[-1px]"
  const gridClass = "grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[28px]"
  const cardClass = "achievement-card group rounded-[12px] overflow-hidden bg-[#111] border border-[#1e1e1e] flex flex-col transition-all duration-[800ms] ease-out opacity-0 translate-y-[40px] [&.show-element]:opacity-100 [&.show-element]:translate-y-0 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
  const coverClass = "w-full aspect-[16/9] overflow-hidden bg-[#1a1a2e]"
  const imgClass = "w-full h-full object-cover block transition-transform duration-500 ease-in group-hover:scale-[1.06]"
  const infoClass = "p-[24px] flex-1 flex flex-col gap-[6px] bg-[#111]"
  const h3Class = "text-[1.1rem] font-[700] text-white leading-[1.4] m-0"
  const metaClass = "text-[0.85rem] text-[#666] m-0 tracking-[0.3px]"
  const linkClass = "inline-block mt-[12px] text-[0.85rem] font-[600] text-[#4a90e2] tracking-[0.5px] transition-all duration-200 ease-in hover:text-[#74aaee] hover:tracking-[1px]"

  return (
    <section id="achievement" className={sectionClass} ref={ref}>
        <div className={headerWrap}>
            <h2 className={titleClass}>Achievement</h2>
        </div>

        <div className={gridClass}>
            <div className={cardClass} style={{ transitionDelay: '0s' }}>
                <div className={coverClass}>
                    <img src="Asset/img/Juara_ABU_Robocon.jpg" alt="Certificate Cover" className={imgClass} />
                </div>
                <div className={infoClass}>
                    <h3 className={h3Class}>Best Design ABU Robocon 2025</h3>
                    <p className={metaClass}>Abu Robocon &bull; 2025</p>
                    <a href="https://www.linkedin.com/posts/itsrobocon_aburobocon2025-aburobocon-its-activity-7369267542017654784-Jnp5"
                        target="_blank" className={linkClass} rel="noreferrer">View Details &rarr;</a>
                </div>
            </div>

            <div className={cardClass} style={{ transitionDelay: '0.2s' }}>
                <div className={coverClass}>
                    <img src="Asset/img/Foto_KRAI.jpeg" alt="Certificate Cover" className={imgClass} />
                </div>
                <div className={infoClass}>
                    <h3 className={h3Class}>Juara 1 Kontes Robot ABU Robocon Indonesia (KRAI) 2025</h3>
                    <p className={metaClass}>Belmawa &bull; 2025</p>
                    <a href="https://www.its.ac.id/news/juarai-krai-2025-tim-robot-its-resmi-wakili-indonesia-ke-mongolia/"
                        target="_blank" className={linkClass} rel="noreferrer">View Details &rarr;</a>
                </div>
            </div>

            <div className={cardClass} style={{ transitionDelay: '0.4s' }}>
                <div className={coverClass}>
                    <img src="Asset/img/Juara3_MAGE9.jpeg" alt="Certificate Cover" className={imgClass} />
                </div>
                <div className={infoClass}>
                    <h3 className={h3Class}>Juara 3 Game Development MAGE 9</h3>
                    <p className={metaClass}>Teknik Komputer &bull; 2023</p>
                    <a href="Asset/docs/Sertifikat_MAGE9_GameDev.pdf" target="_blank" className={linkClass} rel="noreferrer">View Details &rarr;</a>
                </div>
            </div>
        </div>
    </section>
  )
})

export default Achievement
