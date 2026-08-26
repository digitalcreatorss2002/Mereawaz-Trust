import { useState } from "react";
import { api } from "../api.js";
import PageHeader from "../components/PageHeader.jsx";
import SubmissionAlert from "../components/SubmissionAlert.jsx";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTools,
  FaPaperPlane,
  FaCheckCircle,
  FaHandsHelping,
  FaAward,
  FaUserFriends,
} from "react-icons/fa";

const SKILL_OPTIONS = [
  "General Volunteer",
  "Education & Teaching",
  "Healthcare & Medical Assistance",
  "IT, Web & Technology",
  "Social Media & Content Creation",
  "Event Management & Field Operations",
  "Fundraising & Community Outreach",
  "Legal & Administrative Support",
  "Other",
];

export default function Volunteer() {
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

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await api.post("/volunteer.php", form);
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
  }

  return (
    <>
      <PageHeader
        eyebrow="JOIN OUR MOVEMENT"
        title="Become A Volunteer"
        subtitle="Contribute your skills, time, and compassion to empower rural communities across India."
        bgImage="/hero-banner.jpg"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F4] overflow-hidden">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TOP BENEFITS CARDS */}
          <div className="grid gap-6 sm:grid-cols-3 mb-12 sm:mb-16">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-aasha text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)]">
                <FaHandsHelping className="text-2xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Direct Field Impact</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Work directly with rural families, schools, and health centers to bring tangible change.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-aasha text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)]">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Certificates &amp; Recognition</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Receive official volunteer certificates and letters of recommendation for your service.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-aasha text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--button-bg-color)] text-[var(--accent-gold)]">
                <FaUserFriends className="text-2xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Passionate Community</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Connect with like-minded changemakers, leaders, and mentors dedicated to social good.
              </p>
            </div>
          </div>

          {/* MAIN FORM GRID */}
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* LEFT COLUMN: ABOUT VOLUNTEERING */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-[var(--button-bg-color)] p-8 sm:p-10 text-white shadow-aasha-lg space-y-6">
                <span className="inline-block rounded-full bg-[var(--accent-gold)] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[var(--button-bg-color)]">
                  WHY VOLUNTEER WITH US?
                </span>
                
                <h2 className="font-display text-2xl sm:text-3xl font-black leading-tight text-white">
                  Empower Others, Enrich Yourself
                </h2>

                <p className="text-sm text-gray-200 leading-relaxed">
                  Every hour you give helps educate a child, support a mother, or provide essential skills to youth. We offer flexible remote and field volunteer roles suited to your schedule.
                </p>

                <div className="space-y-4 pt-2 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[var(--accent-gold)] text-base shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm text-gray-100">
                      Flexible hours — Remote &amp; On-field options available.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[var(--accent-gold)] text-base shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm text-gray-100">
                      Skill-matching: We pair your talents with project needs.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-[var(--accent-gold)] text-base shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm text-gray-100">
                      Leadership training and mentorship from NGO experts.
                    </span>
                  </div>
                </div>

                <div className="pt-4 rounded-2xl bg-white/10 p-5 border border-white/10 backdrop-blur-sm">
                  <h4 className="font-bold text-sm text-[var(--accent-gold)] mb-1">Have Questions?</h4>
                  <p className="text-xs text-gray-200 mb-3">Call or WhatsApp our volunteer coordinator team directly.</p>
                  <a
                    href="https://wa.me/919266749755"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-white underline hover:text-[var(--accent-gold)]"
                  >
                    +91 92667 49755 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VOLUNTEER REGISTRATION FORM */}
            <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-10 border border-gray-100 shadow-aasha-lg">
              <span className="inline-block rounded-full bg-[var(--secondary-light)] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--button-bg-color)] mb-3">
                VOLUNTEER REGISTRATION
              </span>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-gray-900 mb-2">
                Apply to Join As A Volunteer
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-8">
                Please complete the form below. Our coordinator team will review your application and contact you within 48 hours.
              </p>

              {status === "sent" ? (
                <div className="rounded-2xl bg-green-50 p-8 border border-green-200 text-center space-y-3">
                  <FaCheckCircle className="text-4xl text-green-600 mx-auto" />
                  <h4 className="font-bold text-xl text-green-900">Application Submitted Successfully! 🎉</h4>
                  <p className="text-sm text-green-800 leading-relaxed max-w-md mx-auto">
                    Thank you for stepping forward to make a difference. Our volunteer management team will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                      <input
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder="e.g. Enter your full name"
                        className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={update("email")}
                          placeholder="Enter your email address"
                          className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <FaPhoneAlt className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                        <input
                          required
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="Enter your phone number"
                          className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address & Primary Skill */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        City / Address
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                        <input
                          value={form.address}
                          onChange={update("address")}
                          placeholder="e.g. Dwarka, Delhi"
                          className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Primary Area of Expertise / Skill
                      </label>
                      <div className="relative">
                        <FaTools className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                        <select
                          value={form.skills}
                          onChange={update("skills")}
                          className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none bg-white"
                        >
                          {SKILL_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Motivation / Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Why do you want to volunteer with Meri Awaz Trust? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Share your interest, background, availability, or ideas..."
                      className="w-full rounded-2xl border border-gray-200 p-4 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs font-bold text-red-600">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--button-bg-color)] py-4 text-base font-bold text-white shadow-aasha transition-all hover:bg-[var(--button-hover-color)] hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                  >
                    <FaPaperPlane className="text-sm" />
                    <span>{status === "sending" ? "Submitting Application..." : "Submit Volunteer Application"}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {showAlert && (
        <SubmissionAlert
          message="Volunteer application submitted successfully! Our team will contact you soon."
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
