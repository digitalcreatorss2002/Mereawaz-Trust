import { useState, useEffect, useRef } from 'react'

export default function InfiniteSlider({ children, interval = 3500, visibleItems = 3, theme = 'light' }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getItemsPerPage = () => {
    if (visibleItems === 6) {
      if (windowWidth >= 1024) return 6
      if (windowWidth >= 640) return 3
      return 2
    }
    if (windowWidth >= 1024) return Math.min(visibleItems, 3)
    if (windowWidth >= 640) return Math.min(visibleItems, 2)
    return 1
  }

  const itemsPerPage = getItemsPerPage()

  const items = Array.isArray(children) ? children.filter(Boolean) : children ? [children] : []
  const count = items.length

  // Duplicate items to support infinite continuous scrolling
  const multiplier = count > 0 ? Math.max(3, Math.ceil((itemsPerPage * 3) / count)) : 0
  const displayItems = []
  if (count > 0) {
    for (let i = 0; i < multiplier; i++) {
      displayItems.push(...items)
    }
  }

  const [currentIndex, setCurrentIndex] = useState(count)

  useEffect(() => {
    setCurrentIndex(count)
  }, [count])

  useEffect(() => {
    if (count <= 1 || isHovered) return

    timerRef.current = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [count, isHovered, interval])

  if (count === 0) return null

  if (count === 1) {
    return (
      <div className="py-4 w-full flex justify-center">
        <div className="w-full max-w-md">{items[0]}</div>
      </div>
    )
  }

  const handleTransitionEnd = () => {
    if (currentIndex >= count * 2) {
      setIsTransitioning(false)
      setCurrentIndex((prev) => prev - count)
    } else if (currentIndex < count) {
      setIsTransitioning(false)
      setCurrentIndex((prev) => prev + count)
    }
  }

  const nextSlide = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const activeIndex = ((currentIndex % count) + count) % count

  const isDark = theme === 'dark'

  return (
    <div
      className="relative overflow-hidden py-4 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding Track */}
      <div
        className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
        }}
      >
        {displayItems.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-3 flex justify-center items-stretch"
            style={{ width: `${100 / itemsPerPage}%` }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Controls & Indicators */}
      <div className="mt-8 flex items-center justify-center gap-4 px-2 w-full">
        <div className="flex items-center justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true)
                setCurrentIndex(count + idx)
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? isDark
                    ? 'w-8 bg-white shadow-xs'
                    : 'w-8 bg-[#13382C] shadow-xs'
                  : isDark
                  ? 'w-2.5 bg-white/40 hover:bg-white/60'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}