import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPhoneAlt, FaBullseye, FaUsers, FaSeedling } from "react-icons/fa";

export default function WhyChooseUs() {
  const points = [
    {
      icon: FaBullseye,
      text: "We operate with complete openness, clearly communicating",
    },
    {
      icon: FaUsers,
      text: "Ensuring every program is guided by empathy, dignity, & community",
    },
    {
      icon: FaSeedling,
      text: "Our initiative focus on long-term solution that empower community",
    },
  ];

  return (
    <section className="py-16 sm:py-15 bg-[var(--text-color-light)] overflow-hidden relative">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-sm font-extrabold tracking-wider text-[var(--text-color-light)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse"></span>
                <span>Why Choose Us</span>
              </div>

              <h2 className="font-display text-3xl font-black sm:text-4xl lg:text-5xl text-gray-900 leading-[1.15]">
                What Makes Our Impact Strong
              </h2>

              <p className="text-base text-gray-600 leading-relaxed max-w-xl">
                We approach every initiative with compassion, operate with full transparency, and focus on creating sustainable impact that improves lives across rural India.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {points.map((pt, idx) => {
                const IconComp = pt.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-2xl bg-[#FAF8F4] p-4 border border-gray-100 transition-transform duration-300 hover:translate-x-1"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-gold)] text-gray-900 shadow-sm text-lg">
                      <IconComp />
                    </div>
                    <span className="text-sm font-bold text-gray-800 leading-snug">
                      {pt.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-2xl bg-[#1B2316] hover:bg-[var(--button-bg-color)] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Learn More</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Right Column Images Composition (5th Image Design) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Tall Image */}
              <div className="overflow-hidden rounded-3xl shadow-aasha-lg border-4 border-white bg-[var(--primary-color)] sm:w-[540px] h-[400px] sm:h-[550px]">
                <img
                  src="/vision.jpg"
                  alt="What Makes Our Impact Strong"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Overlapping Bottom-Left Image */}
              <div className="absolute -bottom-20 -left-6 z-10 hidden sm:block w-52 sm:w-64 h-56 sm:h-60 overflow-hidden rounded-2xl border-4 border-white shadow-aasha-lg bg-gray-100">
                <img
                  src="/hero-banner.jpg"
                  alt="Rural Community Action"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Floating Top-Right Call Us Card */}
              <div className="absolute top-20 right-0 z-20 rounded-2xl bg-white/95 hover:bg-[var(--button-bg-color)] text-[var(--text-color)] hover:text-[var(--text-color-light)] backdrop-blur p-4 shadow-aasha-lg border border-gray-100 flex items-center gap-3.5 animate-float">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-gold)] hover:bg-[var(--text-color-light)] text-gray-900 shadow-sm text-lg">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className="text-[12px] font-extrabold uppercase tracking-wider transition-colors block">
                    Call Us
                  </span>
                  <a
                    href="tel:+919709544166"
                    className="text-[14px] font-black hover:text-[var(--accent-gold)] transition-colors"
                  >
                    +91 97095 44166
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
