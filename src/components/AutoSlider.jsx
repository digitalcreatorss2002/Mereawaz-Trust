import { useState, useEffect, useRef } from 'react'

export default function AutoSlider({ children, interval = 3500 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const items = Array.isArray(children) ? children : children ? [children] : []
  const totalItems = items.length

  useEffect(() => {
    if (totalItems <= 1 || isHovered) return

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems)
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [totalItems, isHovered, interval])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }

  if (totalItems === 0) return null

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/3"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {totalItems > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-card transition hover:bg-accent hover:text-primary-dark"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-card transition hover:bg-accent hover:text-primary-dark"
            >
              &#8594;
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto py-1">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-accent' : 'w-2 bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
