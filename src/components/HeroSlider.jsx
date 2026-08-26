import { useState, useEffect, useRef } from "react";
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
  const [procurements, setProcurements] = useState([]);
  const [procurementLoaded, setProcurementLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    api.get("/hero.php")
      .then((res) => {
        const list = Array.isArray(res) ? res : (res?.data && Array.isArray(res.data) ? res.data : []);
        if (list.length > 0) {
          setSlides(list);
        }
      })
      .catch(() => {});

    api.get("/procurement.php")
      .then((res) => {
        const list = Array.isArray(res) ? res : (res?.data && Array.isArray(res.data) ? res.data : []);
        setProcurements(list);
        setProcurementLoaded(true);
      })
      .catch(() => {
        setProcurementLoaded(true);
      });
  }, []);

  // Vertical continuous auto-scrolling ticker with pause on hover
  useEffect(() => {
    if (isPaused || procurements.length <= 1) return;
    const container = scrollRef.current;
    if (!container) return;

    const timer = setInterval(() => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
        container.scrollTop = 0;
      } else {
        container.scrollTop += 1;
      }
    }, 35);

    return () => clearInterval(timer);
  }, [isPaused, procurements.length]);

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

  const handleProcurementClick = (e, linkUrl) => {
    if (!linkUrl) {
      linkUrl = "/volunteer#volunteer-form";
    }
    
    // Check if target is on current page
    if (linkUrl.includes("#volunteer-form")) {
      const formEl = document.getElementById("volunteer-form");
      if (formEl) {
        e.preventDefault();
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    
    // Default navigation
    window.location.href = linkUrl;
  };

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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: HERO TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-5 animate-fadeIn">
            {subtitle && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg-color)] px-4 py-1.5 text-xs font-bold text-white tracking-wider uppercase shadow-md">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-ping" />
                {subtitle}
              </span>
            )}

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              {title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-normal max-w-xl">
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

          {/* RIGHT COLUMN: OPEN PROCUREMENT (EOI/RFQ) CARD WIDGET */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fadeIn">
            <div className="w-full max-w-[340px] sm:max-w-[360px] bg-[#0d1612]/95 backdrop-blur-lg border border-emerald-800/40 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3.5 text-left">
              
              {/* Card Header matching Image 1 */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-700/60">
                <span className="text-lg leading-none">🌱</span>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                    Open Procurement (EOI/RFQ)
                  </h3>
                </div>
              </div>

              {/* Card Body Container matching Image 1 styling (Taller height, minimum 2 items displayed) */}
              <div className="bg-[#070e0a]/95 border border-emerald-950/90 rounded-2xl p-3 h-[320px] flex flex-col justify-center overflow-hidden">
                {!procurementLoaded ? (
                  <div className="py-8 text-center text-xs text-gray-400 font-mono animate-pulse">
                    Loading procurement notices...
                  </div>
                ) : procurements.length === 0 ? (
                  <p className="text-center text-sm font-serif italic text-gray-400 py-8">
                    No active updates available.
                  </p>
                ) : (
                  <div
                    ref={scrollRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="space-y-3 overflow-y-auto h-full pr-1 custom-scrollbar scroll-smooth"
                  >
                    {procurements.map((item) => (
                      <a
                        key={item.id}
                        href={item.link || "/volunteer#volunteer-form"}
                        onClick={(e) => handleProcurementClick(e, item.link)}
                        className="block p-3 rounded-xl bg-white/[0.04] hover:bg-emerald-900/40 border border-white/10 hover:border-emerald-500/50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-[var(--accent-gold)] text-[#13382C] px-2 py-0.5 rounded-full shadow-xs">
                            {item.notice_type || "EOI/RFQ"}
                          </span>
                          <span className="text-[9px] text-gray-400 font-mono">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Active"}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-100 group-hover:text-[var(--accent-gold)] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-extrabold text-[var(--accent-gold)] group-hover:underline">
                          <span>Apply via Volunteer Form</span>
                          <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="pt-0.5 flex items-center justify-between text-[10px] text-gray-300 font-sans">
                <span className="text-gray-400">Official Notice Board</span>
                <a
                  href="/volunteer#volunteer-form"
                  onClick={(e) => handleProcurementClick(e, "/volunteer#volunteer-form")}
                  className="text-[var(--accent-gold)] hover:underline font-extrabold flex items-center gap-1"
                >
                  <span>Volunteer Form &rarr;</span>
                </a>
              </div>

            </div>
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

