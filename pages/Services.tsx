
import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-20">
        <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Core Services</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">What We Offer</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          JC Kline Homes provides a holistic hospitality experience designed for guests who value independence and privacy without compromising on quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#141414] p-12 border border-white/10">
          <div className="w-12 h-12 bg-[#c9a45c]/10 flex items-center justify-center mb-8">
            <svg className="w-6 h-6 text-[#c9a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-white mb-6">Premium Serviced Apartments</h3>
          <p className="text-gray-400 leading-relaxed">
            Our primary offering is the provision of fully-equipped, move-in ready apartments. Each unit undergoes a rigorous inspection and staging process to ensure it meets our high standards for modern living.
          </p>
        </div>

        <div className="bg-[#141414] p-12 border border-white/10">
          <div className="w-12 h-12 bg-[#c9a45c]/10 flex items-center justify-center mb-8">
            <svg className="w-6 h-6 text-[#c9a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-white mb-6">Property Management & Security</h3>
          <p className="text-gray-400 leading-relaxed">
            We handle all aspects of property maintenance and security infrastructure. From 24/7 power backup systems to physical security and high-speed network management, we ensure a seamless stay.
          </p>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center">
        <div className="max-w-4xl bg-gradient-to-r from-[#c9a45c]/10 to-transparent p-12 border-l-4 border-[#c9a45c]">
          <h3 className="text-xl font-bold text-white mb-4 italic uppercase tracking-widest">Our Promise</h3>
          <p className="text-gray-300 leading-loose">
            JC Kline Homes focuses on providing high-quality, fully-integrated living spaces. Whether you are staying for a week or several months, our focus remains on providing a reliable, secure, and professional environment. We handle the complexities of utilities and maintenance so you can focus on what matters most to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
