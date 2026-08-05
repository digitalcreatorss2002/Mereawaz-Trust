import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FaSlidersH } from "react-icons/fa";

export default function WhatWeDoSection() {
  const [activeTab, setActiveTab] = useState("Collaboration");

  const tabsData = {
    Awareness: {
      title: "Spreading Knowledge & Outreach",
      description:
        "We conduct workshops, community drives, and social campaigns to educate citizens about health, rights, and sustainability.",
    },
    "Capacity Building": {
      title: "Skill Development & Training",
      description:
        "Equipping local leaders, youth, and women with practical vocational skills and resources to foster self-reliance.",
    },
    Collaboration: {
      title: "Empowering Communities",
      description:
        "We design and implement programs that address real community needs—ranging from education and healthcare to women & youth.",
    },
  };

  return (
    <section className="bg-[var(--button-bg-color)] text-white py-16 lg:py-20 font-sans relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ================= LEFT COLUMN: 2 OVERLAPPING IMAGES ONLY ================= */}
          <div className="lg:col-span-6">
            <div className="relative w-full max-w-[480px] h-[450px] sm:h-[500px] mx-auto lg:mx-0">
              
              {/* 1. BACK / TOP IMAGE */}
              <div className="absolute top-0 left-0 z-10 w-[200px] xs:w-[240px] sm:w-[443px] h-[250px] xs:h-[290px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#13493a]">
                <img
                  src="/about-banner.jpg"
                  alt="Community Action"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2. FRONT OVERLAPPING IMAGE */}
              <div className="absolute top-[80px] sm:top-[150px] left-[70px] xs:left-[90px] sm:left-[250px] z-20 w-[190px] xs:w-[220px] sm:w-[332px] h-[240px] xs:h-[280px] sm:h-[428px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0F382C]">
                <img
                  src="/vision.jpg"
                  alt="Volunteer Action"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3. BOTTOM LEFT: 250+ Projects Completed Card */}
              <div className="absolute -bottom-20 left-8 z-30 bg-white text-gray-900 rounded-2xl p-3.5 shadow-xl flex items-center gap-3.5 border border-gray-100">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-[var(--text-color-light)] flex items-center justify-center text-[#0F382C] text-base font-black">
                  <FaSlidersH />
                </div>
                <div>
                  <span className="font-black text-base block text-[#0F382C] leading-none">
                    250+
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 block mt-1">
                    Projects Completed
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN: TEXT & TABS ================= */}
          <div className="lg:col-span-6 space-y-7 lg:pl-4">
            
            {/* Pill Eyebrow Badge */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/60 bg-[#144738] px-4 py-1 text-xs font-bold text-gray-200">
                <span className="h-2 w-2 rounded-full bg-[var(--text-color-light)] inline-block" />
                <span>What We Do</span>
              </span>
            </div>

            {/* Main Title */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.12] text-white tracking-tight">
              Focused Actions That <br /> Deliver Impacts
            </h2>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              Through thoughtfully planned programs and community-led action, we empower individuals, strengthen neighborhoods, and foster lasting positive change one initiative at a time.
            </p>

            {/* Interactive Pill Tabs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {Object.keys(tabsData).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[var(--text-color-light)] text-[#0F382C] shadow-md scale-105"
                        : "bg-[#144738] text-gray-200 hover:bg-[#1a5745]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tab Details Box */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--text-color-light)] flex items-center justify-center text-[#0F382C] text-base font-black mt-0.5 shadow-sm">
                  <FaSlidersH />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {tabsData[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg">
                    {tabsData[activeTab].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-emerald-800/60 my-2" />

            {/* CTA Button */}
            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-color-light)] hover:bg-[var(--text-color)] hover:text-[var(--text-color-light)] px-6 py-3.5 text-xs sm:text-sm font-black text-[#0F382C] shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Contact Us</span>
                <FiArrowUpRight className="text-base font-black" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}