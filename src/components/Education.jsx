import React, { forwardRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const Education = forwardRef(function Education(_, ref) {
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

  return (
    <section id="education" className={sectionClass} ref={ref}>
        <div className={innerClass}>
            <div className={headerClass}>
                <h2 className={titleClass}>Education</h2>
            </div>

            <div className={timelineClass}>
                <div className={itemPresent} style={{ animationDelay: '0.1s' }}>
                    <p className={dateClass}>July 2024 - <span className={accentClass}>Present</span></p>
                    <h3 className={roleClass}>Student of Artificial Intelligence Engineering</h3>
                    <p className={compClass}>Sepuluh Nopember Institute of Technology (ITS)</p>
                </div>

                <div className={itemNormal} style={{ animationDelay: '0.25s' }}>
                    <p className={dateClass}>July 2021 - June 2024</p>
                    <h3 className={roleClass}>Science Major Student</h3>
                    <p className={compClass}>SMAN 20 Surabaya</p>
                </div>
            </div>
        </div>
    </section>
  )
})

export default Education
