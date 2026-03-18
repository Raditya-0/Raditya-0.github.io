import { useEffect, useRef, useCallback } from 'react'

const SCROLL_THRESHOLD = 150
const TOUCH_THRESHOLD = 80

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))
    if (elapsed < duration) requestAnimationFrame(animation)
  }
  requestAnimationFrame(animation)
}

/**
 * useScrollSnap
 * @param {React.RefObject[]} sectionRefs - array of refs to each section element
 * @param {(pct: number, active: boolean) => void} onProgress - progress bar callback
 */
export function useScrollSnap(sectionRefs, onProgress) {
  const state = useRef({ currentIndex: 0, isLocked: false, wheelAccumulator: 0 })

  const getSections = useCallback(() =>
    sectionRefs.map(r => r.current).filter(Boolean),
  [sectionRefs])

  const hideProgress = useCallback(() => {
    onProgress(0, false)
  }, [onProgress])

  const handleScroll = useCallback((direction) => {
    const sections = getSections()
    const s = state.current
    if (direction > 0) {
      if (s.currentIndex === sections.length - 1) { hideProgress(); return }
      s.currentIndex++
    } else {
      if (s.currentIndex === 0) { hideProgress(); return }
      s.currentIndex--
    }
    s.isLocked = true
    s.wheelAccumulator = 0
    smoothScrollTo(sections[s.currentIndex].offsetTop, 1200)
    onProgress(100, true)
    setTimeout(() => hideProgress(), 200)
    setTimeout(() => { s.isLocked = false; s.wheelAccumulator = 0 }, 1200)
  }, [getSections, hideProgress, onProgress])

  // Public: scroll to specific section index (for navbar clicks)
  const scrollToSection = useCallback((idx) => {
    const sections = getSections()
    if (idx < 0 || idx >= sections.length) return
    const s = state.current
    sections.forEach(sec => { sec.scrollTop = 0 })
    s.currentIndex = idx
    s.isLocked = true
    s.wheelAccumulator = 0
    smoothScrollTo(sections[idx].offsetTop, 1000)
    setTimeout(() => { s.isLocked = false }, 1000)
  }, [getSections])

  useEffect(() => {
    let resetTimeout
    let wasScrollingInternally = false
    let touchStartY = 0
    let currentTouchY = 0

    function onWheel(e) {
      const s = state.current
      if (s.isLocked) { e.preventDefault(); return }

      const sections = getSections()
      const currentSection = sections[s.currentIndex]
      const scrollingDown = e.deltaY > 0
      const scrollingUp = e.deltaY < 0
      const canDown = currentSection && currentSection.scrollTop + currentSection.clientHeight < currentSection.scrollHeight - 1
      const canUp = currentSection && currentSection.scrollTop > 0

      if ((scrollingDown && canDown) || (scrollingUp && canUp)) {
        wasScrollingInternally = true
        s.wheelAccumulator = 0
        hideProgress()
        return
      }
      if (wasScrollingInternally) {
        wasScrollingInternally = false
        s.wheelAccumulator = 0
        e.preventDefault()
        return
      }

      e.preventDefault()
      s.wheelAccumulator += e.deltaY
      const pct = Math.min((Math.abs(s.wheelAccumulator) / SCROLL_THRESHOLD) * 100, 100)
      onProgress(pct, true)

      clearTimeout(resetTimeout)
      if (Math.abs(s.wheelAccumulator) >= SCROLL_THRESHOLD) {
        handleScroll(s.wheelAccumulator)
      } else {
        resetTimeout = setTimeout(() => {
          s.wheelAccumulator = 0
          hideProgress()
        }, 300)
      }
    }

    function onTouchStart(e) {
      if (state.current.isLocked) return
      touchStartY = e.touches[0].clientY
      currentTouchY = touchStartY
    }

    function onTouchMove(e) {
      const s = state.current
      if (s.isLocked) { e.preventDefault(); return }
      currentTouchY = e.touches[0].clientY
      const deltaY = touchStartY - currentTouchY
      const sections = getSections()
      const currentSection = sections[s.currentIndex]
      const scrollingDown = deltaY > 0
      const scrollingUp = deltaY < 0
      const canDown = currentSection && currentSection.scrollTop + currentSection.clientHeight < currentSection.scrollHeight - 1
      const canUp = currentSection && currentSection.scrollTop > 0
      if ((scrollingDown && canDown) || (scrollingUp && canUp)) return
      e.preventDefault()
      const pct = Math.min((Math.abs(deltaY) / TOUCH_THRESHOLD) * 100, 100)
      onProgress(pct, true)
      if (Math.abs(deltaY) >= TOUCH_THRESHOLD) handleScroll(deltaY)
    }

    function onTouchEnd() {
      if (state.current.isLocked) return
      const deltaY = touchStartY - currentTouchY
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) hideProgress()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      clearTimeout(resetTimeout)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [getSections, handleScroll, hideProgress, onProgress])

  return { scrollToSection }
}
