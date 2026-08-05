import { useEffect, useState } from "react";
import InfiniteSlider from "./InfiniteSlider.jsx";
import { api, getImageUrl } from "../api.js";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function PartnerLogos() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    api
      .get("/partners.php")
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setPartners(res.data);
        } else {
          setPartners([]);
        }
      })
      .catch(() => setPartners([]));
  }, []);

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-14 bg-[var(--button-bg-color)] border-t border-b border-gray-200 overflow-hidden">
      <div className="container-page max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold)] bg-[var(--button-bg-color)] px-4 py-1.5 text-xs font-extrabold tracking-wider text-[var(--text-color-light)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)] inline-block animate-pulse"></span>
            <span>Our Partners</span>
          </div>
          <p className="text-center text-sm sm:text-base font-extrabold uppercase tracking-widest text-[var(--text-color-light)] mb-8">
            TRUSTED BY OUR SOCIAL PARTNERS &amp; CSR SUPPORTERS
          </p>
        </div>

        {/* Passing visibleItems={6} for 1 Row x 6 Columns */}
        <InfiniteSlider interval={3000} visibleItems={6} theme="dark">
          {partners.map((pt) => {
            const logoSrc = getImageUrl(pt.logo_url);
            const targetLink = pt.link || "/about";
            const isExternal =
              targetLink.startsWith("http://") ||
              targetLink.startsWith("https://");

            return (
              <div
                key={pt.id}
                className="group relative h-28 w-28 sm:h-32 sm:w-32 [perspective:1000px] shrink-0 mx-auto"
              >
                {/* 3D Flip Inner Box */}
                <div className="relative h-full w-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-md border-2 border-white">
                  
                  {/* FRONT FACE (Full Cover Circular Image in Original Colors) */}
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-white overflow-hidden [backface-visibility:hidden]">
                    <img
                      src={logoSrc}
                      alt={pt.name}
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>

                  {/* BACK FACE (Hover Flip Details) */}
                  <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-[#13382C] p-2 text-center text-white overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-[10px] sm:text-[11px] font-extrabold leading-snug line-clamp-2 mb-1 px-2 break-all text-center text-white">
                      {pt.name}
                    </p>
                    {isExternal ? (
                      <a
                        href={targetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-bold text-white hover:bg-white hover:text-black transition-colors shrink-0"
                      >
                        <span>Visit</span>
                        <FaExternalLinkAlt className="text-[7px]" />
                      </a>
                    ) : (
                      <span className="text-[9px] font-bold text-[#F7D046] uppercase shrink-0">
                        Partner
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteSlider>
      </div>
    </section>
  );
}