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
    /* Outer wrapper: -my-8 / -my-12 se ye dono sections par naturally overlap karega bina cut huye */
    <div className="relative z-30 -my-8 sm:-my-7 w-full overflow-visible leading-none pointer-events-none">
      
      {/* 
        Reference image jaisa exact slant:
        -rotate-2 (Left Down, Right Up)
        w-[110vw] & -ml-[5vw] taaki side me koi gap na bache
      */}
      <div className="w-[110vw] -ml-[5vw] bg-[var(--accent-gold,#F7D046)] border-y-2 border-[#e5bf3b] py-3.5 sm:py-5 shadow-2xl flex items-center overflow-hidden transform -rotate-2 sm:-rotate-2.5 origin-center transform-gpu pointer-events-auto">
        
        {/* Infinite Scrolling Track */}
        <div className="flex whitespace-nowrap animate-marquee">
          {repeatedItems.map((text, idx) => (
            <div
              key={idx}
              className="flex items-center mx-6 text-[18px] sm:text-[20px] md:text-[22px] font-extrabold uppercase tracking-wider shrink-0 text-[var(--text-color,#0F382C)]"
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
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
}