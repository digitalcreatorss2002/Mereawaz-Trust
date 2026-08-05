import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import InfiniteSlider from "./InfiniteSlider.jsx";
import { getImageUrl } from "../api.js";

export default function PropertiesSection({
  programs = [],
  showHeading = true,
  isGrid = false,
  className = "py-10 sm:py-16 lg:py-20 bg-[#FAF8F4]",
}) {
  if (!programs || programs.length === 0) return null;

  // Function to strip HTML tags if admin sends rich text
  const formatText = (str) => {
    if (!str) return "";
    return str.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  };

  // Card component mapping exact backend DB fields from Admin Panel
  const renderCard = (p) => {
    // Exact mapping for Title from Backend
    const cardTitle = p.title || p.program_title || p.name || "Program Title";

    // Exact mapping for Description / Subtitle / Summary from Backend
    const rawDesc = p.summary || p.description || p.subtitle || p.short_desc || p.excerpt || "";
    const cardDesc = formatText(rawDesc) || "Integrating technology and support for community development.";

    // Image URL mapping
    const rawImg = p.image_url || p.image || p.cover_image;
    const imgSrc = getImageUrl(rawImg) || "/about-banner.jpg";
    const targetLink = `/properties/${p.slug || p.id}`;

    // Badge text: category and location
    const categoryText = p.category || "";
    const locationText = p.location || "";
    const badgeLabel = categoryText && locationText 
      ? `${categoryText} • ${locationText}`
      : categoryText || locationText || "Program";

    return (
      <div
        key={p.id || p.slug || Math.random()}
        className="group relative h-full min-h-[380px] sm:min-h-[420px] w-full rounded-3xl bg-[#13382C] p-6 sm:p-8 border border-amber-200/30 shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:-translate-y-2"
      >
        {/* 1. BACKGROUND IMAGE (Reveals on Hover) */}
        {imgSrc && (
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <img
              src={imgSrc}
              alt={cardTitle}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* 2. GRADIENT OVERLAY */}
        <div className="absolute inset-0 z-[1] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none bg-gradient-to-t from-black/90 via-[#13382C]/85 to-[#13382C]/70" />

        {/* 3. CARD CONTENT */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Category / Location Badge */}
            {badgeLabel && (
              <div className="mb-4 sm:mb-6 inline-flex max-w-full items-center gap-2 rounded-full bg-[#F7D046] px-3.5 py-1.5 text-xs font-extrabold text-[#13382C] shadow-sm shrink-0 truncate">
                <span className="truncate">{badgeLabel}</span>
              </div>
            )}

            {/* Title (Mapped directly from DB) */}
            <h3 className="font-display text-lg sm:text-2xl font-black text-[#F7D046] group-hover:text-white transition-colors duration-300 mb-2 sm:mb-3 line-clamp-2 leading-snug">
              {cardTitle}
            </h3>

            {/* Description (Mapped directly from DB) */}
            <p className="text-xs sm:text-sm text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed line-clamp-3 sm:line-clamp-4">
              {cardDesc}
            </p>
          </div>

          <div>
            <div className="w-full h-px bg-white/20 group-hover:bg-white/30 transition-colors duration-300 my-4 sm:my-5" />
            <Link
              to={targetLink}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F7D046] group-hover:text-white transition-colors duration-300"
            >
              <span>Read More</span>
              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={className}>
      <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Conditional Header */}
        {showHeading && (
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3 px-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F7D046] bg-[#13382C] px-4 py-1.5 text-xs font-extrabold tracking-wider text-white">
              <span className="h-2 w-2 rounded-full bg-[#F7D046] inline-block animate-pulse"></span>
              <span>Our Actions for Social Change</span>
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#13382C]">
              Our Programs &amp; Field Sites
            </h2>
          </div>
        )}

        {/* Grid for All Programs Page vs Slider for Home */}
        {isGrid ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((item) => renderCard(item))}
          </div>
        ) : (
          <InfiniteSlider interval={4000} visibleItems={3}>
            {programs.map((item) => renderCard(item))}
          </InfiniteSlider>
        )}

      </div>
    </section>
  );
}