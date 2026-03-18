import React from 'react'

function ScrollProgress({ percentage, active }) {
  const containerClass = `fixed bottom-0 left-0 w-full h-[4px] bg-white/10 z-[9999] opacity-0 translate-y-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? '!opacity-100 !translate-y-0' : ''}`
  const barClass = "h-full bg-white transition-[width] duration-150 ease-out"

  return (
    <div className={containerClass} id="scroll-progress-container">
        <div 
          className={barClass} 
          id="scroll-progress-bar"
          style={{ width: `${percentage}%` }}
        ></div>
    </div>
  )
}

export default React.memo(ScrollProgress)
