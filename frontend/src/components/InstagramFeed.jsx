import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';
import { HeartIcon, SparklesIcon } from './Icons';

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C59B27] font-semibold">
            Social Lookbook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24171A] mt-2 mb-2">
            #LailaShamsiGirls
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-gray-600">
            Tag @LailaShamsiOfficial on Instagram to be featured on our global digital lookbook.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div 
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={post.image} 
                alt="Instagram look" 
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <HeartIcon className="w-5 h-5 text-[#E8B4B8] mb-1.5" filled={true} />
                <span className="font-mono text-xs font-bold">{post.likes}</span>
                <span className="text-[10px] text-gray-300 mt-1">{post.handle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#2A161B] text-[#2A161B] hover:bg-[#2A161B] hover:text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-sm"
          >
            <SparklesIcon className="w-4 h-4 text-[#C59B27]" />
            <span>Follow @LailaShamsiOfficial</span>
          </a>
        </div>

      </div>
    </section>
  );
}
