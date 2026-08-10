import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaPlay,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

export default function AboutSection({ isAboutPage = false }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState("story"); // "story" | "reach" | "ethics"

  // ================= ABOUT PAGE DISTINCT DESIGN =================
  if (isAboutPage) {
    return (
      <section className="py-20 sm:py-28 bg-[#FAF8F4] text-[#0F2E23] overflow-hidden relative font-sans">
        {/* Ambient Decorative Light Glows */}
        <div className="absolute top-10 left-[-150px] w-[500px] h-[500px] rounded-full bg-[var(--accent-gold)]/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-[-150px] w-[500px] h-[500px] rounded-full bg-[var(--button-bg-color)]/10 blur-[130px] pointer-events-none" />

        <div className="container-page relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-down">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-sm font-extrabold tracking-wider text-[var(--text-color-light)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse"></span>
              <span>Who We Are</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-dark)] leading-[1.15] tracking-tight">
              Empowering Rural India Through <br className="hidden sm:block" />
              <span className="text-[var(--button-bg-color)] relative inline-block">
                Technology & Compassion
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[var(--accent-gold)] -z-10 rounded-full opacity-60" />
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              At Meri Awaz Trust, we combine grassroot social work with modern solar energy, agricultural technology, and digital education to create self-sustaining village communities.
            </p>
          </div>

          {/* Main 12-Column Grid */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* ================= LEFT COLUMN: ARCH MASK IMAGE & FLOATING CARDS ================= */}
            <div className="lg:col-span-6 relative animate-fade-right">
              <div className="relative mx-auto max-w-lg lg:max-w-none pt-6 sm:pt-10 pb-6">
                
                {/* Background Shadow Box */}
                <div className="absolute inset-0 bg-[var(--button-bg-color)]/10 rounded-t-[220px] rounded-b-3xl transform rotate-2 scale-95 -z-10" />

                {/* Main Arch Masked Image Container */}
                <div className="relative rounded-t-[200px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-200 group/arch h-[440px] sm:h-[540px]">
                  <img
                    src="/about-banner.jpg"
                    alt="Meri Awaz Trust Community Action"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/arch:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-6 left-6 max-w-[60%] sm:max-w-[55%] text-white">
                    <span className="inline-block rounded-full bg-[var(--accent-gold)] px-3 py-1 text-[11px] font-extrabold uppercase text-[var(--button-bg-color)] tracking-wider mb-2">
                      GRASSROOT MOVEMENT
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">
                      Grassroot Community Empowerment
                    </h3>
                  </div>
                </div>

                {/* Floating Card 1: Experience Badge (Bottom Right) */}
                <div className="absolute -bottom-4 -right-2 sm:-right-6 rounded-2xl bg-[var(--accent-gold)] p-4 sm:p-5 shadow-2xl border-4 border-white text-[var(--button-bg-color)] max-w-[200px] sm:max-w-[240px] transition-transform duration-300 hover:scale-105 animate-float">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-3xl sm:text-4xl block leading-none">25+</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide leading-tight">
                      Years Of <br /> Dedicated Action
                    </span>
                  </div>
                </div>

                {/* Floating Card 2: Lives Impacted Pill (Top Left) */}
                <div className="absolute top-12 -left-2 sm:-left-6 rounded-2xl bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--button-bg-color)] text-[var(--accent-gold)] text-lg">
                    <FaCheck />
                  </div>
                  <div>
                    <span className="font-extrabold text-base sm:text-lg block leading-none text-gray-900">
                      100,000+
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 block mt-0.5">
                      Lives Impacted
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* ================= RIGHT COLUMN: 3 MODERN FEATURE CARDS & CTAS ================= */}
            <div className="lg:col-span-6 space-y-5 animate-fade-left">
              
              {/* Feature 1 */}
              <div className="group p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[var(--accent-gold)]/60 flex items-start gap-4 sm:gap-5">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)] text-xl shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-display text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[var(--button-bg-color)] transition-colors">
                    Agricultural Innovation & Drone Farming
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Deploying modern drone spraying labs, precision farming tools, and organic soil health practices for smallholder rural farmers.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[var(--accent-gold)]/60 flex items-start gap-4 sm:gap-5">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)] text-xl shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
                  </svg>
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-display text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[var(--button-bg-color)] transition-colors">
                    Clean Solar Power & Micro-Grids
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Bringing renewable solar micro-grids to off-grid homes and solar irrigation pumps to eliminate electricity scarcity in remote villages.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[var(--accent-gold)]/60 flex items-start gap-4 sm:gap-5">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)] text-xl shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-display text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[var(--button-bg-color)] transition-colors">
                    Digital Education & Skill Labs
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Providing e-learning computer labs, vocational training, and digital literacy tools for women and young students across India.
                  </p>
                </div>
              </div>

              {/* Action Button Group */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[#e2bf44] px-6 py-3.5 text-xs sm:text-sm font-bold text-[var(--button-bg-color)] shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Contact Our Team</span>
                  <FiArrowUpRight className="text-lg font-bold" />
                </Link>

                <Link
                  to="/volunteer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--button-bg-color)] text-[var(--button-bg-color)] hover:bg-[var(--button-bg-color)] hover:text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Become A Volunteer</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Video Overlay Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-4xl rounded-3xl bg-black overflow-hidden shadow-2xl border border-white/10">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close Modal"
              >
                <FaTimes className="text-base" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="NGO Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // ================= HOMEPAGE ORIGINAL DESIGN =================
  return (
    <section className="py-16 sm:py-14 bg-[var(--bg-color-light)] text-[#0F2E23] overflow-hidden relative font-sans">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* ================= LEFT COLUMN: OVERLAPPING CAPSULES ================= */}
          <div className="lg:col-span-6 relative animate-fade-right">
            <div className="relative mx-auto max-w-md lg:max-w-none h-[480px] sm:h-[650px] flex items-center justify-center">
              {/* Background Hands/Hearts PNG Illustration (abouthand.png) */}
              <div className="absolute top-0 right-[10%] sm:right-[10%] z-0 pointer-events-none opacity-40 sm:opacity-50">
                <img
                  src="/abouthand.png"
                  alt="Hands and Hearts Illustration"
                  className="w-48 sm:w-64 h-auto object-contain"
                />
              </div>

              {/* 1. BIG LEFT CAPSULE IMAGE */}
              <div className="group/img1 w-[200px] xs:w-[230px] sm:w-[360px] h-[320px] xs:h-[360px] sm:h-[540px] rounded-tl-[1000px] rounded-tr-[1000px] rounded-br-[1000px] rounded-bl-[1000px] overflow-hidden absolute top-0 left-0 z-10 bg-gray-200 shadow-md transition-all duration-500 hover:shadow-xl cursor-pointer">
                <img
                  src="/about-banner.jpg"
                  alt="NGO Protesters"
                  className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover/img1:scale-110 group-hover/img1:brightness-105"
                />
                <div className="absolute inset-0 bg-white/0 group-hover/img1:bg-white/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* 2. SMALL CAPSULE IMAGE */}
              <div className="group/img2 w-[170px] xs:w-[190px] sm:w-[330px] h-[250px] xs:h-[280px] sm:h-[500px] rounded-tl-[1000px] rounded-tr-[1000px] rounded-br-[1000px] rounded-bl-[1000px] overflow-hidden absolute top-[150px] sm:top-[180px] bottom-2 left-[90px] xs:left-[110px] sm:left-[250px] z-20 bg-gray-200 border-[4px] sm:border-[6px] border-[var(--text-color-light)] shadow-xl transition-all duration-500 hover:shadow-2xl cursor-pointer">
                <img
                  src="/hero-banner.jpg"
                  alt="Ethnicities United"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img2:scale-110 group-hover/img2:brightness-105"
                />
                <div className="absolute inset-0 bg-white/0 group-hover/img2:bg-white/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* 3. YELLOW OVERLAY CARD */}
              <div className="absolute bottom-6 left-[60px] xs:left-[80px] sm:left-[170px] z-30 rounded-2xl bg-[var(--accent-gold)] p-3 sm:p-4 text-[var(--text-color)] shadow-xl text-center w-32 sm:w-40 border-[4px] sm:border-[6px] border-[var(--text-color-light)] transition-transform duration-300 hover:scale-105">
                <span className="font-extrabold text-2xl sm:text-4xl block leading-none tracking-tight">
                  25+
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wide block mt-1 leading-snug">
                  Years Of <br /> Experience
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: TEXT & CONTENT ================= */}
          <div className="lg:col-span-6 space-y-6 lg:pl-2 animate-fade-left">
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/60 bg-[var(--button-bg-color)] px-3.5 py-1 text-xs font-semibold text-[var(--text-color-light)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block" />
              <span>About Our NGO</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-dark)] leading-[1.12] tracking-tight">
              Movement Built Hope <br /> and Humanity
            </h2>

            {/* Subtitle Paragraph */}
            <p className="text-md sm:lg text-[var(--text-dark)] leading-relaxed max-w-xl">
              We believe in the power of collective compassion. Through
              dedicated efforts and inclusive programs, we support vulnerable
              communities.
            </p>

            {/* Middle Feature Card Box */}
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col justify-between space-y-4 flex-1 w-full">
                {/* Yellow Icon Container */}
                <div className="flex items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3D053] text-[#0F2E23]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-[#0F2E23]">
                    Empowering Communities
                  </h4>

                  <div className="w-full h-px bg-gray-100 my-3" />

                  <p className="text-md sm:text-md text-[var(--text-dark)] flex items-center gap-2 font-medium">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F3D053] text-[#0F2E23] text-[9px]">
                      <FaCheck />
                    </span>
                    <span>
                      We work closely with community to identify real needs.
                    </span>
                  </p>
                </div>
              </div>

              {/* CARD RIGHT IMAGE: Rounded Square with Light Hover Effect */}
              <div className="group/cardImg relative w-full sm:w-48 h-50 shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-xs border border-gray-100 cursor-pointer">
                <img
                  src="/mission.jpg"
                  alt="Empowering Communities"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/cardImg:scale-110 group-hover/cardImg:brightness-105"
                />
                {/* Light hover sheen */}
                <div className="absolute inset-0 bg-white/0 group-hover/cardImg:bg-white/10 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-gray-200/80 my-2" />

            {/* Bottom Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[#e2bf44] px-6 py-3.5 text-xs sm:text-sm font-bold text-[var(--text-color)] shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>More About Us</span>
                <FiArrowUpRight className="text-lg font-bold" />
              </Link>

              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-[var(--text-color)] group cursor-pointer"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--text-color)] transition-transform duration-300 group-hover:scale-110">
                  <FaPlay className="text-xs ml-0.5 text-[var(--text-color)]" />
                </div>
                <span className="group-hover:opacity-80 transition-opacity">
                  Watch Our Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Overlay Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl rounded-3xl bg-black overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Close Modal"
            >
              <FaTimes className="text-base" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="NGO Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
