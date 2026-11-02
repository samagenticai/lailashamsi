import React, { useState } from 'react';
import { SparklesIcon, CheckIcon, ArrowRightIcon, LockIcon } from './Icons';

export default function Footer({ onSelectCategory, onOpenAdmin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNav = (route) => {
    if (onNavigate) onNavigate(route);
  };

  return (
    <footer className="bg-[#282321] text-[#FAF5EC] border-t border-[#E8DCCB]/20 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Subscription Box */}
        <div className="bg-[#FAF5EC] text-[#282321] rounded-3xl p-8 sm:p-14 mb-20 border border-[#E8DCCB] shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#B89B62]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-bold flex items-center gap-2">
                <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
                Discover Timeless Pakistani Elegance
              </span>
              <h3 className="font-cinzel text-2xl sm:text-4xl text-[#641E32] font-bold">
                Be the First to Discover What's New
              </h3>
              <p className="text-xs sm:text-sm text-[#282321]/80 font-normal max-w-lg leading-relaxed">
                Subscribe for new arrivals, seasonal collections, and exclusive offers.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-white border border-[#164B3C] rounded-2xl flex items-center gap-3 text-xs text-[#282321]">
                  <div className="w-8 h-8 rounded-full bg-[#164B3C] flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-[#FAF5EC]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#164B3C]">Thank You for Subscribing!</p>
                    <p className="text-[#282321]/80">Use code <span className="text-[#641E32] font-bold">LAILA10</span> at checkout.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white border border-[#E8DCCB] rounded-full px-5 py-3.5 text-xs text-[#282321] placeholder:text-[#282321]/50 focus:outline-none focus:border-[#641E32] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#641E32] text-[#FAF5EC] rounded-full text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#164B3C] transition-all whitespace-nowrap flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Join Our Newsletter</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Clean Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#E8DCCB]/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 cursor-pointer group"
              title="Laila Shamsi - Back to Start"
            >
              <img 
                src="/Logo.jpeg" 
                alt="Laila Shamsi" 
                className="h-12 w-12 rounded-xl object-contain border border-[#B89B62]/60 shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-cinzel tracking-[0.18em] text-xl font-bold text-[#FAF5EC] uppercase block leading-tight group-hover:text-[#B89B62] transition-colors">
                  LAILA SHAMSI
                </span>
                <p className="text-[8.5px] uppercase tracking-[0.28em] text-[#B89B62] font-semibold mt-0.5">
                  Pakistani Eastern Wear
                </p>
              </div>
            </div>
            <p className="text-xs text-[#E8DCCB]/85 font-normal leading-relaxed max-w-sm">
              Celebrating Pakistani Fashion, One Beautiful Detail at a Time.
            </p>
            <button
              onClick={() => handleNav('/about')}
              className="text-[11px] text-[#B89B62] hover:underline font-semibold uppercase tracking-wider block"
            >
              Rooted in Tradition, Designed for Today →
            </button>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-[#E8DCCB]/20 flex items-center justify-center text-[#E8DCCB] hover:text-[#FAF5EC] hover:border-[#B89B62] transition-colors text-xs font-semibold">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-[#E8DCCB]/20 flex items-center justify-center text-[#E8DCCB] hover:text-[#FAF5EC] hover:border-[#B89B62] transition-colors text-xs font-semibold">
                FB
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-[#E8DCCB]/20 flex items-center justify-center text-[#E8DCCB] hover:text-[#FAF5EC] hover:border-[#B89B62] transition-colors text-xs font-semibold">
                PIN
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-[#E8DCCB]/20 flex items-center justify-center text-[#E8DCCB] hover:text-[#FAF5EC] hover:border-[#B89B62] transition-colors text-xs font-semibold">
                TT
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#B89B62] tracking-wide">
              Discover Our Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCCB]/80">
              <li>
                <button onClick={() => { onSelectCategory('unstitched'); handleNav('/categories'); }} className="hover:text-[#B89B62] transition-colors">
                  Unstitched Suits
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('ready-to-wear'); handleNav('/categories'); }} className="hover:text-[#B89B62] transition-colors">
                  Ready to Wear
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('stitched'); handleNav('/categories'); }} className="hover:text-[#B89B62] transition-colors">
                  Luxury Pret
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('luxury-formals'); handleNav('/categories'); }} className="hover:text-[#B89B62] transition-colors">
                  Festive & Formal Wear
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('festive-26'); handleNav('/categories'); }} className="hover:text-[#B89B62] transition-colors">
                  Eid Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#B89B62] tracking-wide">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCCB]/80">
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B89B62] transition-colors text-left">Size & Fitting Guide</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B89B62] transition-colors text-left">Shipping & Delivery</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B89B62] transition-colors text-left">14-Day Exchange Policy</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B89B62] transition-colors text-left">Track Your Order</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B89B62] transition-colors text-left">Styling Consultation</button></li>
            </ul>
          </div>

          {/* Flagships */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#B89B62] tracking-wide">
              Boutiques
            </h4>
            <ul className="space-y-2 text-xs text-[#E8DCCB]/80">
              <li><span className="text-[#FAF5EC] font-medium">Lahore:</span> M.M. Alam Road, Gulberg</li>
              <li><span className="text-[#FAF5EC] font-medium">Karachi:</span> Bukhari Commercial, DHA</li>
              <li><span className="text-[#FAF5EC] font-medium">Islamabad:</span> F-7 Markaz</li>
              <li><span className="text-[#FAF5EC] font-medium">London:</span> Knightsbridge</li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E8DCCB]/60 gap-4">
          <p>© {new Date().getFullYear()} LAILA SHAMSI. Celebrating Pakistani Fashion, One Beautiful Detail at a Time.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="hover:text-[#FAF5EC] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#FAF5EC] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#FAF5EC] cursor-pointer transition-colors">Authenticity Certified</span>
            
            {/* Admin Login Lock Icon */}
            <button 
              onClick={onOpenAdmin} 
              className="p-1.5 rounded-full text-[#E8DCCB]/60 hover:text-[#B89B62] border border-transparent hover:border-[#B89B62]/40 hover:bg-[#B89B62]/10 transition-all group"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <LockIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
