import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";
import Loader from "../components/Loader.jsx";
import { api, getImageUrl } from "../api.js";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get("/blog.php?status=published")
      .then((res) => {
        setPosts(res?.data || []);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="FIELD STORIES &amp; NEWS"
        title="News &amp; Field Updates"
        subtitle="Insights, field reports, and inspirational stories from our programs across rural India."
        bgImage="/about-banner.jpg"
      />

      <section className="py-20 bg-[var(--text-color-light)]">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === "loading" && <Loader label="Loading blog posts..." />}

          {status === "done" && posts.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center text-gray-500 border border-gray-100 shadow-aasha">
              <p className="font-semibold">
                No blog stories published yet — check back soon.
              </p>
            </div>
          )}

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => {
              const imgSrc = getImageUrl(p.cover_image) || "/about-banner.jpg";
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                >
                  <div className="group relative h-full min-h-[400px] w-full rounded-3xl bg-[var(--button-bg-color)] p-8 border border-amber-200/50 shadow-aasha transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-aasha-lg hover:-translate-y-2">
                    {/* 1. FIXED IMAGE (Hover par reveal hogi) */}
                    {imgSrc && (
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <img
                          src={imgSrc}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* 2. SLIDING COLOR OVERLAY (Bottom-to-top slide effect) */}
                    <div className="absolute inset-0 z-[1] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none bg-gradient-to-t from-black/85 via-[#13382C]/80 to-[#13382C]/60" />

                    {/* 3. CONTENT LAYER */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {/* Calendar Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent-gold)] px-4 py-1.5 text-xs font-extrabold text-[#13382C] shadow-sm shrink-0">
                          <FaCalendarAlt className="text-xs" />
                          <span>
                            {new Date(
                              p.published_at || p.created_at,
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Title & Excerpt */}
                        <h3 className="font-display text-xl sm:text-2xl font-black text-[var(--text-color-light)] group-hover:text-white transition-colors duration-300 mb-3 line-clamp-2 drop-shadow-xs">
                          {p.title}
                        </h3>
                        <p className="text-sm text-[var(--text-color-light)] group-hover:text-gray-100 transition-colors duration-300 leading-relaxed line-clamp-6 drop-shadow-xs">
                          {p.excerpt}
                        </p>
                      </div>

                      {/* Bottom Link */}
                      <div>
                        <div className="w-full h-px bg-amber-900/10 group-hover:bg-white/30 transition-colors duration-300 my-5" />
                        <Link
                          to={`/blog/${p.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--text-color-light)] group-hover:text-[#F7D046] transition-colors duration-300"
                        >
                          <span>Read Full Story</span>
                          <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
