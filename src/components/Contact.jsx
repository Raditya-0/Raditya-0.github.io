import React, { forwardRef } from 'react'

const Contact = forwardRef(function Contact(_, ref) {

  const footerClass = "bg-[#0a0a0a] min-h-[100vh] flex flex-col justify-center snap-start"
  const contentClass = "text-center w-full max-w-[800px] mx-auto px-[5%]"
  const h2Class = "text-[2.5rem] mb-[20px] text-white"
  const pClass = "text-[#888] max-w-[500px] mx-auto mb-[30px]"
  const emailClass = "inline-block text-[1.5rem] text-white font-[700] mb-[40px] pb-[5px] border-b-2 border-[#4a90e2]"
  const socialWrap = "flex justify-center gap-[30px] mb-[40px]"
  const linkClass = "group inline-flex items-center transition-all duration-200 ease-in opacity-50 hover:opacity-100 hover:-translate-y-[3px] active:scale-90"
  const imgClass = "w-[32px] h-[32px] object-contain invert brightness-0 transition-[filter] duration-200 ease-in group-hover:brightness-[1.4]"
  const copyClass = "text-[0.85rem] text-[#444]"

  return (
    <footer id="contact" className={footerClass} ref={ref}>
        <div className={contentClass}>
            <h2 className={h2Class}>Let&apos;s Connect</h2>
            <p className={pClass}>I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>

            <a href="https://mail.google.com/mail/?view=cm&to=radityaakmal514@gmail.com" target="_blank" rel="noreferrer" className={emailClass}>radityakmal514@gmail.com</a>

            <div className={socialWrap}>
                <a href="https://github.com/Raditya-0" target="_blank" aria-label="GitHub" className={linkClass} rel="noreferrer">
                    <img src="Asset/logo/github.png" alt="GitHub" className={imgClass} />
                </a>
                <a href="https://www.linkedin.com/in/raditya-akmal" target="_blank" aria-label="LinkedIn" className={linkClass} rel="noreferrer">
                    <img src="Asset/logo/linkedin.png" alt="LinkedIn" className={imgClass} />
                </a>
            </div>

            <p className={copyClass}>&copy; 2026 Raditya Akmal. All Rights Reserved.</p>
        </div>
    </footer>
  )
})

export default Contact
