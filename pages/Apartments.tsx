
import React from 'react';
import ApartmentCard from '../components/ApartmentCard';
import { APARTMENTS } from '../constants';

const Apartments: React.FC = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Portfolio</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Curated Living Spaces</h1>
        <p className="text-gray-400 leading-relaxed">
          Explore our range of meticulously maintained apartments. Each unit is selected for its prime location and exceptional build quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {APARTMENTS.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>

      {/* Informational Banner */}
      <div className="mt-24 bg-[#141414] p-10 border border-white/5 text-center">
        <h3 className="text-xl font-serif text-white mb-4">Standard Apartment Features</h3>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> Fully furnished</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> Modern interior</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> Secure environment</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> Reliable power & water</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> High-speed internet</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> Air-conditioned spaces</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c9a45c] rounded-full"></div> Dedicated parking</span>
        </div>
      </div>
    </div>
  );
};

export default Apartments;
