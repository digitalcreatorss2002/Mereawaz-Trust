import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaTimes, FaUserTie, FaPhoneAlt, FaEnvelope, FaQuoteLeft } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { api } from "../api.js";

// Fallback sample data in case DB is initially empty
const sampleTrustees = [
  {
    id: 1,
    name: "Banaja Mishra",
    role: "CEO & Founder Trustee",
    phone: "+91 88009 02890",
    email: "ceo@meriawaz.org",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    bio: "Visionary leader driving rural development and empowerment programs.",
    message: "At Meri Awaz Trust, our vision is to transform rural India through education, clean technology, and women-led entrepreneurship. Every life touched is a foundation for lasting change.",
  },
  {
    id: 2,
    name: "Sishir Kumar",
    role: "Trustee",
    phone: "",
    email: "",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    bio: "Specializing in community healthcare and women self-help initiatives.",
    message: "Ensuring health equity and grassroots dignity across every remote village we serve.",
  },
  {
    id: 3,
    name: "Jakir Hussain",
    role: "Trustee",
    phone: "",
    email: "",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "Focusing on agricultural technology, drone farming, and solar micro-grids.",
    message: "Empowering farmers with modern agro-technologies and clean energy for sustainable futures.",
  },
  {
    id: 4,
    name: "Alok Pattnaik",
    role: "Trustee",
    phone: "",
    email: "",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    bio: "Advocating digital literacy and educational infrastructure for rural youth.",
    message: "Education and digital literacy are the ultimate equalizers for rural youth across our nation.",
  }
];

