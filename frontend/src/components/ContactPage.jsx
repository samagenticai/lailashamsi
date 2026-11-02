import React, { useState } from 'react';
import { SparklesIcon, CheckIcon, ArrowRightIcon } from './Icons';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Bridal & Couture Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onShowToast) {
      onShowToast('Consultation request received! A senior stylist will contact you.');
    }
  };

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A1A] pt-28 pb-20">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] border border-[#B76E79]/40 text-[#B76E79] text-[10px] uppercase font-mono tracking-widest font-semibold mb-3">
          <SparklesIcon className="w-3.5 h-3.5 text-[#B76E79]" />
          Patron Relations & Bespoke Appointments
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-wide">
          Connect With Our Atelier
        </h1>
        <div className="w-20 h-0.5 bg-[#B76E79] mx-auto mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
          Whether you desire a private bridal consultation, bespoke measurements, or personal styling guidance, our concierge is dedicated to your service.
        </p>
      </section>

      {/* Main 2-Column Content: Left Form, Right Contact Cards & WhatsApp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-gray-200/80 shadow-md">
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1A1A1A] uppercase mb-2">
              Request Private Consultation
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill in your details below and an executive atelier stylist will coordinate your appointment within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#FAF3F5] border border-[#B76E79]/50 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel text-lg font-bold text-[#1A1A1A]">Consultation Confirmed</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold">{formData.name}</span>. Our bespoke atelier concierge will reach out to you via WhatsApp and email.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#B76E79] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-gray-600 tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full bg-[#FAF9F7] border border-gray-200 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B76E79]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-gray-600 tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ayesha@example.com"
                      className="w-full bg-[#FAF9F7] border border-gray-200 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B76E79]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-gray-600 tracking-wider block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#FAF9F7] border border-gray-200 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B76E79]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-gray-600 tracking-wider block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#FAF9F7] border border-gray-200 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B76E79] cursor-pointer"
                    >
                      <option>Bespoke Bridal & Couture Consultation</option>
                      <option>Pret Sizing & Custom Alterations</option>
                      <option>International Order Tracking</option>
                      <option>Private Styling Appointment</option>
                      <option>Wholesale & Press Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-600 tracking-wider block mb-1">
                    Special Notes / Measurements / Date
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your upcoming event, preferred garment cuts, or any questions..."
                    className="w-full bg-[#FAF9F7] border border-gray-200 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B76E79] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Consultation Request</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Direct WhatsApp & Flagships (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Concierge Card */}
            <div className="bg-[#141217] text-white p-7 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-xl space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#D4AF37] font-semibold block">
                Instant Response
              </span>
              <h3 className="font-cinzel text-xl font-bold uppercase">
                Atelier WhatsApp Concierge
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Connect directly with our master stylists for real-time fabric videos, custom sizing measurements, and expedited express delivery coordination.
              </p>
              
              <a
                href="https://wa.me/923001234567?text=Hello%20Laila%20Shamsi%20Atelier,%20I%20would%20like%20to%20inquire%20about%20your%20couture%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Chat with Head Stylist on WhatsApp</span>
              </a>
            </div>

            {/* Direct Contact Points */}
            <div className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm space-y-4 text-xs">
              <h4 className="font-cinzel text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">
                Headquarters & Salons
              </h4>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="text-base">📍</span>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">Flagship Lahore</p>
                    <p>M.M. Alam Road, Gulberg III, Lahore, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base">📧</span>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">Concierge Email</p>
                    <p>concierge@lailashamsi.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base">📞</span>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">Direct Telephone</p>
                    <p>+92 (42) 3578-9000 / +971 (4) 289-5500</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
