import React from 'react';

export default function BrandLogo({ className = "h-9", showText = true }) {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer group">
      {/* Luxury Monogram Emblem SVG (Dummy Logo Crest) */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-500 group-hover:rotate-6"
        >
          {/* Outer Gold Diamond Ring */}
          <rect 
            x="50" 
            y="7" 
            width="60" 
            height="60" 
            rx="10" 
            transform="rotate(45 50 7)" 
            stroke="url(#goldGradient)" 
            strokeWidth="2.5" 
          />
          {/* Inner Accent Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="26" 
            stroke="#4A0E17" 
            strokeWidth="1.5" 
            strokeDasharray="4 2" 
          />
          {/* Stylized Lotus Petal / Crown Couture Silhouette */}
          <path 
            d="M50 28 C45 38 34 46 34 54 C34 63 41 68 50 68 C59 63 66 54 66 46 C66 38 55 28 50 28 Z" 
            fill="url(#goldGradient)" 
            opacity="0.9"
          />
          {/* Center Monogram Gem */}
          <circle cx="50" cy="50" r="3.5" fill="#4A0E17" />
          <path 
            d="M50 35 L50 62 M40 50 L60 50" 
            stroke="#FAF7F2" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA51" />
              <stop offset="50%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#9E7412" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif tracking-[0.2em] text-lg sm:text-xl font-bold text-[#2A161B] group-hover:text-[#4A0E17] transition-colors leading-none uppercase">
            LAILA SHAMSI
          </span>
          <span className="text-[7.5px] uppercase tracking-[0.3em] text-[#C59B27] font-semibold mt-1">
            HAUTE COUTURE
          </span>
        </div>
      )}
    </div>
  );
}
