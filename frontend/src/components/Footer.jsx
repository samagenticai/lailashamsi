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
    <footer className="bg-[#111111] text-[#FAFAFA] border-t border-[#222222] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Minimalist Dark VIP Club Subscription */}
        <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-14 mb-20 border border-[#B76E79]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#B76E79]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B76E79] font-bold flex items-center gap-2">
                <SparklesIcon className="w-3.5 h-3.5 text-[#B76E79]" />
                The Laila Shamsi VIP Atelier
              </span>
              <h3 className="font-cinzel text-2xl sm:text-4xl text-white font-bold uppercase">
                Enjoy 10% Off Your First Couture Order
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light max-w-lg leading-relaxed">
                Receive private invitations to confidential archive drops, bespoke bridal previews, and seasonal runway debuts.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-white/5 border border-[#B76E79] rounded-2xl flex items-center gap-3 text-xs text-white">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#E6B8BF]">Welcome to The VIP Atelier!</p>
                    <p className="text-gray-400">Use promo voucher <span className="font-mono text-white font-bold">LAILA10</span> at checkout.</p>
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
                    className="flex-1 bg-[#141414] border border-[#333333] rounded-full px-5 py-3.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#B76E79] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#B76E79] text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#C4828C] transition-all whitespace-nowrap flex items-center justify-center gap-2 liquid-btn"
                  >
                    <span>Subscribe</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Clean Columns with Sleek Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#222222]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNav('/new-arrivals')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src="/Logo.jpeg" 
                alt="Laila Shamsi" 
                className="h-12 w-12 rounded-xl object-contain border border-[#D4AF37]/50 shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-cinzel tracking-[0.22em] text-xl font-bold text-white uppercase block leading-tight group-hover:text-[#E6B8BF] transition-colors">
                  LAILA SHAMSI
                </span>
                <p className="text-[8.5px] uppercase tracking-[0.3em] text-[#B76E79] font-semibold mt-0.5">
                  Haute Couture & Luxury Pret
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              An internationally celebrated high-fashion house dedicated to modern feminine elegance, pure natural textiles, and bespoke handcraft.
            </p>
            <button
              onClick={() => handleNav('/about')}
              className="text-[11px] text-[#B76E79] hover:underline font-semibold uppercase tracking-wider block"
            >
              Read Atelier Story & Heritage →
            </button>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#B76E79] transition-colors text-xs font-semibold">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#B76E79] transition-colors text-xs font-semibold">
                FB
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#B76E79] transition-colors text-xs font-semibold">
                PIN
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#B76E79] transition-colors text-xs font-semibold">
                TT
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-[0.2em]">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => { onSelectCategory('all'); handleNav('/new-arrivals'); }} className="hover:text-[#B76E79] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('festive-26'); handleNav('/categories'); }} className="hover:text-[#B76E79] transition-colors">
                  Summer Festive '26
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('ready-to-wear'); handleNav('/categories'); }} className="hover:text-[#B76E79] transition-colors">
                  Ready To Wear
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('luxury-formals'); handleNav('/categories'); }} className="hover:text-[#B76E79] transition-colors">
                  Haute Couture & Formals
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('silk-coords'); handleNav('/categories'); }} className="hover:text-[#B76E79] transition-colors">
                  Modern Silk Co-ords
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/sales')} className="text-[#E6B8BF] font-semibold hover:underline transition-colors">
                  Archival Privilege Sale ✨
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-[0.2em]">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B76E79] transition-colors text-left">Bespoke Fitting Guide</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B76E79] transition-colors text-left">Worldwide Shipping Policy</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B76E79] transition-colors text-left">14-Day Exchange Guarantee</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B76E79] transition-colors text-left">Track Consignment</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-[#B76E79] transition-colors text-left">Private Styling Consult</button></li>
            </ul>
          </div>

          {/* Flagships */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-[0.2em]">
              Ateliers
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><span className="text-white font-medium">Lahore:</span> M.M. Alam Road, Gulberg</li>
              <li><span className="text-white font-medium">Karachi:</span> Bukhari Commercial, DHA</li>
              <li><span className="text-white font-medium">Dubai:</span> City Walk, Al Safa</li>
              <li><span className="text-white font-medium">London:</span> Sloane Street, Knightsbridge</li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} LAILA SHAMSI HAUTE COUTURE. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Authenticity Certified</span>
            
            {/* Admin Login Lock Icon */}
            <button 
              onClick={onOpenAdmin} 
              className="p-1.5 rounded-full text-gray-500 hover:text-[#B76E79] border border-transparent hover:border-[#B76E79]/40 hover:bg-[#B76E79]/10 transition-all group"
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
