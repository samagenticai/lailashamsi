import React, { useState } from 'react';
import { SparklesIcon, CheckIcon, ArrowRightIcon } from './Icons';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Festive & Formal Wear Consultation',
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
    <div className="bg-[#FAF5EC] text-[#282321] pt-36 pb-20">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCCB]/50 border border-[#B89B62]/50 text-[#164B3C] text-[10px] uppercase tracking-widest font-semibold mb-3">
          <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
          Discover Timeless Pakistani Elegance
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#641E32] tracking-wide">
          Connect With Our Atelier
        </h1>
        <div className="w-20 h-0.5 bg-[#B89B62] mx-auto mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-[#282321]/80 font-normal max-w-xl mx-auto leading-relaxed">
          Whether you require guidance on unstitched fabrics, custom measurements for formal wear, or styling advice for our Eid collection, our team is delighted to assist you.
        </p>
      </section>

      {/* Main 2-Column Content: Left Form, Right Contact Cards & WhatsApp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-[#E8DCCB] shadow-md">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#641E32] mb-2">
              Request Styling Assistance
            </h2>
            <p className="text-xs text-[#282321]/75 mb-6">
              Fill in your details below and an atelier stylist will coordinate your enquiry within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#FAF5EC] border border-[#B89B62]/60 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#164B3C] text-[#FAF5EC] flex items-center justify-center mx-auto shadow-md">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#641E32]">Enquiry Confirmed</h3>
                <p className="text-xs text-[#282321]/80 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold">{formData.name}</span>. Our concierge will reach out to you via WhatsApp and email.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#641E32] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#282321] tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full bg-[#FAF5EC] border border-[#E8DCCB] rounded-xl px-4 py-3 text-xs text-[#282321] focus:outline-none focus:border-[#641E32]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#282321] tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ayesha@example.com"
                      className="w-full bg-[#FAF5EC] border border-[#E8DCCB] rounded-xl px-4 py-3 text-xs text-[#282321] focus:outline-none focus:border-[#641E32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#282321] tracking-wider block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#FAF5EC] border border-[#E8DCCB] rounded-xl px-4 py-3 text-xs text-[#282321] focus:outline-none focus:border-[#641E32]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#282321] tracking-wider block mb-1">
                      Enquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#FAF5EC] border border-[#E8DCCB] rounded-xl px-4 py-3 text-xs text-[#282321] focus:outline-none focus:border-[#641E32] cursor-pointer"
                    >
                      <option>Festive & Formal Wear Consultation</option>
                      <option>Unstitched Suits & Fabric Enquiries</option>
                      <option>Ready to Wear & Luxury Pret Sizing</option>
                      <option>Eid Collection Orders</option>
                      <option>International Order Tracking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#282321] tracking-wider block mb-1">
                    Special Notes / Measurements / Date
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your upcoming event, preferred shalwar kameez silhouettes, or any questions..."
                    className="w-full bg-[#FAF5EC] border border-[#E8DCCB] rounded-xl px-4 py-3 text-xs text-[#282321] focus:outline-none focus:border-[#641E32] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#641E32] hover:bg-[#4e1626] text-[#FAF5EC] font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Consultation Request</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 text-[#B89B62]" />
                </button>
              </form>
            )}
          </div>

          {/* Right Direct WhatsApp & Flagships (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Concierge Card */}
            <div className="bg-[#282321] text-[#FAF5EC] p-7 sm:p-8 rounded-3xl border border-[#B89B62]/50 shadow-xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B89B62] font-semibold block">
                Instant Response
              </span>
              <h3 className="font-heading text-xl font-bold text-[#FAF5EC]">
                Atelier WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#FAF5EC]/80 font-normal leading-relaxed">
                Connect directly with our stylists for close-up embroidery videos, custom sizing measurements, and express delivery coordination.
              </p>
              
              <a
                href="https://wa.me/923001234567?text=Hello%20Laila%20Shamsi%20Atelier,%20I%20would%20like%20to%20enquire%20about%20your%20Eastern%20Wear%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#164B3C] hover:bg-[#113a2e] text-[#FAF5EC] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Chat with Stylist on WhatsApp</span>
              </a>
            </div>

            {/* Direct Contact Points */}
            <div className="bg-white p-7 rounded-3xl border border-[#E8DCCB] shadow-sm space-y-4 text-xs">
              <h4 className="font-heading text-base font-bold tracking-wide text-[#641E32]">
                Headquarters & Studios
              </h4>
              
              <div className="space-y-3 text-[#282321]/80">
                <div className="flex items-start gap-3">
                  <span className="text-base">📍</span>
                  <div>
                    <p className="font-bold text-[#641E32]">Flagship Lahore</p>
                    <p>M.M. Alam Road, Gulberg III, Lahore, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base">📧</span>
                  <div>
                    <p className="font-bold text-[#641E32]">Concierge Email</p>
                    <p>concierge@lailashamsi.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base">📞</span>
                  <div>
                    <p className="font-bold text-[#641E32]">Direct Telephone</p>
                    <p>+92 (42) 3578-9000</p>
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
