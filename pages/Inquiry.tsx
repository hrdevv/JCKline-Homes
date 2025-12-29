
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

const ValidationIcon = ({ type }: { type: 'error' | 'success' }) => (
  <div className="absolute right-4 top-[52px] pointer-events-none">
    {type === 'error' ? (
      <svg className="w-5 h-5 text-red-500 animate-in zoom-in" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-green-500 animate-in zoom-in" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )}
  </div>
);

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
      setTouched(prev => ({ ...prev, apartmentOfInterest: true }));
    }
  }, [location]);

  const validateField = (name: string, value: string): string | undefined => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Name is required for booking.';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Please use letters only.';
        if (value.trim().split(/\s+/).length < 2) return 'Please enter both your first and last name.';
        return undefined;
      
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) return 'We need your email to send the confirmation.';
        if (!emailRegex.test(value)) return 'Please enter a valid email address (e.g., name@gmail.com).';
        return undefined;
      
      case 'phoneNumber':
        const cleanPhone = value.replace(/\D/g, '');
        if (!value) return 'Phone number is required for contact.';
        if (!/^\+?[0-9]{10,14}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number (10-14 digits).';
        if (cleanPhone.length < 10) return 'Too short. Nigerian numbers are usually 11 digits.';
        return undefined;

      case 'apartmentOfInterest':
        if (!value) return 'Please select a residence.';
        return undefined;

      case 'checkInDate':
        if (!value) return 'Arrival date is required.';
        if (value < today) return 'Check-in cannot be in the past.';
        return undefined;

      case 'checkOutDate':
        if (!value) return 'Departure date is required.';
        if (formData.checkInDate && value <= formData.checkInDate) return 'Stay must be at least 1 night.';
        return undefined;

      case 'guests':
        const g = parseInt(value);
        if (isNaN(g) || g < 1) return 'Min. 1 guest.';
        if (g > 10) return 'Max 10 guests. For more, please call us.';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-clear dependent errors
    if (name === 'checkInDate' && formData.checkOutDate) {
      setErrors(prev => ({ ...prev, checkOutDate: validateField('checkOutDate', formData.checkOutDate) }));
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
    const newErrors: FormErrors = {};
    let firstErrorField: string | null = null;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, (formData as any)[key]);
      if (error) {
        (newErrors as any)[key] = error;
        if (!firstErrorField) firstErrorField = key;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      console.log('Sending Inquiry:', formData);
      setIsSubmitted(true);
    }
  };

  const getInputClass = (name: keyof FormErrors) => {
    const isError = errors[name] && touched[name];
    const isSuccess = !errors[name] && touched[name] && formData[name as keyof InquiryFormData];
    
    return `w-full bg-white/5 border px-4 py-4 text-white focus:outline-none transition-all duration-300 ${
      isError 
        ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' 
        : isSuccess 
          ? 'border-green-500/50 focus:border-[#c9a45c] bg-green-500/5'
          : 'border-white/10 focus:border-[#c9a45c]'
    }`;
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
            Your request for <strong>{formData.apartmentOfInterest}</strong> has been logged. Our reservation team in Abuja will verify availability and reach out to you within an hour.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-[#c9a45c] font-bold tracking-widest uppercase border-b border-[#c9a45c] pb-1 hover:text-white transition-colors"
          >
            Start New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="animate-in slide-in-from-left duration-700">
          <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Concierge Desk</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Request Your Stay</h1>
          <p className="text-gray-400 mb-12 leading-relaxed max-w-md text-lg">
            Experience the finest serviced living in Abuja. Provide your details below, and let us handle your luxury accommodation.
          </p>

          <div className="space-y-6">
            <div className="p-8 bg-[#141414] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#c9a45c]"></div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Direct Contact</h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">Prefer to chat? Our WhatsApp concierge is available for real-time availability checks.</p>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white bg-[#25D366] px-6 py-3 rounded-sm font-bold text-sm transition-all hover:brightness-110 shadow-lg shadow-green-500/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Concierge
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-xs italic">
              <svg className="w-4 h-4 text-[#c9a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Standard response time: &lt; 30 mins
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 p-8 md:p-12 shadow-2xl relative">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="md:col-span-2 relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Selected Residence</label>
                <select
                  name="apartmentOfInterest"
                  value={formData.apartmentOfInterest}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('apartmentOfInterest')}
                >
                  <option value="" disabled className="bg-[#141414]">Select your residence...</option>
                  {APARTMENTS.map(apt => (
                    <option key={apt.id} value={apt.name} className="bg-[#141414]">{apt.name}</option>
                  ))}
                </select>
                {touched.apartmentOfInterest && <ValidationIcon type={errors.apartmentOfInterest ? 'error' : 'success'} />}
                {errors.apartmentOfInterest && touched.apartmentOfInterest && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium animate-in slide-in-from-top-1">{errors.apartmentOfInterest}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Check-in</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('checkInDate')}
                />
                {touched.checkInDate && <ValidationIcon type={errors.checkInDate ? 'error' : 'success'} />}
                {errors.checkInDate && touched.checkInDate && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.checkInDate}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Check-out</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('checkOutDate')}
                />
                {touched.checkOutDate && <ValidationIcon type={errors.checkOutDate ? 'error' : 'success'} />}
                {errors.checkOutDate && touched.checkOutDate && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.checkOutDate}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Total Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('guests')}
                />
                {touched.guests && <ValidationIcon type={errors.guests ? 'error' : 'success'} />}
                {errors.guests && touched.guests && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.guests}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={getInputClass('fullName')}
                />
                {touched.fullName && <ValidationIcon type={errors.fullName ? 'error' : 'success'} />}
                {errors.fullName && touched.fullName && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.fullName}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="name@example.com"
                  className={getInputClass('email')}
                />
                {touched.email && <ValidationIcon type={errors.email ? 'error' : 'success'} />}
                {errors.email && touched.email && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="080 000 0000"
                  className={getInputClass('phoneNumber')}
                />
                {touched.phoneNumber && <ValidationIcon type={errors.phoneNumber ? 'error' : 'success'} />}
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="mt-2 text-red-400 text-[11px] font-medium">{errors.phoneNumber}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Additional Requests</label>
                <textarea
                  name="additionalNotes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Airport pickup, specific room temperature, or dietary needs..."
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c9a45c] transition-all resize-none text-sm leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#c9a45c] text-black font-bold tracking-[0.3em] uppercase py-5 hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98] group"
              >
                Book Your Experience
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="mt-6 text-[9px] text-gray-600 text-center uppercase tracking-[0.2em] leading-relaxed">
                By submitting, you agree to our privacy standards. No charges are applied until confirmation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
