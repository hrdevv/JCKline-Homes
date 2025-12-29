
import React from 'react';
import { Link } from 'react-router-dom';
import ApartmentCard from '../components/ApartmentCard';
import { APARTMENTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/id/122/1920/1080"
            alt="Premium Interior"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Welcome to JC Kline Homes
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Sophisticated serviced living for the discerning traveler.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            We provide premium, fully-furnished apartment solutions in Abuja, solving the need for reliable, secure, and upscale temporary housing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/inquiry"
              className="px-10 py-4 bg-[#c9a45c] text-black font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 w-full sm:w-auto"
            >
              Check Availability
            </Link>
            <Link
              to="/apartments"
              className="px-10 py-4 border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              View Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Apartments Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Apartments</h2>
            <div className="h-1 w-20 bg-[#c9a45c]"></div>
          </div>
          <Link to="/apartments" className="text-[#c9a45c] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase border-b border-[#c9a45c] pb-1">
            View All Listings
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APARTMENTS.slice(0, 3).map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Exceptional Standards as Routine</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                At JC Kline Homes, we don't just provide a space; we provide an experience. Every apartment is curated to ensure that functionality meets aesthetics, offering you a sanctuary in the heart of the city.
              </p>
              <ul className="space-y-4">
                {[
                  'Secure and private environment',
                  'High-speed internet throughout',
                  'Reliable power and water supply',
                  'Dedicated professional management'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-[#c9a45c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src="https://picsum.photos/id/201/800/600" alt="Interior" className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-[#c9a45c]/10 -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
