import { useEffect, useState, useRef } from 'react'

export default function AnimatedStat({ value, label }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  // Extract number and suffix (e.g. "15,000+" -> number 15000, suffix "+")
  const numericString = value.replace(/[^0-9]/g, '')
  const targetNumber = parseInt(numericString, 10) || 0
  const suffix = value.replace(/[0-9,]/g, '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated || targetNumber === 0) return

    let start = 0
    const duration = 2000 // 2 seconds
    const steps = 50
    const stepTime = duration / steps
    const increment = targetNumber / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= targetNumber) {
        setCount(targetNumber)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [hasAnimated, targetNumber])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {hasAnimated ? count.toLocaleString('en-IN') : 0}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-white/85">{label}</p>
    </div>
  )
}
