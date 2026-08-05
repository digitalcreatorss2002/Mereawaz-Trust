import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaArrowRight } from 'react-icons/fa'
import { api } from '../api.js'

export default function Footer() {
  const [footerPrograms, setFooterPrograms] = useState([])

  useEffect(() => {
    api
      .get('/properties.php')
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setFooterPrograms(res.data.slice(0, 6))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="relative bg-[var(--button-bg-color)] text-white/90 overflow-hidden pt-16 pb-8 border-t border-white/10">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--button-bg-color)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--primary-color)]/10 blur-3xl" />

      <div className="container-page relative z-10">
        {/* TOP NEWSLETTER CARD (Aasha Style) */}
        <div className="mb-16 rounded-3xl bg-gradient-to-r from-[var(--button-bg-color)] to-[#416320] p-8 sm:p-10 shadow-aasha-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
            <FaHeart className="text-9xl text-white" />
          </div>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white mb-2">
                Stay Updated With Our Work
              </span>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Join Us &amp; Make a Lifelong Impact
              </h3>
              <p className="mt-1 text-sm text-white/80">
                Subscribe to our newsletter for field updates, stories of hope, and transparent impact reports.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full rounded-full bg-white/10 border border-white/30 px-5 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--button-bg-color)] transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER 4-COLUMN GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-white/10">
          {/* COLUMN 1: ABOUT NGO */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-1 shadow-sm border border-white/20">
                <img src="/meriawajtrust.png" alt="Meri Awaz Trust Logo" className="h-12 w-auto object-contain" />
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                Meri Awaz <span className="text-[var(--primary-color)]">Trust</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-color-light)] leading-relaxed">
              Every voice deserves to be heard. We are a registered non-profit trust dedicated to empowering rural India through education, healthcare, sustainable agriculture, and clean energy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--text-color)] transition-all hover:bg-[var(--text-color-light)] hover:scale-110" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--text-color)] transition-all hover:bg-[var(--text-color-light)] hover:scale-110" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/919266749755" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--text-color)] transition-all hover:bg-[var(--text-color-light)] hover:scale-110" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--text-color)] transition-all hover:bg-[var(--text-color-light)] hover:scale-110" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-lg font-bold text-white border-b border-[var(--button-bg-color)] pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-color-light)]">
              <li>
                <Link to="/" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> Our Programs
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> News &amp; Blog
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> Join As Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                  <FaArrowRight className="text-[10px] text-[var(--text-color-light)]" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: OUR CORE FOCUS (DYNAMIC FROM BACKEND) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-lg font-bold text-[var(--text-color-light)] border-b border-[var(--button-bg-color)] pb-2 inline-block">
              Our Core Focus
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-color-light)]">
              {footerPrograms.length > 0 ? (
                footerPrograms.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/properties/${p.slug || p.id}`}
                      className="hover:text-[var(--primary-color)] transition-colors flex items-center gap-2 line-clamp-1"
                    >
                      <FaArrowRight className="text-[10px] text-[var(--text-color-light)] shrink-0" />
                      <span>{p.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--primary-color)]">🌾</span> Sustainable Drone Agriculture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--primary-color)]">☀️</span> Solar &amp; Renewable Energy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--primary-color)]">💻</span> Digital Literacy &amp; E-Learning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--primary-color)]">🏥</span> Adolescent Rural Healthcare
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--primary-color)]">👩</span> Women Empowerment &amp; Skill Support
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-lg font-bold text-[var(--text-color-light)] border-b border-[var(--button-bg-color)] pb-2 inline-block">
              Contact Details
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-color-light)]">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[var(--primary-color)] mt-1 shrink-0" />
                <span>Dwarka More, Dwarka, New Delhi - 110059, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[var(--primary-color)] shrink-0" />
                <a href="tel:+919266749755" className="hover:text-white transition-colors">+91 92667 49755</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[var(--primary-color)] shrink-0" />
                <a href="mailto:info@meriawaztrust.org" className="hover:text-white transition-colors">info@meriawaztrust.org</a>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-gold)] px-5 py-2 text-xs font-bold text-[var(--text-color)] shadow transition-transform hover:scale-105"
              >
                <FaHeart className="text-red-600" />
                <span>Make a Direct Donation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="pt-6 text-center text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Meri Awaz Trust. All rights reserved.</p>
          <p>
            Designed &amp; Developed By <FaHeart className="inline text-red-500 mx-1" /> <span className="hover:text-[var(--text-color-light)] transition-colors"><Link to="https://digitalcreatorss.com/">Digital Creatorss</Link></span>
          </p>
        </div>
      </div>
    </footer>
  )
}
