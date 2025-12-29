
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO, APARTMENTS } from '../constants';
import { InquiryFormData } from '../types';

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  apartmentOfInterest?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
}

const Inquiry: React.FC = () => {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    apartmentOfInterest: '',
    checkInDate: '',
    checkOutDate: '',
    guests: '1',
    additionalNotes: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const state = location.state as { apartmentName?: string };
    if (state?.apartmentName) {
      setFormData(prev => ({ ...prev, apartmentOfInterest: state.apartmentName! }));
    }
  }, [location]);

  const validateField = (name: string, value: string): string | undefined => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Please enter your full name as it appears on your ID.';
        if (value.trim().split(' ').length < 2) return 'Please enter both your first and last name.';
        return undefined;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'We need an email address to send your confirmation.';
        if (!emailRegex.test(value)) return 'This email address format looks incorrect.';
        return undefined;
      
      case 'phoneNumber':
        const phoneDigits = value.replace(/\D/g, '');
        if (!value) return 'A contact number is required for urgent updates.';
        if (phoneDigits.length < 10) return 'Please enter a valid 10 or 11-digit phone number.';
        return undefined;

      case 'apartmentOfInterest':
        if (!value) return 'Please select which residence you are inquiring about.';
        return undefined;

      case 'checkInDate':
        if (!value) return 'When do you plan to arrive?';
        if (value < today) return 'Arrival date cannot be in the past.';
        return undefined;

      case 'checkOutDate':
        if (!value) return 'When do you plan to depart?';
        if (formData.checkInDate && value <= formData.checkInDate) return 'Departure must be at least 1 night after arrival.';
        return undefined;

      case 'guests':
        const g = parseInt(value);
        if (isNaN(g) || g < 1) return 'At least 1 guest must be registered.';
        if (g > 10) return 'For groups over 10, please contact us for special arrangements.';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, (formData as any)[key]);
      if (error) (newErrors as any)[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      console.log('Valid Booking Inquiry:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-[#141414] border border-white/10 p-12 text-center max-w-xl w-full animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-[#c9a45c]/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8 text-[#c9a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-white mb-4">Inquiry Received</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Thank you for choosing JC Kline Homes. A member of our reservation team will review your request for <strong>{formData.apartmentOfInterest}</strong> and reach out shortly.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-[#c9a45c] font-bold tracking-widest uppercase border-b border-[#c9a45c] pb-1 hover:text-white transition-colors"
          >
            New Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Reservations</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Experience Excellence</h1>
          <p className="text-gray-400 mb-12 leading-relaxed max-w-md text-lg">
            Our luxury apartments in Abuja offer more than a stay—they offer a sanctuary. Complete this form to begin your journey with us.
          </p>

          <div className="space-y-8">
            <div className="p-8 bg-[#141414] border-l-4 border-[#c9a45c] shadow-xl">
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Need a quick answer?</h4>
              <p className="text-gray-400 text-sm mb-6">Our concierge is active on WhatsApp and usually responds in under 10 minutes during business hours.</p>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white bg-[#25D366] px-6 py-3 rounded-sm font-bold text-sm transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#141414] border border-white/10 p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Apartment Select */}
              <div className="md:col-span-2">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Apartment of Interest</label>
                <select
                  name="apartmentOfInterest"
                  value={formData.apartmentOfInterest}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/5 border ${errors.apartmentOfInterest && touched.apartmentOfInterest ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="bg-[#141414]">Select your residence...</option>
                  {APARTMENTS.map(apt => (
                    <option key={apt.id} value={apt.name} className="bg-[#141414]">{apt.name}</option>
                  ))}
                </select>
                {errors.apartmentOfInterest && touched.apartmentOfInterest && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {errors.apartmentOfInterest}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div>
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Check-in Date</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/5 border ${errors.checkInDate && touched.checkInDate ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all`}
                />
                {errors.checkInDate && touched.checkInDate && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.checkInDate}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Check-out Date</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/5 border ${errors.checkOutDate && touched.checkOutDate ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all`}
                />
                {errors.checkOutDate && touched.checkOutDate && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.checkOutDate}</p>
                )}
              </div>

              {/* Guests & Info */}
              <div className="md:col-span-1">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-white/5 border ${errors.guests && touched.guests ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all`}
                />
                {errors.guests && touched.guests && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.guests}</p>
                )}
              </div>

              <div className="md:col-span-1">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`w-full bg-white/5 border ${errors.fullName && touched.fullName ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all`}
                />
                {errors.fullName && touched.fullName && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.fullName}</p>
                )}
              </div>

              <div className="md:col-span-1">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="email@example.com"
                  className={`w-full bg-white/5 border ${errors.email && touched.email ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all`}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-1">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+234..."
                  className={`w-full bg-white/5 border ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all`}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.phoneNumber}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Special Requirements</label>
                <textarea
                  name="additionalNotes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Dietary needs, arrival time, or special occasions..."
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all resize-none"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#c9a45c] text-black font-bold tracking-[0.3em] uppercase py-5 hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Send Request
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
                <div className="h-px flex-grow bg-white/20"></div>
                <span className="text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">Your data is secured</span>
                <div className="h-px flex-grow bg-white/20"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
