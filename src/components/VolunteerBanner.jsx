import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export default function VolunteerBanner() {
  const [selectedAmount, setSelectedAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const navigate = useNavigate();

  const presetAmounts = ["250", "500", "1000", "2500", "5000", "10000"];

  const handleDonateNow = (e) => {
    e.preventDefault();
    const finalAmount = customAmount || selectedAmount;
    navigate(`/donate?amount=${finalAmount}`);
  };

  return (
    <section className="bg-white py-12 lg:py-16 overflow-hidden font-sans">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 items-center min-h-[620px] gap-8">
          {/* ================= RIGHT COLUMN: CONTENT & BULLET POINTS ================= */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-6">
            
            {/* Pill Eyebrow Badge */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1 text-xs font-bold text-[var(--text-color-light)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block" />
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
                <span>Become A Volunteer</span>
                <FiArrowUpRight className="text-base" />
              </Link>
            </div>

          </div>
          {/* ================= LEFT COLUMN: DONATION FORM (Now expands to full outer size) ================= */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            {/* Donation Form Box expands to fill the outer card dimensions */}
            <div className="w-full bg-[var(--button-bg-color)] rounded-[32px] p-8 sm:p-10 lg:p-12 shadow-2xl border border-gray-100/80">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-center text-[var(--text-color-light)] mb-3">
                How much would you like to donate today?
              </h3>
              
              <div className="w-16 h-1 bg-[var(--text-color-light)] mb-4 rounded-full mx-auto" />

              <p className="text-xs sm:text-sm text-[var(--text-color-light)] text-center mb-8 leading-relaxed max-w-md mx-auto">
                All donations directly impact our organization and help us further our mission.
              </p>

              <form onSubmit={handleDonateNow} className="space-y-5">
                <div className="flex justify-between items-center text-xs font-extrabold text-[var(--text-color-light)] mb-2">
                  <span>Donation Amount *</span>
                  <span className="bg-gray-100 px-2.5 py-1 rounded-md text-[10px] text-[var(--text-color)] font-bold uppercase">INR ₹</span>
                </div>

                {/* Amount Preset Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-black transition-all border ${
                          isSelected
                            ? "bg-[var(--button-bg-color)] text-[var(--text-color-light)] border-[var(--text-color-light)] shadow-sm"
                            : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount("");
                    }}
                    className="w-full px-5 py-3.5 text-xs sm:text-sm border border-gray-200 rounded-2xl focus:outline-none focus:border-[#F7D046] bg-gray-50 text-gray-900"
                  />
                </div>

                {/* Submit Donate Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[var(--text-color-light)] hover:bg-[var(--button-hover-color)] text-[var(--text-color)] hover:text-[var(--text-color-light)] font-black text-sm sm:text-base shadow-md transition-all active:scale-95"
                >
                  Donate now
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[var(--text-color-light)] pt-1">
                  <FaLock className="text-[10px] text-[var(--text-color-light)]" />
                  <span>100% Secure Donation</span>
                </div>
              </form>
            </div>
          </div>

          

        </div>
      </div>
    </section>
  );
}