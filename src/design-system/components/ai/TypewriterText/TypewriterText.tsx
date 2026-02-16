import { useState, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { TypewriterTextProps } from './TypewriterText.schema'

export function TypewriterText({ text, speed = 30, delay = 0, onComplete, className }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t) }, [delay])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) { clearInterval(interval); completeRef.current?.() } }, speed)
    return () => clearInterval(interval)
  }, [text, speed, started])

  return (
    <span className={twMerge('text-sm text-white/80', className)}>
      {displayed}
      {displayed.length < text.length && started && <span className="animate-pulse text-white/40">|</span>}
    </span>
  )
}
TypewriterText.displayName = 'TypewriterText'
