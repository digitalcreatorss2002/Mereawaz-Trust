import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api.js";

// Fallback sample data in case DB is initially empty
const sampleTrustees = [
  {
    id: 1,
    name: "Banaja Mishra",
    role: "CEO & Founder Trustee",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    bio: "Visionary leader driving rural development and empowerment programs."
  },
  {
    id: 2,
    name: "Sahin Paravin",
    role: "Trustee",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    bio: "Specializing in community healthcare and women self-help initiatives."
  },
  {
    id: 3,
    name: "Shardindu Upadhyay",
    role: "Trustee",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "Focusing on agricultural technology, drone farming, and solar micro-grids."
  },
  {
    id: 4,
    name: "Hamid Malik",
    role: "Trustee",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    bio: "Advocating digital literacy and educational infrastructure for rural youth."
  }
];

export default function BoardOfTrustees() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="py-20 bg-gradient-to-b from-white via-[#FAF8F4] to-white border-t border-b border-gray-100 overflow-hidden relative">
      <div className="container-page relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-xs sm:text-sm font-extrabold tracking-wider text-[var(--text-color-light)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse" />
            <span>LEADERSHIP & GOVERNANCE</span>
          </div>

          <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-gray-900 tracking-tight">
            Board of Trustees
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Our visionary board members guiding Meri Awaz Trust towards transparent, impactful, and sustainable rural transformation across India.
          </p>
        </div>

        {/* Member Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayList.map((m, index) => (
            <motion.div
              key={m.id || index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group rounded-3xl bg-white border border-gray-100 shadow-aasha overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-aasha-lg hover:border-[var(--accent-gold)]/60"
            >
              {/* Image Container */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-gray-100">
                <img
                  src={m.image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
                  alt={m.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
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

      </div>
    </section>
  );
}
