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
        const list = Array.isArray(res) ? res : (res?.data && Array.isArray(res.data) ? res.data : []);
        if (list.length > 0) {
          setSlides(list);
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

  const title = slide?.title || slide?.caption || "Empowering Communities & Building Stronger Futures";
  const subtitle = slide?.subtitle || "MERI AWAZ TRUST";
  const description = slide?.description || "Creating sustainable change through education, healthcare, and social development across India.";
  const buttonText = slide?.button_text || "Discover Our Work";
  const buttonLink = slide?.button_link || "/about";

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:h-[720px] bg-slate-900 overflow-hidden font-sans flex items-center">
      {/* Background Slide Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url(${getImageUrl(slide.image_url) || "/hero-banner.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-page w-full py-12 sm:py-16 lg:py-0 text-white">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          {subtitle && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg-color)] px-4 py-1.5 text-xs font-bold text-white tracking-wider uppercase shadow-md">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-ping" />
              {subtitle}
            </span>
          )}

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            {title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-normal max-w-2xl">
            {description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              to={buttonLink}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>{buttonText}</span>
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
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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


