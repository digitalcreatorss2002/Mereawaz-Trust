import React from 'react'
import { FaStar, FaQuoteRight } from 'react-icons/fa'
import { getImageUrl } from '../api.js'

export default function TestimonialCard({ name, location, message, rating = 5, avatar }) {
  const avatarSrc = avatar ? getImageUrl(avatar) : null;

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-8 border border-gray-100 shadow-xs transition-all duration-300 hover:shadow-md">
      <div>
        {/* 1. Yellow Rating Stars */}
        <div className="flex items-center gap-1 text-[#F7D046] mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={`text-sm ${i < rating ? 'text-[#F7D046]' : 'text-gray-200'}`} />
          ))}
        </div>

        {/* 2. Message Quote */}
        <p className="font-display text-base sm:text-lg font-extrabold text-[#13382C] leading-snug mb-6 line-clamp-4">
          &ldquo;{message}&rdquo;
        </p>
      </div>

      <div>
        {/* 3. Divider Line */}
        <div className="w-full h-px bg-gray-100 mb-5" />

        {/* 4. Bottom Author Profile & Right Quote Icon */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-display font-black text-base sm:text-lg text-[#13382C]">
              {name}
            </h4>
            {location && (
              <p className="text-xs font-semibold text-gray-500 mt-0.5">
                {location}
              </p>
            )}
          </div>

          {/* Avatar / Profile Initial + Yellow Quote Badge */}
          <div className="relative shrink-0">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={name}
                className="h-12 w-12 rounded-full object-cover border border-gray-100"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#13382C] text-[#F7D046] font-extrabold flex items-center justify-center text-base shadow-xs">
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}

            {/* Bottom-right Yellow Quote Badge */}
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F7D046] text-[#13382C] text-[10px] shadow-xs">
              <FaQuoteRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}