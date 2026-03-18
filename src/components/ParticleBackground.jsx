import React, { useRef } from 'react'
import { useParticles } from '../hooks/useParticles'

const ParticleBackground = React.memo(function ParticleBackground() {
  const canvasRef = useRef(null)
  useParticles(canvasRef)
  return <canvas id="bg-canvas" ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-[0.55] w-full h-full"></canvas>
})

export default ParticleBackground
