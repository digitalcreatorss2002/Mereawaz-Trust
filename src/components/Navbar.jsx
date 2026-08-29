import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/properties', label: 'Our Programs' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog & News' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Track scroll position for sticky background contrast
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold tracking-wide transition-all duration-300 py-1.5 px-3 rounded-full ${
      isActive
        ? 'text-white bg-[var(--button-bg-color)] shadow-sm'
        : 'text-gray-800 hover:text-[var(--button-bg-color)] hover:bg-black/5'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `text-lg font-bold transition-all duration-300 px-6 py-2 rounded-full w-full text-center ${
      isActive
        ? 'bg-[var(--button-bg-color)] text-white shadow-md'
        : 'text-gray-800 hover:bg-black/5 hover:text-black'
    }`

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* TOP HEADER BAR (Aasha NGO Style - Increased Size) */}
      <div className="hidden bg-[var(--button-bg-color)] text-white/95 text-sm py-3 px-4 sm:block border-b border-white/10 font-medium">
        <div className="container-page flex items-center justify-between">
          {/* Contact Details */}
          <div className="flex items-center gap-8">
            <a href="tel:+919266749755" className="flex items-center gap-2.5 hover:text-[var(--primary-color)] transition-colors">
              <FaPhoneAlt className="text-[var(--primary-color)] text-sm" />
              <span className="font-semibold">+91 92667 49755</span>
            </a>
            <a href="mailto:info@meriawaztrust.org" className="flex items-center gap-2.5 hover:text-[var(--primary-color)] transition-colors">
              <FaEnvelope className="text-[var(--primary-color)] text-sm" />
              <span className="font-semibold">info@meriawaztrust.org</span>
            </a>
            <div className="flex items-center gap-2.5 text-white/80">
              <FaMapMarkerAlt className="text-[var(--primary-color)] text-sm" />
              <span>Dwarka, Delhi NCR, India</span>
            </div>
          </div>

          {/* Social Icons & Quick Info */}
          <div className="flex items-center gap-5">
            <span className="text-white/70 font-semibold me-1">Follow Us:</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-color)] transition-transform hover:scale-110 text-sm" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-color)] transition-transform hover:scale-110 text-sm" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919266749755" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-color)] transition-transform hover:scale-110 text-sm" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-color)] transition-transform hover:scale-110 text-sm" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>


      {/* MAIN NAVIGATION BAR */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-aasha py-3 border-b border-gray-100' 
          : 'bg-[var(--text-color-light)] py-4 border-b border-black/5'
      }`}>
        <div className="container-page flex items-center justify-between">
          {/* BRAND LOGO */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-xl p-1 bg-white shadow-sm border border-black/5 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Meri Awaz Trust Logo"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Meri Awaz <span className="text-[var(--button-bg-color)]">Trust</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
                Charity & Community Service
              </span>
            </div>
          </NavLink>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden items-center gap-2 md:flex lg:gap-3 bg-white/50 backdrop-blur px-4 py-1.5 rounded-full border border-black/5 shadow-inner">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT DONATE CTA BUTTON */}
          <div className="hidden shrink-0 items-center md:flex">
            <NavLink
              to="/donate"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--button-bg-color)] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[var(--button-hover-color)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <FaHeart className="text-pink-300 transition-transform duration-300 group-hover:scale-125 group-hover:text-red-300" />
              <span>Donate Now</span>
            </NavLink>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm border border-black/5 md:hidden active:scale-95 transition-transform"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Navigation Menu"
          >
            {open ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden bg-white border-b border-gray-200 shadow-aasha-lg md:hidden"
          >
            <div className="container-page py-6 flex flex-col items-center gap-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={mobileLinkClass}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}

              <div className="w-full pt-2 border-t border-gray-100 flex flex-col items-center gap-4">
                <NavLink
                  to="/donate"
                  onClick={() => setOpen(false)}
                  className="w-full text-center rounded-full bg-[var(--button-bg-color)] py-3 font-bold text-white shadow-md flex items-center justify-center gap-2"
                >
                  <FaHeart className="text-pink-300" />
                  <span>Donate Now</span>
                </NavLink>

                {/* Mobile Social Links */}
                <div className="flex items-center justify-center gap-6 pt-2 text-gray-600">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <FaFacebookF className="h-5 w-5 hover:text-[var(--button-bg-color)]" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <FaInstagram className="h-5 w-5 hover:text-[var(--button-bg-color)]" />
                  </a>
                  <a href="https://wa.me/919266749755" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                    <FaWhatsapp className="h-5 w-5 hover:text-[var(--button-bg-color)]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}