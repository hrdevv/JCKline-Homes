
import React from 'react';
import { Link } from 'react-router-dom';
import { Apartment } from '../types';

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  return (
    <div className="bg-[#141414] border border-white/10 overflow-hidden hover:border-[#c9a45c]/50 transition-all duration-300 flex flex-col h-full group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={apartment.imageUrl}
          alt={apartment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-white border border-white/20">
          Featured
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#c9a45c] transition-colors line-clamp-1">
            {apartment.name}
          </h3>
          <p className="text-[#c9a45c] text-xs font-medium tracking-wide flex items-center gap-1 mt-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {apartment.location}
          </p>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {apartment.description}
        </p>
        <div className="mt-auto">
          <div className="text-white text-sm font-semibold mb-4 bg-white/5 py-2 px-3 border-l-2 border-[#c9a45c]">
            {apartment.priceRange}
            <span className="block text-[10px] font-normal text-gray-500 italic uppercase tracking-wider mt-1">Check for availability</span>
          </div>
          <Link
            to="/inquiry"
            state={{ apartmentName: apartment.name }}
            className="block w-full text-center bg-transparent border border-[#c9a45c] text-[#c9a45c] hover:bg-[#c9a45c] hover:text-black transition-all duration-300 py-3 text-sm font-bold tracking-widest uppercase"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
