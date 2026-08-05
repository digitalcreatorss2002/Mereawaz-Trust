import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Helper Sub-component for Safe Counting Animation Effect
function AnimatedStat({ value = "0", label = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const numericVal = parseInt(String(value).replace(/,/g, "").replace(/\+/g, ""), 10) || 0;
  const isPlus = String(value).includes("+");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1500;
    const steps = 40;
    const increment = numericVal / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericVal) {
        setCount(numericVal);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, numericVal]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="font-display text-4xl sm:text-5xl font-black text-[var(--text-color-light)] tracking-tight">
        {count.toLocaleString()}
        {isPlus && "+"}
      </div>
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-color-light)]">
        {label}
      </p>
    </div>
  );
}

const statsData = [
  { value: "100+", label: "Programs Delivered" },
  { value: "15,000+", label: "Lives Touched" },
  { value: "40+", label: "Villages Reached" },
  { value: "10+", label: "Years of Service" },
];

export default function AboutStats() {
  return (
    <section className="bg-slate-50/50 py-10 sm:py-16 font-sans">
      {/* Container with increased horizontal padding on left & right */}
      <div className="container-page mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        <div className="grid gap-6 md:grid-cols-12 lg:gap-8 items-stretch">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col gap-6 md:col-span-3 justify-between">
            
            {/* Stat 1 */}
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-[var(--button-bg-color)] p-8 text-center text-[var(--text-color-light)] shadow-md transition-transform hover:-translate-y-1 min-h-[220px]">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-90 mix-blend-multiply transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: "url('/about-banner.jpg')" }}
              />
              <div className="absolute inset-0 bg-white/10 z-0" />
              <div className="relative z-10">
                <AnimatedStat
                  value={statsData[0]?.value || "100+"}
                  label={statsData[0]?.label || "Programs Delivered"}
                />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-[var(--button-bg-color)] p-8 text-center text-[var(--text-color-light)] shadow-md transition-transform hover:-translate-y-1 min-h-[220px]">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-90 mix-blend-multiply transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: "url('/hero-banner.jpg')" }}
              />
              <div className="absolute inset-0 bg-white/10 z-0" />
              <div className="relative z-10">
                <AnimatedStat
                  value={statsData[1]?.value || "15,000+"}
                  label={statsData[1]?.label || "Lives Touched"}
                />
              </div>
            </div>

          </div>

          {/* ================= CENTER MAIN CARD ================= */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[var(--button-bg-color)] p-8 sm:p-10 text-white shadow-2xl md:col-span-6 min-h-[520px]">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-50 mix-blend-overlay"
              style={{ backgroundImage: "url('/about-banner.jpg')" }}
            />

            <div className="relative z-10 space-y-4">
              <h2 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
                Empowering Rural India Through Innovation &amp; Livelihoods
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-gray-200 font-normal">
                Founded with the vision that every voice deserves to be heard,{" "}
                <strong className="font-semibold text-[#F7D046]">
                  Meri Awaz Trust
                </strong>{" "}
                bridges the gap between rural communities and modern
                opportunities. We focus on technology-driven agriculture,
                clean renewable energy, digital literacy, and accessible
                healthcare across remote villages.
              </p>
            </div>

            <div className="relative z-10 my-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 text-left border border-white/10">
                <div className="mb-1 text-xl">🌱</div>
                <h4 className="font-display font-semibold text-lg text-[#F7D046]">
                  Sustainable Tech
                </h4>
                <p className="text-sm text-gray-200">
                  Precision agriculture &amp; clean solar power.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 text-left border border-white/10">
                <div className="mb-1 text-xl">🎓</div>
                <h4 className="font-display font-semibold text-lg text-[#F7D046]">
                  Digital Literacy
                </h4>
                <p className="text-sm text-gray-200">
                  Training youth &amp; students for the future.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-2 text-center sm:text-left">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--text-color-light)] px-8 py-3.5 text-base font-bold text-[var(--text-color)] shadow-lg transition-all duration-300 hover:bg-[var(--text-color)] hover:text-[var(--text-color-light)] hover:shadow-xl active:scale-95"
              >
                <span>Read Our Full Story</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="flex flex-col gap-6 md:col-span-3 justify-between">
            
            {/* Stat 3 */}
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-[var(--button-bg-color)] p-8 text-center text-[var(--text-color-light)] shadow-md transition-transform hover:-translate-y-1 min-h-[220px]">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-90 mix-blend-multiply transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: "url('/about-banner.jpg')" }}
              />
              <div className="absolute inset-0 bg-white/10 z-0" />
              <div className="relative z-10">
                <AnimatedStat
                  value={statsData[2]?.value || "40+"}
                  label={statsData[2]?.label || "Villages Reached"}
                />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-[var(--button-bg-color)] p-8 text-center text-[var(--text-color-light)] shadow-md transition-transform hover:-translate-y-1 min-h-[220px]">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-90 mix-blend-multiply transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: "url('/hero-banner.jpg')" }}
              />
              <div className="absolute inset-0 bg-white/10 z-0" />
              <div className="relative z-10">
                <AnimatedStat
                  value={statsData[3]?.value || "10+"}
                  label={statsData[3]?.label || "Years of Service"}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}