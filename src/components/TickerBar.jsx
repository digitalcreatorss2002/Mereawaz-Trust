import React from "react";

export default function TickerBar() {
  const items = [
    "Empowering Rural India",
    "Education For All",
    "Community Support",
    "Health Support",
    "Volunteer Impact",
    "Future Ready",
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    /* Outer wrapper: Full z-index overlap for both top and bottom sections */
    <div className="relative z-40 w-full overflow-visible leading-none pointer-events-none -my-6 sm:-my-8">
      
      {/* 
        Slanted Edge-to-Edge Yellow Ribbon 
        - w-[110vw] and -ml-[5vw] ensures full edge bleed without cutting off
        - rotate-[-2deg] creates exact reference slant
      */}
      <div className="w-[110vw] -ml-[5vw] bg-[#F7D046] border-y-2 border-[#e5bf3b] py-3.5 sm:py-4 shadow-2xl flex items-center transform -rotate-2 sm:-rotate-2.5 origin-center transform-gpu pointer-events-auto">
        
        {/* Infinite Scrolling Track */}
        <div className="flex whitespace-nowrap animate-marquee">
          {repeatedItems.map((text, idx) => (
            <div
              key={idx}
              className="flex items-center mx-6 text-[18px] sm:text-[20px] md:text-[22px] font-extrabold uppercase tracking-wider shrink-0 text-[#0F382C]"
            >
              <span>{text}</span>
              
              {/* Star Separator Icon */}
              <svg
                className="w-4 h-4 ml-10 text-[#0F382C] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l2.4 6.6L21 9.2l-5 4.8 1.4 6.8L12 17.2l-5.4 3.6L8 14 3 9.2l6.6-.6z" />
              </svg>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
}