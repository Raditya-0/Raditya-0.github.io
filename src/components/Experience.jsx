import React, { forwardRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const Experience = forwardRef(function Experience(_, ref) {
  useReveal(ref)

  const sectionClass = "h-[100vh] overflow-y-auto flex flex-col border-b border-white/5 box-border no-scrollbar"
  const innerClass = "pt-[100px] pb-[100px] px-[5%] max-w-[1200px] w-full mx-auto"
  const headerClass = "mb-[60px]"
  const titleClass = "text-[2.8rem] md:text-[3.5rem] text-white font-[300] tracking-[-1px]"
  const timelineClass = "border-l border-[#222] ml-[15px] py-[5px]"
  const itemBase = "relative pl-[40px] mb-[40px] md:mb-[60px] last:mb-0 opacity-0 translate-y-[20px] animate-[timelineFadeIn_0.5s_ease-out_forwards] before:content-[''] before:absolute before:-left-[8px] before:top-[6px] before:w-[15px] before:h-[15px] before:rounded-full"
  const itemNormal = `${itemBase} before:bg-[#555]`
  const itemPresent = `${itemBase} before:bg-[#4a90e2] before:shadow-[0_0_10px_rgba(74,144,226,0.3)]`
  
  const dateClass = "text-[1rem] text-[#aaa] mb-[8px] font-[400]"
  const accentClass = "text-[#4a90e2]"
  const roleClass = "text-[1.8rem] md:text-[2.2rem] text-white font-[500] mb-[8px] leading-[1.2] tracking-[-0.5px]"
  const compClass = "text-[1.1rem] text-[#666] font-[400]"
  const courseClass = "inline-block mt-[10px] text-[0.85rem] text-[#4a90e2] bg-[#4a90e2]/10 border border-[#4a90e2]/20 py-[4px] px-[14px] rounded-[20px] font-[600] tracking-[0.5px]"

  return (
    <section id="experience" className={sectionClass} ref={ref}>
        <div className={innerClass}>
            <div className={headerClass}>
                <h2 className={titleClass}>Experience</h2>
            </div>

            <div className={timelineClass}>
                <div className={itemPresent} style={{ animationDelay: '0.1s' }}>
                    <p className={dateClass}>November 2024 - <span className={accentClass}>Present</span></p>
                    <h3 className={roleClass}>Robot Programmer</h3>
                    <p className={compClass}>ITS Robocon</p>
                </div>

                <div className={itemPresent} style={{ animationDelay: '0.25s' }}>
                    <p className={dateClass}>March 2025 - <span className={accentClass}>Present</span></p>
                    <h3 className={roleClass}>Game Developer</h3>
                    <p className={compClass}>Schematics ITS</p>
                </div>

                <div className={itemPresent} style={{ animationDelay: '0.4s' }}>
                    <p className={dateClass}>August 2025 - <span className={accentClass}>Present</span></p>
                    <h3 className={roleClass}>Assistant Lecturer</h3>
                    <p className={compClass}>Sepuluh Nopember Institute of Technology (ITS)</p>
                    <p className={courseClass}>Data Structure</p>
                </div>

                <div className={itemNormal} style={{ animationDelay: '0.55s' }}>
                    <p className={dateClass}>August 2025 - December 2025</p>
                    <h3 className={roleClass}>Assistant Lecturer</h3>
                    <p className={compClass}>Sepuluh Nopember Institute of Technology (ITS)</p>
                    <p className={courseClass}>Fundamental Programming</p>
                </div>
            </div>
        </div>
    </section>
  )
})

export default Experience
