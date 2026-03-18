import React, { useState, forwardRef, useEffect } from 'react'
import { useTyping } from '../hooks/useTyping'

const Hero = forwardRef(function Hero({ onScrollDown }, ref) {
  const { typedText, isCursorTyping, currentData } = useTyping()
  const [slideIndex, setSlideIndex] = useState(0)

  const slides = [
    '/Asset/img/Foto_Profile.jpeg',
    '/Asset/img/Foto_diri_KRAI.jpeg',
  ]

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setSlideIndex(i => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <header id="about" className="min-h-[100vh] flex items-center px-[5%] pt-[80px]" ref={ref}>
        <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto gap-[50px] flex-col md:flex-row">
            <div className="flex-1 text-left m-0 max-w-[800px]">
                <h2 className="text-[1rem] uppercase tracking-[3px] text-[#888] mb-[20px]">Student AI Engineer In ITS Surabaya</h2>
                <h1 className="text-[4.5rem] leading-[1.2] mb-[30px] font-[800] min-h-[170px] text-white">
                    Hi, I&apos;m<br />
                    <span className="text-[#4a90e2]">{typedText}</span>
                    <span className={`inline-block w-[5px] h-[1em] ml-[8px] align-text-bottom ${isCursorTyping ? 'bg-white' : 'animate-[blink_1s_infinite]'}`}></span>
                </h1>

                <div className="min-h-[120px] mb-[40px]">
                    <p className="text-[1.1rem] text-[#aaa] mb-[15px] tracking-[1px] flex items-center gap-[8px]">
                        {currentData.icon && <img src={currentData.icon} alt="icon" className="w-[24px] h-[24px] inline-block" />}
                        <span>{currentData.subtitle}</span>
                    </p>
                    <div className="flex flex-wrap justify-start gap-[10px]">
                        {currentData.tags.map((tag, i) => {
                            const isBreak = (i + 1) % 4 === 0 && (i + 1) < currentData.tags.length;
                            return (
                                <React.Fragment key={`${tag}-${i}`}>
                                    <span 
                                      className="bg-[#4a90e2]/10 text-[#4a90e2] px-[16px] py-[6px] rounded-[20px] text-[0.85rem] font-[600] border border-[#4a90e2]/20 opacity-0 translate-y-[10px] animate-[tagFadeIn_0.4s_forwards] cursor-pointer transition-all duration-200 ease-in hover:bg-[#4a90e2]/20 hover:border-[#4a90e2]/50 hover:shadow-[0_0_12px_rgba(74,144,226,0.25)] active:scale-93 active:bg-[#4a90e2]/30 active:shadow-[0_0_6px_rgba(74,144,226,0.2)] select-none" 
                                      style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                      {tag}
                                    </span>
                                    {isBreak && <div className="w-full h-0"></div>}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-start gap-[20px]">
                    <a href="#projects" className="px-[30px] py-[12px] rounded-[4px] font-[600] tracking-[1px] transition-all duration-300 bg-[#e0e0e0] text-[#0d0d0d] hover:bg-white hover:-translate-y-[2px]" onClick={e => { e.preventDefault(); onScrollDown(3); }}>View Portfolio</a>
                    <a href="#contact" className="px-[30px] py-[12px] rounded-[4px] font-[600] tracking-[1px] transition-all duration-300 border border-[#e0e0e0] text-[#e0e0e0] hover:bg-[#e0e0e0] hover:text-[#0d0d0d]" onClick={e => { e.preventDefault(); onScrollDown(5); }}>Contact Me</a>
                </div>
            </div>

            <div className="shrink-0 flex justify-center items-center opacity-0 translate-y-[40px] animate-[tagFadeIn_0.8s_0.5s_forwards]">
                <div className="w-[320px] h-[420px] rounded-[16px] overflow-hidden border-2 border-[#222] shadow-[0_15px_35px_rgba(0,0,0,0.5)] bg-[#151515] relative">
                    {slides.map((src, i) => (
                        <img 
                            key={src} 
                            src={src} 
                            alt={i === 0 ? "Profile Photo" : "KRAI Photo"} 
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${slideIndex === i ? 'opacity-100' : 'opacity-0'}`} 
                        />
                    ))}
                </div>
            </div>
        </div>
    </header>
  )
})

export default Hero
