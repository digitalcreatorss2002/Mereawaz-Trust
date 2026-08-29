import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaUser, FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { api, extractData } from "../api.js";
import SubmissionAlert from "./SubmissionAlert.jsx";

const SKILL_OPTIONS = [
  "General Volunteer",
  "Education & Teaching",
  "Healthcare & Medical Assistance",
  "IT, Web & Technology",
  "Social Media & Content Creation",
  "Event Management & Field Operations",
  "Fundraising & Community Outreach",
  "Other",
];

export default function VolunteerBanner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    skills: "General Volunteer",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const [procurements, setProcurements] = useState([]);
  const [procurementLoaded, setProcurementLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.get("/procurement.php?status=all")
      .then((res) => {
        const list = extractData(res);
        const activeList = list.filter((item) => !item.status || String(item.status).toLowerCase() === 'active');
        setProcurements(activeList.length > 0 ? activeList : list);
        setProcurementLoaded(true);
      })
      .catch(() => {
        setProcurementLoaded(true);
      });
  }, []);

  // Continuous auto-scroll ticker for procurement notices
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

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await api.post("/volunteer.php", form);
      setStatus("sent");
      setShowAlert(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        skills: "General Volunteer",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to submit application. Please try again.");
    }
  };

  const handleProcurementClick = (e, linkUrl) => {
    if (!linkUrl) {
      const formEl = document.getElementById("volunteer-form");
      if (formEl) {
        e.preventDefault();
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    if (linkUrl && linkUrl.includes("#volunteer-form")) {
      const formEl = document.getElementById("volunteer-form");
      if (formEl) {
        e.preventDefault();
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    if (linkUrl) {
      window.location.href = linkUrl;
    }
  };

  return (
    <section id="volunteer-form" className="bg-[#F8FAF9] py-12 lg:py-16 overflow-hidden font-sans scroll-mt-20">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 items-stretch min-h-[600px] gap-8">
          
          {/* ================= LEFT COLUMN: OPEN PROCUREMENT (EOI/RFQ) ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#0d1612] text-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-emerald-900/40 animate-fade-right">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/40 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)] text-lg shadow-sm">
                    🌱
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-gold)]">
                      OFFICIAL NOTICE BOARD
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      Open Procurement (EOI/RFQ)
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-800/50">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Updates
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                Active Expressions of Interest (EOI), Requests for Proposals (RFP), and Quotations (RFQ) for Meri Awaz Trust field programs.
              </p>

              {/* Procurement Notices List Container */}
              <div className="bg-[#070e0a] border border-emerald-950/90 rounded-2xl p-3 sm:p-4 min-h-[320px] max-h-[400px] flex flex-col justify-center overflow-hidden">
                {!procurementLoaded ? (
                  <div className="py-12 text-center text-xs text-gray-400 font-mono animate-pulse">
                    Loading procurement notices...
                  </div>
                ) : procurements.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-sm font-serif italic text-gray-400">
                      No active procurement notices available at the moment.
                    </p>
                    <p className="text-xs text-gray-500">
                      Check back later or register as a volunteer below to stay updated.
                    </p>
                  </div>
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
                        href={item.link || "#volunteer-form"}
                        onClick={(e) => handleProcurementClick(e, item.link)}
                        className="block p-4 rounded-xl bg-white/[0.04] hover:bg-emerald-900/40 border border-white/10 hover:border-emerald-500/50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-[var(--accent-gold)] text-[#13382C] px-2.5 py-0.5 rounded-full shadow-xs">
                            {item.notice_type || "EOI/RFQ"}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Active"}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-100 group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-1.5 line-clamp-3 font-normal leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-extrabold text-[var(--accent-gold)] group-hover:underline">
                          <span>Apply / Contact via Volunteer Form</span>
                          <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-emerald-900/50 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
              <span>Have a procurement inquiry?</span>
              <a
                href="#volunteer-form"
                onClick={(e) => handleProcurementClick(e, "#volunteer-form")}
                className="text-[var(--accent-gold)] font-extrabold hover:underline flex items-center gap-1"
              >
                <span>Submit Application Below &rarr;</span>
              </a>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: VOLUNTEER FORM ================= */}
          <div className="lg:col-span-6 w-full flex items-center justify-center animate-fade-left">
            <div className="w-full h-full bg-[var(--button-bg-color)] rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100/80 text-white flex flex-col justify-center">
              
              <div className="text-center mb-6">
                <span className="inline-block rounded-full bg-[var(--accent-gold)] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#13382C] mb-2">
                  BECOME A VOLUNTEER
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Apply to Join As A Volunteer
                </h3>
                <div className="w-12 h-1 bg-[var(--accent-gold)] my-2 rounded-full mx-auto" />
                <p className="text-xs text-gray-200 leading-relaxed max-w-sm mx-auto">
                  Fill in your details below to register as a volunteer with Meri Awaz Trust.
                </p>
              </div>

              {status === "sent" ? (
                <div className="rounded-2xl bg-white/10 p-6 border border-white/20 text-center space-y-4 backdrop-blur-sm">
                  <FaCheckCircle className="text-4xl text-[var(--accent-gold)] mx-auto animate-bounce" />
                  <h4 className="font-bold text-lg text-white">Application Submitted! 🎉</h4>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    Thank you for stepping forward! Our team will review your application and contact you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-[#13382C] text-xs font-black hover:opacity-90 transition-all"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-200 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder="e.g. Enter your full name"
                        className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-300 focus:outline-none focus:border-[var(--accent-gold)] focus:bg-white/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-200 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={update("email")}
                          placeholder="Enter your email address"
                          className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-300 focus:outline-none focus:border-[var(--accent-gold)] focus:bg-white/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-200 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <FaPhoneAlt className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="Enter your phone number"
                          className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-300 focus:outline-none focus:border-[var(--accent-gold)] focus:bg-white/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skill Dropdown */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-200 mb-1">
                      Primary Area of Expertise / Interest
                    </label>
                    <select
                      value={form.skills}
                      onChange={update("skills")}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-gold)] focus:bg-[#13382C] transition-all"
                    >
                      {SKILL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#13382C] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Motivation / Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-200 mb-1">
                      Message / How you wish to contribute *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us briefly about your interest or availability..."
                      className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-xs text-white placeholder-gray-300 focus:outline-none focus:border-[var(--accent-gold)] focus:bg-white/20 transition-all"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs font-bold text-red-300 bg-red-950/60 p-2.5 rounded-lg border border-red-500/50">
                      {error}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 px-6 rounded-xl bg-[var(--accent-gold)] hover:bg-yellow-400 text-[#13382C] font-black text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane className="text-xs" />
                    <span>{status === "sending" ? "Submitting Application..." : "Submit Volunteer Application"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {showAlert && (
        <SubmissionAlert
          message="Volunteer application submitted successfully! Our team will contact you soon."
          onClose={() => setShowAlert(false)}
        />
      )}
    </section>
  );
}