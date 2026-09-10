import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSeedling, FaSun, FaGraduationCap, FaHospital } from "react-icons/fa";
import PageHeader from "../components/PageHeader.jsx";
import AboutSection from "../components/AboutSection.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import BoardOfTrustees from "../components/BoardOfTrustees.jsx";
import FaqSection from "../components/FaqSection.jsx";
import { api, getImageUrl } from "../api.js";
import TickerBar from "../components/TickerBar.jsx";

const values = [
  {
    icon: FaSeedling,
    title: "Sustainable Agriculture",
    desc: "Empowering rural farmers with drone technology, organic practices, and water efficiency.",
  },
  {
    icon: FaSun,
    title: "Clean Solar Energy",
    desc: "Deploying solar micro-grids for off-grid households and agricultural irrigation pumps.",
  },
  {
    icon: FaHospital,
    title: "Rural Healthcare Access",
    desc: "Bringing mobile telemedicine and preventative health camps to remote villages.",
  },
  {
    icon: FaGraduationCap,
    title: "Digital Education",
    desc: "Opening doors to e-learning and modern skill labs for rural youth & students.",
  },
];

export default function About() {
  const [missionData, setMissionData] = useState(null);

  useEffect(() => {
    api
      .get("/mission.php")
      .then((res) => {
        setMissionData(res?.data || null);
      })
      .catch(() => { });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="ABOUT MERI AWAZ TRUST"
        title="Our Story, Our Mission & Impact"
        subtitle="Dedicated to holistic rural development, technology integration, and empowering every voice across India."
        bgImage="/about-banner.jpg"
      />

      {/* <TickerBar /> */}

      {/* 1. ABOUT US SECTION (2ND IMAGE DESIGN - "Contact Us ↗") */}
      <AboutSection isAboutPage={true} />

      {/* 2. WHY CHOOSE US SECTION (5TH IMAGE DESIGN) */}
      <WhyChooseUs />

      {/* 3. BOARD OF TRUSTEES SECTION */}
      <BoardOfTrustees />

      {/* 3. MISSION & VISION SECTION */}
      <section className="py-20 bg-[#FAF8F4] border-t border-b border-gray-200">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/60 bg-[var(--button-bg-color)] px-3.5 py-1 text-xs font-semibold text-[var(--text-color-light)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block" />
              <span>Pillars of Purpose</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-gray-900">
              Our Mission &amp; Future Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-aasha hover:shadow-xl transition-all duration-300"
            >
              <img
                src={
                  getImageUrl(missionData?.mission?.image_url) ||
                  "/hero-banner.jpg"
                }
                alt="Our Mission"
                className="w-full h-auto block rounded-3xl object-contain transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-aasha hover:shadow-xl transition-all duration-300"
            >
              <img
                src={
                  getImageUrl(missionData?.vision?.image_url) ||
                  "/about-banner.jpg"
                }
                alt="Our Vision"
                className="w-full h-auto block rounded-3xl object-contain transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES GRID */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/60 bg-[var(--button-bg-color)] px-3.5 py-1 text-xs font-semibold text-[var(--text-color-light)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block" />
              <span>Our Core Principles</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-gray-900">
              Our Core Principles
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={i}
                  className="group rounded-3xl bg-[var(--button-bg-color)] p-8 border border-[var(--accent-gold)] shadow-aasha text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-aasha-lg"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-gold)] text-[var(--button-bg-color)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--text-color-light)] group-hover:text-[var(--button-bg-color)]">
                    <IconComp className="text-2xl" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-color-light)] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[var(--text-color-light)] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <FaqSection />
    </>
  );
}
