import { useState, useEffect, useRef, useMemo } from 'react'

const TYPING_DELAY = 100
const ERASING_DELAY = 50
const NEW_TEXT_DELAY = 2000

export function useTyping() {
  const typingData = useMemo(() => [
    {
      text: 'Raditya Akmal',
      subtitle: 'Welcome to my portfolio',
      icon: '/Asset/logo/star.png',
      tags: ['Problem Solver', 'Tech Enthusiast', 'Fast Learner'],
    },
    {
      text: 'an AI Engineer',
      subtitle: 'Building intelligent models and LLM',
      icon: '/Asset/logo/brain.png',
      tags: ['Python', 'Transformer', 'Hugging Face', 'Kaggle', 'LLM', 'Machine Learning', 'Deep Learning', 'Computer Vision'],
    },
    {
      text: 'a Robot Programmer',
      subtitle: 'Developing advanced control and navigation',
      icon: '/Asset/logo/robot.png',
      tags: ['ROS 2', 'STM32', 'C++', 'Computer Vision', 'FAST-LIVO2'],
    },
    {
      text: 'a Game Developer',
      subtitle: 'Crafting interactive mechanics and experiences',
      icon: '/Asset/logo/game.png',
      tags: ['Unity', 'Godot', 'Game Design', '2D Games', '3D Games', 'C#', 'GDScript'],
    },
  ], [])

  const [typedText, setTypedText] = useState('')
  const [isCursorTyping, setIsCursorTyping] = useState(false)
  const [dataIndex, setDataIndex] = useState(0)
  const [currentData, setCurrentData] = useState(typingData[0])

  const stateRef = useRef({ textArrayIndex: 0, charIndex: 0, phase: 'wait' })
  const timerRef = useRef(null)

  useEffect(() => {
    const s = stateRef.current

    function scheduleType() {
      timerRef.current = setTimeout(type, TYPING_DELAY)
    }
    function scheduleErase() {
      timerRef.current = setTimeout(erase, ERASING_DELAY)
    }

    function type() {
      const full = typingData[s.textArrayIndex].text
      if (s.charIndex < full.length) {
        setIsCursorTyping(true)
        s.charIndex++
        setTypedText(full.substring(0, s.charIndex))
        scheduleType()
      } else {
        setIsCursorTyping(false)
        timerRef.current = setTimeout(scheduleErase, NEW_TEXT_DELAY)
      }
    }

    function erase() {
      const full = typingData[s.textArrayIndex].text
      if (s.charIndex > 0) {
        setIsCursorTyping(true)
        s.charIndex--
        setTypedText(full.substring(0, s.charIndex))
        scheduleErase()
      } else {
        setIsCursorTyping(false)
        s.textArrayIndex = (s.textArrayIndex + 1) % typingData.length
        setDataIndex(s.textArrayIndex)
        setCurrentData(typingData[s.textArrayIndex])
        timerRef.current = setTimeout(scheduleType, TYPING_DELAY + 500)
      }
    }

    // Start after initial delay
    timerRef.current = setTimeout(scheduleType, NEW_TEXT_DELAY)

    return () => clearTimeout(timerRef.current)
  }, [typingData])

  return { typedText, isCursorTyping, currentData }
}
