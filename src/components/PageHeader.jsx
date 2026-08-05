import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronRight } from 'react-icons/fa'

export default function PageHeader({ eyebrow, title, subtitle, bgImage = '/hero-banner.jpg' }) {
  return (
    <section className="relative overflow-hidden bg-[var(--dark-ngo)] py-16 sm:py-24 text-white border-b border-white/10">
      {/* Background Banner Image with Dark Contrast Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-ngo)] via-[var(--dark-ngo)]/70 to-transparent" />

      {/* Decorative Blur Circles */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--button-bg-color)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[var(--primary-color)]/20 blur-3xl" />

      <div className="container-page relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {eyebrow && (
            <span className="inline-block rounded-full bg-[var(--primary-color)] text-gray-900 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-md">
              {eyebrow}
            </span>
          )}

          <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* BREADCRUMB TRAIL */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-white/70">
            <Link to="/" className="hover:text-[var(--primary-color)] transition-colors">
              Home
            </Link>
            <FaChevronRight className="text-[10px] text-[var(--button-bg-color)]" />
            <span className="text-[var(--primary-color)]">{title}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
