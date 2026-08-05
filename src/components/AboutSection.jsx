import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaPlay, FaTimes } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export default function AboutSection({ isAboutPage = false }) {
  const [showVideoModal, setShowVideoModal] = useState(false);

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

              {/* 1. BIG LEFT CAPSULE IMAGE (With Light Hover Overlay & Scale Effect) */}
              <div className="group/img1 w-[250px] sm:w-[360px] h-[370px] sm:h-[540px] rounded-tl-[1000px] rounded-tr-[1000px] rounded-br-[1000px] rounded-bl-[1000px] overflow-hidden absolute top-0 left-0 z-10 bg-gray-200 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <img
                  src="/about-banner.jpg"
                  alt="NGO Protesters"
                  className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover/img1:scale-110 group-hover/img1:brightness-105"
                />
                {/* Light white shine overlay on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover/img1:bg-white/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* 2. SMALL CAPSULE IMAGE (With Light Hover Overlay & Scale Effect) */}
              <div className="group/img2 w-[210px] sm:w-[330px] h-[290px] sm:h-[500px] rounded-tl-[1000px] rounded-tr-[1000px] rounded-br-[1000px] rounded-bl-[1000px] overflow-hidden absolute top-[180px] bottom-2 left-[150px] sm:left-[250px] z-20 bg-gray-200 border-[6px] border-[var(--text-color-light)] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
                <img
                  src="/hero-banner.jpg"
                  alt="Ethnicities United"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img2:scale-110 group-hover/img2:brightness-105"
                />
                {/* Light white shine overlay on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover/img2:bg-white/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* 3. YELLOW OVERLAY CARD (Overlapping both images) */}
              <div className="absolute bottom-8 left-[120px] sm:left-[170px] z-30 rounded-2xl bg-[var(--accent-gold)] p-3.5 sm:p-4 text-[var(--text-color)] shadow-xl text-center w-36 sm:w-40 border-[6px] border-[var(--text-color-light)] transition-transform duration-300 hover:scale-105">
                <span className="font-extrabold text-3xl sm:text-4xl block leading-none tracking-tight">
                  25+
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide block mt-1.5 leading-snug">
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
                to={isAboutPage ? "/contact" : "/about"}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[#e2bf44] px-6 py-3.5 text-xs sm:text-sm font-bold text-[var(--text-color)] shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>{isAboutPage ? "Contact Us" : "More About Us"}</span>
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
