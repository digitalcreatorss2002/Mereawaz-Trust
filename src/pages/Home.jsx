import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import HeroSlider from "../components/HeroSlider.jsx";
import AboutSection from "../components/AboutSection.jsx";
import PropertiesSection from "../components/PropertiesSection.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import UrgentCauseBanner from "../components/UrgentCauseBanner.jsx";
import VolunteerBanner from "../components/VolunteerBanner.jsx";
import PartnerLogos from "../components/PartnerLogos.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import InfiniteSlider from "../components/InfiniteSlider.jsx";
import FaqSection from "../components/FaqSection.jsx";
import { api, getImageUrl, extractData } from "../api.js";
import AboutStats from "../components/AboutStats.jsx";
import TickerBar from "../components/TickerBar.jsx";

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [dbPrograms, setDbPrograms] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    api
      .get("/testimonials.php?status=approved&limit=10")
      .then((res) => setTestimonials(extractData(res)))
      .catch(() => {});
    api
      .get("/properties.php")
      .then((res) => setDbPrograms(extractData(res)))
      .catch(() => {});
    api
      .get("/blog.php?status=published")
      .then((res) => setBlogPosts(extractData(res)))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. DYNAMIC CONTENT-SLIDING HERO BANNER */}
      <HeroSlider />

      {/* 2. OVERLAPPING FEATURE CARDS */}
      <TickerBar />

      {/* 2. OVERLAPPING FEATURE CARDS */}
      {/* <FeatureCards /> */}

      {/* 3. ABOUT US SECTION (EXACT 2ND IMAGE DESIGN - "More About Us ↗") */}
      <AboutSection isAboutPage={false} />

      {/* 4. PROPERTIES / ACTIONS FOR SOCIAL CHANGE SECTION (3RD & 4TH IMAGE DESIGN) */}
      <PropertiesSection programs={dbPrograms} />

      {/* 5. WHY CHOOSE US SECTION (5TH IMAGE DESIGN) */}
      <WhyChooseUs />

      {/* 6. ABOUT STATS SECTION (6TH IMAGE DESIGN) */}
      <AboutStats />

      {/* 6. URGENT CAUSE BANNER */}
      <UrgentCauseBanner />

      {/* 7. IMPACT COUNTER STATS */}
      {/* <StatsCounter /> */}

      {/* 8. UPCOMING CHARITY EVENTS & CAMPS */}
      {/* <EventsSection /> */}

      {/* What We Do Section */}
      {/* <WhatWeDoSection/> */}

      {/* 9. VOLUNTEER & JOIN US BANNER */}
      <VolunteerBanner />

      {/* 10. LATEST BLOG STORIES INFINITE SLIDER */}
      {blogPosts.length > 0 && (
        <section className="py-10 bg-[var(--text-color-light)]">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-xs font-extrabold tracking-wider text-[var(--text-color-light)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse"></span>
                <span>FIELD INSIGHTS &amp; NEWS</span>
              </span>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-[#13382C]">
                Latest Stories From The Field
              </h2>
            </div>

            <InfiniteSlider interval={4000} visibleItems={3}>
              {blogPosts.map((b) => {
                const imgSrc =
                  getImageUrl(b.cover_image) || "/about-banner.jpg";
                return (
                  <div
                    key={b.id}
                    className="group relative h-full min-h-[400px] w-full rounded-3xl bg-[var(--button-bg-color)] p-8 border border-amber-200/50 shadow-aasha transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-aasha-lg hover:-translate-y-2"
                  >
                    {/* 
                =======================================================
                1. FIXED IMAGE (Sirf hover par dikhegi, KOI animation nahi)
                =======================================================
              */}
                    {imgSrc && (
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <img
                          src={imgSrc}
                          alt={b.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* 
                =======================================================
                2. SLIDING COLOR OVERLAY (Sirf COLOR bottom-to-top slide hoga)
                =======================================================
              */}
                    <div className="absolute inset-0 z-[1] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none bg-gradient-to-t from-black/85 via-[#13382C]/80 to-[#13382C]/60" />

                    {/* Blog Card Content Layer */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {/* Top Yellow Calendar Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent-gold)] px-4 py-1.5 text-xs font-extrabold text-[#13382C] shadow-sm shrink-0">
                          <FaCalendarAlt className="text-xs" />
                          <span>
                            {new Date(
                              b.published_at || b.created_at,
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Title & Excerpt */}
                        <h3 className="font-display text-xl sm:text-2xl font-black text-[var(--text-color-light)] group-hover:text-white transition-colors duration-300 mb-3 line-clamp-2 drop-shadow-xs">
                          {b.title}
                        </h3>
                        <p className="text-sm text-[var(--text-color-light)] group-hover:text-gray-100 transition-colors duration-300 leading-relaxed line-clamp-5 drop-shadow-xs">
                          {b.excerpt}
                        </p>
                      </div>

                      {/* Card Bottom Link */}
                      <div>
                        <div className="w-full h-px bg-amber-900/10 group-hover:bg-white/30 transition-colors duration-300 my-5" />
                        <Link
                          to={`/blog/${b.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--text-color-light)] group-hover:text-[#F7D046] transition-colors duration-300"
                        >
                          <span>Read Story</span>
                          <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteSlider>
          </div>
        </section>
      )}

      {/* 11. TESTIMONIALS CAROUSEL */}
      {testimonials.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-xs font-extrabold tracking-wider text-[var(--text-color-light)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse"></span>
                <span>Our Testimonials</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-gray-900">
                Stories Of Hope &amp; Transformation
              </h2>
            </div>
            <InfiniteSlider interval={4500}>
              {testimonials.map((t) => (
                <div key={t.id} className="h-full">
                  <TestimonialCard
                    name={t.name}
                    location={t.location}
                    message={t.message}
                    rating={t.rating}
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </section>
      )}

      {/* 12. PARTNER & SPONSOR LOGOS CAROUSEL */}
      <PartnerLogos />

      {/* 13. FAQ ACCORDION SECTION */}
      {/* <FaqSection /> */}
    </div>
  );
}
