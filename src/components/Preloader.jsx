import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show preloader on route change or initial load
    setLoading(true);
    setVisible(true);

    const timer = setTimeout(() => {
      setLoading(false);
      // Allow fade-out transition to complete before hiding
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 400);
      return () => clearTimeout(hideTimer);
    }, 650);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#13382C] transition-all duration-400 ease-out ${
        loading ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Outer Pulse Glow Background */}
      <div className="absolute w-80 h-80 rounded-full bg-[var(--accent-gold)]/20 blur-3xl animate-pulse-glow" />

      {/* Main Logo Container with Dual Spinning Rings */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer Ring */}
        <div
          className="absolute w-36 h-36 rounded-full border-2 border-transparent border-t-[var(--accent-gold)] border-r-white/40 animate-spin"
          style={{ animationDuration: "1.8s" }}
        />

        {/* Inner Ring Reverse Spin */}
        <div
          className="absolute w-28 h-28 rounded-full border-2 border-transparent border-b-[var(--accent-gold)] border-l-white/40 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
        />

        {/* Center Logo Box */}
        <div className="relative z-10 w-24 h-24 rounded-2xl bg-white p-3 shadow-2xl border border-white/20 flex items-center justify-center transform transition-transform duration-500 hover:scale-105">
          <img
            src="/meriawajtrust.png"
            alt="Meri Awaz Trust Logo"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Brand Title & Subtitle */}
      <div className="text-center space-y-2 z-10">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
          Meri Awaz <span className="text-[var(--accent-gold)]">Trust</span>
        </h2>
        <p className="text-xs font-bold text-amber-200/90 uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block animate-ping" />
          <span>Charity &amp; Community Service</span>
        </p>
      </div>

      {/* Bottom Progress Line */}
      <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden z-10 border border-white/10">
        <div className="h-full bg-[var(--accent-gold)] rounded-full animate-pulse transition-all duration-500 w-full" />
      </div>
    </div>
  );
}
