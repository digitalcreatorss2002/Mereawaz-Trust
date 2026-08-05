import React from "react";
import { Link } from "react-router-dom";
import { FaFemale, FaHeartbeat, FaGraduationCap, FaLeaf } from "react-icons/fa";

export default function UrgentCauseBanner() {
  const causes = [
    {
      icon: FaFemale,
      iconBg: "bg-[var(--button-bg-color)] text-[var(--text-color-light)]",
      title: "Women Empowerment",
      description: "Gender equality and independence by supporting women leadership",
    },
    {
      icon: FaHeartbeat,
      iconBg: "bg-[var(--button-bg-color)] text-[var(--text-color-light)]",
      title: "Healthcare & Wellbeing",
      description: "Improving community health through medical outreach, wellness.",
    },
    {
      icon: FaGraduationCap,
      iconBg: "bg-[var(--button-bg-color)] text-[var(--text-color-light)]",
      title: "Education for All",
      description: "Providing access to quality education for children & adults in underserved.",
    },
    {
      icon: FaLeaf,
      iconBg: "bg-[var(--button-bg-color)] text-[var(--text-color-light)]",
      title: "Environmental Protection",
      description: "Supporting environmental sustainability through tree plantations.",
    },
  ];

  return (
    <section className="bg-white py-0 overflow-hidden font-sans">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 items-stretch min-h-[600px] sm:min-h-[680px]">
          
          {/* ================= LEFT COLUMN: NO PADDING, NO MARGIN EDGE-TO-EDGE IMAGE ================= */}
          <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[500px] lg:h-full min-h-full">
            <img
              src="/about-banner.jpg"
              alt="Building a Just and Sustainable Future"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* ================= RIGHT COLUMN: CONTENT & 2x2 CARDS ================= */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-center space-y-6">
            
            {/* Pill Eyebrow Badge */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[var(--button-bg-color)] px-3.5 py-1 text-xs font-bold text-[var(--text-color-light)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
                <span>Our Causes</span>
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#13382C] leading-[1.15] tracking-tight">
              Building a Just and <br /> Sustainable Future
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-color)] leading-relaxed max-w-xl">
              By addressing interconnected social &amp; environmental issues, we strive to create inclusive communities and lasting positive change worldwide.
            </p>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              {causes.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#FAF8F4] p-6 border border-gray-100 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Icon Container */}
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center text-lg ${item.iconBg}`}>
                      <IconComp />
                    </div>

                    {/* Title & Paragraph */}
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold text-[#13382C]">
                        {item.title}
                      </h3>
                      <div className="w-full h-px bg-gray-200 my-2" />
                      <p className="text-xs sm:text-sm text-[var(--text-color)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}