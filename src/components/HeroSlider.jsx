import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { api, getImageUrl } from "../api.js";

const DEFAULT_SLIDES = [
  {
    id: 1,
    image_url: "/hero-banner.jpg",
    title: "Empowering Communities & Building Stronger Futures",
    subtitle: "MERI AWAZ TRUST",
    description: "Creating sustainable change through education, healthcare, and social development across India.",
    button_text: "Discover Our Work",
    button_link: "/about"
  }
];

export default function HeroSlider() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get("/hero.php")
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setSlides(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current] || DEFAULT_SLIDES[0];

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] bg-slate-900 overflow-hidden font-sans">
      {/* Background Slide Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url(${getImageUrl(slide.image_url) || "/hero-banner.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-page h-full flex flex-col justify-center text-white">
        <div className="max-w-2xl space-y-5 animate-fadeIn">
          {slide.subtitle && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg-color)] px-4 py-1.5 text-xs font-bold text-white tracking-wider uppercase shadow-md">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-ping" />
              {slide.subtitle}
            </span>
          )}

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-normal">
            {slide.description}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              to={slide.button_link || "/about"}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>{slide.button_text || "Discover Our Work"}</span>
              <FiArrowRight className="text-base" />
            </Link>

            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 px-7 py-3.5 text-sm font-extrabold text-white border border-white/30 transition-all duration-300 hover:scale-105"
            >
              <span>Donate Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === current ? "w-8 bg-[var(--button-bg-color)]" : "w-2.5 bg-white/50"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
