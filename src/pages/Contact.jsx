import { useState } from "react";
import { api } from "../api.js";
import PageHeader from "../components/PageHeader.jsx";
import TestimonialForm from "../components/TestimonialForm.jsx";
import SubmissionAlert from "../components/SubmissionAlert.jsx";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact.php", form);
      setStatus("sent");
      setShowAlert(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="GET IN TOUCH"
        title="Contact Meri Awaz Trust"
        subtitle="Have questions, partnership inquiries, or want to volunteer? Reach out to our team in Delhi."
        bgImage="/hero-banner.jpg"
      />

      {/* TOP 3 CONTACT INFO CARDS (AASHA STYLE) */}
      <section className="py-16 bg-[#FAF8F4]">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-3 mb-16">
            {/* Phone Card */}
            <div className="rounded-3xl bg-white p-8 border border-gray-100 shadow-aasha text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-color)] text-[var(--button-bg-color)]">
                <FaPhoneAlt className="text-xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Call Us Direct</h3>
              <p className="text-xs text-gray-500 mb-3">Mon - Sat: 9:00 AM - 6:00 PM</p>
              <a href="tel:+919266749755" className="font-bold text-sm text-[var(--button-bg-color)] hover:underline block">
                +91 92667 49755
              </a>
            </div>

            {/* Email Card */}
            <div className="rounded-3xl bg-white p-8 border border-gray-100 shadow-aasha text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-color)] text-[var(--button-bg-color)]">
                <FaEnvelope className="text-xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Email Inquiry</h3>
              <p className="text-xs text-gray-500 mb-3">For general &amp; donor queries</p>
              <a href="mailto:info@meriawaztrust.org" className="font-bold text-sm text-[var(--button-bg-color)] hover:underline block">
                info@meriawaztrust.org
              </a>
            </div>

            {/* Location Card */}
            <div className="rounded-3xl bg-white p-8 border border-gray-100 shadow-aasha text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aasha-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-color)] text-[var(--button-bg-color)]">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Headquarters</h3>
              <p className="text-xs text-gray-600 leading-tight">
                B-9, 3rd Floor, Above B.K. Sweets, Dwarka More, Dwarka, New Delhi-110059
              </p>
            </div>
          </div>

          {/* MAIN FORM & MAP GRID */}
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Form Column */}
            <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-10 border border-gray-100 shadow-aasha-lg">
              <span className="inline-block rounded-full bg-[var(--secondary-light)] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--button-bg-color)] mb-3">
                WRITE TO US
              </span>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-gray-900 mb-2">
                Send Us A Direct Message
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                Fill out the form below and our village coordinator team will reach back to you within 24 hours.
              </p>

              {status === "sent" ? (
                <div className="rounded-2xl bg-green-50 p-6 border border-green-200 text-green-800 text-center">
                  <h4 className="font-bold text-lg mb-1">Thank You!</h4>
                  <p className="text-sm">Your message has been sent successfully. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        placeholder="rahul@example.com"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="How can we help or collaborate?"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--button-bg-color)] focus:outline-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs font-bold text-red-600">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--button-bg-color)] px-8 py-3.5 text-sm font-bold text-white shadow-aasha transition-all hover:bg-[var(--button-hover-color)] hover:scale-105 active:scale-95 disabled:opacity-60"
                  >
                    <FaPaperPlane className="text-xs" />
                    <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-3xl bg-white p-6 border border-gray-100 shadow-aasha">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-3">WhatsApp Quick Connect</h3>
                <p className="text-xs text-gray-600 mb-4">Chat directly with our team on WhatsApp for quick inquiries.</p>
                <a
                  href="https://wa.me/919266749755"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-green-700 transition-colors"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>

              <div className="flex-1 min-h-[300px] overflow-hidden rounded-3xl border border-gray-100 shadow-aasha">
                <iframe
                  title="Meri Awaz Trust office location map"
                  src="https://www.google.com/maps?q=Dwarka+More,+Dwarka,+Delhi-110059&output=embed"
                  className="h-full w-full min-h-[350px] border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonial" className="bg-white py-16 border-t border-gray-200">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full bg-[var(--secondary-light)] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[var(--button-bg-color)] mb-2">
              COMMUNITY FEEDBACK
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
              Share Your Story &amp; Experience
            </h2>
          </div>
          <TestimonialForm />
        </div>
      </section>

      {showAlert && (
        <SubmissionAlert
          message="Your message has been submitted successfully! Our team will contact you shortly."
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
