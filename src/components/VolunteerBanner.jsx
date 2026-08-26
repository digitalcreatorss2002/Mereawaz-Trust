import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaUser, FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { api } from "../api.js";
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

  return (
    <section id="volunteer-form" className="bg-white py-12 lg:py-16 overflow-hidden font-sans scroll-mt-20">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 items-center min-h-[620px] gap-8">
          
          {/* ================= LEFT COLUMN: CONTENT & BULLET POINTS ================= */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-6 animate-fade-right">
            
            {/* Pill Eyebrow Badge */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1 text-xs font-bold text-[var(--text-color-light)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-ping" />
                <span>Join As A Volunteer</span>
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-color)] leading-[1.15] tracking-tight">
              Become A Volunteer
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Join us in creating positive change. By volunteering, you can contribute your skills and time meaningfully to initiatives, support communities directly, and be part of a compassionate network committed to building a fairer, stronger, and more inclusive society.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Be part of something bigger. As a volunteer, you’ll work alongside passionate individuals to support communities, address real needs, and inspire change.
            </p>

            <div className="w-full h-px bg-gray-100 my-2" />

            {/* Key Bullet Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[var(--button-bg-color)] text-base shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-gray-700 leading-snug">
                  Contribute your time and skills to programs that directly support.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[var(--button-bg-color)] text-base shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-gray-700 leading-snug">
                  Join a network of like-minded volunteers who believe in compassion.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[var(--button-bg-color)] text-base shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-gray-700 leading-snug">
                  Gain hands-on experience, build leadership skills, and work alongside.
                </span>
              </div>
            </div>

            {/* CTA Action Button */}
            <div className="pt-4">
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] px-7 py-3.5 text-xs sm:text-sm font-black text-[var(--text-color-light)] shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Full Volunteer Page</span>
                <FiArrowUpRight className="text-base" />
              </Link>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: VOLUNTEER FORM ================= */}
          <div className="lg:col-span-6 w-full flex items-center justify-center animate-fade-left">
            <div className="w-full bg-[var(--button-bg-color)] rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100/80 text-white">
              
              <div className="text-center mb-6">
                <span className="inline-block rounded-full bg-[var(--accent-gold)] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#13382C] mb-2">
                  VOLUNTEER REGISTRATION
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
                        placeholder="e.g. Ramesh Kumar"
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
                          placeholder="ramesh@example.com"
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
                          placeholder="+91 98765 43210"
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