export default function BoardOfTrustees() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    api
      .get("/board_members.php")
      .then((res) => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setMembers(res.data);
        } else {
          setMembers(sampleTrustees);
        }
      })
      .catch(() => {
        setMembers(sampleTrustees);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const displayList = members.length > 0 ? members : sampleTrustees;

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white via-[#FAF8F4] to-white border-t border-b border-gray-100 overflow-hidden relative">
        <div className="container-page relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-xs sm:text-sm font-extrabold tracking-wider text-[var(--text-color-light)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse" />
              <span>LEADERSHIP & GOVERNANCE</span>
            </div>

            <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-gray-900 tracking-tight">
              Board of Members
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our visionary board members guiding Meri Awaz Trust towards transparent, impactful, and sustainable rural transformation across India.
            </p>
          </div>

          {/* Member Cards Grid Preview */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {displayList.slice(0, 4).map((m, index) => (
              <motion.div
                key={m.id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedMember(m)}
                className="group rounded-3xl bg-white border border-gray-100 shadow-aasha overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-aasha-lg hover:border-[var(--accent-gold)]/60 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-gray-100">
                  <img
                    src={m.image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
                    alt={m.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View Message &rarr;
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-6 text-center flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-[var(--button-bg-color)] transition-colors duration-300">
                      {m.name}
                    </h3>
                    <span className="inline-block rounded-full bg-[#FAF8F4] border border-[var(--accent-gold)]/50 px-3.5 py-1 text-xs font-bold text-[var(--button-bg-color)] mt-2">
                      {m.role}
                    </span>
                  </div>

                  {m.bio && (
                    <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                      {m.bio}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Members Modal Trigger Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowAllModal(true)}
              className="inline-flex items-center gap-3 rounded-2xl bg-[var(--button-bg-color)] hover:bg-[#1a3831] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaUserTie className="text-[var(--accent-gold)] text-lg" />
              <span>View All Board of Members ({displayList.length} Members)</span>
              <FiArrowUpRight className="text-lg font-bold" />
            </button>
          </div>

        </div>
      </section>

      {/* ================= INDIVIDUAL MEMBER DETAIL & MESSAGE MODAL ================= */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Top Bar with Close Button */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-slate-50/80 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--button-bg-color)]">
                    Board Member Profile
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors shadow-xs cursor-pointer"
                  aria-label="Close"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                <div className="grid sm:grid-cols-12 gap-6 sm:gap-8 items-start">
                  
                  {/* Left Column: Photo & Contact Info */}
                  <div className="sm:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-start space-y-4">
                    <div className="w-44 sm:w-full max-w-[220px] aspect-square rounded-3xl overflow-hidden shadow-md border-4 border-white bg-slate-100 ring-2 ring-[var(--accent-gold)]/40">
                      <img
                        src={selectedMember.image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="w-full">
                      <h3 className="font-display text-2xl font-extrabold text-gray-900 leading-tight">
                        {selectedMember.name}
                      </h3>
                      <span className="inline-block rounded-full bg-[var(--button-bg-color)] text-[var(--accent-gold)] px-3.5 py-1 text-xs font-black tracking-wide mt-2 shadow-xs">
                        {selectedMember.role}
                      </span>
                      {selectedMember.bio && (
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          {selectedMember.bio}
                        </p>
                      )}
                    </div>

                    {/* Contact Badges */}
                    <div className="w-full space-y-2 pt-2 border-t border-gray-100 text-xs">
                      {selectedMember.phone && (
                        <a
                          href={`tel:${selectedMember.phone}`}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 transition-all font-semibold"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                            <FaPhoneAlt className="text-xs" />
                          </span>
                          <span className="truncate">{selectedMember.phone}</span>
                        </a>
                      )}

                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-slate-700 hover:text-blue-800 transition-all font-semibold"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 shrink-0">
                            <FaEnvelope className="text-xs" />
                          </span>
                          <span className="truncate">{selectedMember.email}</span>
                        </a>
                      )}

                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-[11px] text-amber-900 leading-snug">
                        <strong className="block mb-0.5">Meri Awaz Trust</strong>
                        Empowering rural communities through integrity, transparency, and innovation.
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Big Leader's Message */}
                  <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
                    <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-xs relative overflow-hidden">
                      <FaQuoteLeft className="text-3xl sm:text-4xl text-[var(--accent-gold)]/40 mb-3" />
                      
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--button-bg-color)] block mb-1">
                        {selectedMember.role && selectedMember.role.toLowerCase().includes("ceo")
                          ? "CEO's Message"
                          : selectedMember.role && selectedMember.role.toLowerCase().includes("trustee")
                          ? "Trustee's Message"
                          : `${selectedMember.role}'s Message`}
                      </span>

                      <h4 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 mb-3 leading-snug">
                        Commitment to Rural Empowerment &amp; Lasting Change
                      </h4>

                      <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 font-normal">
                        {selectedMember.message ? (
                          selectedMember.message.split("\n").map((para, i) =>
                            para.trim() ? <p key={i}>{para}</p> : null
                          )
                        ) : selectedMember.bio ? (
                          <p>{selectedMember.bio}</p>
                        ) : (
                          <p>
                            "At Meri Awaz Trust, we believe that true transformation happens when communities are empowered with technology, sustainable livelihoods, and quality healthcare. Every initiative we undertake is rooted in dignity, transparency, and grassroots engagement."
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200/70 flex items-center justify-between">
                        <div>
                          <strong className="font-display text-sm font-bold text-gray-900 block">
                            {selectedMember.name}
                          </strong>
                          <span className="text-[11px] text-gray-500">
                            {selectedMember.role}, Meri Awaz Trust
                          </span>
                        </div>
                        <span className="text-2xl font-serif text-[var(--accent-gold)] font-bold">MAT</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-white flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="rounded-xl bg-[var(--button-bg-color)] hover:bg-[#1a3831] px-6 py-2.5 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= BOARD OF TRUSTEES FULL MODAL (ALL MEMBERS) ================= */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 bg-white border-b border-gray-100 p-6 sm:p-8 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--button-bg-color)] block mb-1">
                    BOARD & ADVISORY TEAM
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
                    Board of Members
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Click on any member card to view their profile, contact, and personal message.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllModal(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black transition-colors cursor-pointer"
                  aria-label="Close Modal"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#FAF8F4]">
                <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {displayList.map((m, index) => (
                    <div
                      key={m.id || index}
                      onClick={() => setSelectedMember(m)}
                      className="group rounded-2xl bg-white border border-gray-200/80 shadow-xs overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--accent-gold)] cursor-pointer"
                    >
                      {/* Image */}
                      <div className="w-full h-60 sm:h-64 overflow-hidden bg-gray-100 relative">
                        <img
                          src={m.image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
                          alt={m.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          View Message &rarr;
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 text-center flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-extrabold text-lg text-gray-900 group-hover:text-[var(--button-bg-color)] transition-colors">
                            {m.name}
                          </h4>
                          <span className="inline-block text-xs font-bold text-[var(--button-bg-color)] bg-[#FAF8F4] border border-gray-200 px-3 py-0.5 rounded-full mt-1">
                            {m.role}
                          </span>
                        </div>

                        {m.bio && (
                          <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-snug">
                            {m.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-white border-t border-gray-100 p-4 sm:p-6 text-center text-xs text-gray-500 font-semibold flex items-center justify-between">
                <span>Showing total {displayList.length} Board Members</span>
                <button
                  type="button"
                  onClick={() => setShowAllModal(false)}
                  className="rounded-xl bg-gray-100 hover:bg-gray-200 px-5 py-2 text-xs font-bold text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
