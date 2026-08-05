import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const faqs = [
  {
    id: 1,
    question: "How are UPI donations processed and verified?",
    answer:
      "When you make a donation via UPI, a unique reference number is generated. After making the payment in your preferred UPI app (Google Pay, PhonePe, Paytm, BHIM), simply enter your UTR / Transaction ID on our site. Our admin team manually verifies it with bank records and emails an official receipt.",
  },
  {
    id: 2,
    question: "What areas does Meri Awaz Trust focus on?",
    answer:
      "We focus on four main pillars in rural India: 1) Precision Agriculture & Drone Tech, 2) Clean Renewable Energy (Solar & Biogas), 3) Digital Literacy & Youth Education, and 4) Mobile Healthcare Clinics & Life-Skills Training.",
  },
  {
    id: 3,
    question: "How can I volunteer or partner with the Trust?",
    answer:
      "You can join us as a field volunteer, mentor, or organizational partner! Visit our Contact page to send us a message or reach out directly on WhatsApp (+91 9709544166) to explore volunteer opportunities.",
  },
  {
    id: 4,
    question: "How are testimonials and community feedback moderated?",
    answer:
      "All story submissions and review feedback submitted by the public go into a moderation queue in our Admin Dashboard. Once our admin team verifies the submission for authenticity, it gets published to our public website.",
  },
  {
    id: 5,
    question: "How does drone technology help smallholder farmers?",
    answer:
      "Our precision drone program provides automated crop health assessment and targeted micro-spraying. This reduces chemical waste by up to 40%, lowers manual labor costs, and improves crop yield for small farmers who otherwise could not afford industrial equipment.",
  },
  {
    id: 6,
    question: "Is Meri Awaz Trust a registered NGO?",
    answer:
      "Yes, Meri Awaz Trust is a legally registered non-profit charitable trust dedicated to sustainable social development, rural empowerment, and community welfare.",
  },
  {
    id: 7,
    question: "Is Meri Awaz Trust a registered NGO?",
    answer:
      "Yes, Meri Awaz Trust is a legally registered non-profit charitable trust dedicated to sustainable social development, rural empowerment, and community welfare.",
  },
  {
    id: 8,
    question: "Is Meri Awaz Trust a registered NGO?",
    answer:
      "Yes, Meri Awaz Trust is a legally registered non-profit charitable trust dedicated to sustainable social development, rural empowerment, and community welfare.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Split FAQs into 2 columns
  const midIndex = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midIndex);
  const rightFaqs = faqs.slice(midIndex);

  const renderFaqCard = (faq) => {
    const isOpen = openId === faq.id;
    return (
      <div
        key={faq.id}
        className="overflow-hidden rounded-2xl bg-[var(--text-color-light)] transition-all duration-200"
      >
        <button
          onClick={() => toggle(faq.id)}
          className="flex w-full items-center justify-between p-5 sm:p-6 text-left focus:outline-none gap-4"
          aria-expanded={isOpen}
        >
          <span className="font-display text-base sm:text-lg font-extrabold text-[#0F382C] leading-snug">
            {faq.question}
          </span>

          {/* Yellow Circular Plus/Minus Icon */}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--text-color)] font-bold text-xl transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-10 bg-white font-sans">
      <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER SECTION (Matching Reference Image) ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-gold)] border border-gray-200 px-4 py-1.5 text-xs font-bold text-[var(--text-color)]">
              <span className="h-2 w-2 rounded-full bg-[var(--button-bg-color)]" />
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F382C] leading-tight">
              Helping you Understand Our Work Better
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end space-y-6">
            <p className="text-md sm:text-[20px] text-[var(--text-color)] leading-relaxed lg:text-left">
              We've gathered answers to the questions we hear most, making it
              easy for you to learn about our work, values, and the impact we
              create together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-gold)] px-6 py-3.5 text-sm font-black text-[#0F382C] hover:bg-[#e2bd3b] transition-all shadow-sm"
            >
              <span>Contact Us Now</span>
              {/* <span>↗</span> */}
            </Link>
          </div>
        </div>

        {/* ================= 2-COLUMN FAQ GRID ================= */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-start">
          <div className="space-y-4">{leftFaqs.map(renderFaqCard)}</div>
          <div className="space-y-4">{rightFaqs.map(renderFaqCard)}</div>
        </div>
      </div>
    </section>
  );
}
