
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="text-[#c9a45c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Story</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-tight">
          Redefining the standard of serviced living in Abuja.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-start">
        <div className="space-y-8">
          <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-[#c9a45c] pl-8">
            JC Kline Homes was founded on the principle that temporary housing should never feel like a compromise.
          </p>
          <div className="text-gray-400 space-y-6 leading-relaxed">
            <p>
              We specialize in curating high-end serviced apartments that cater to professionals, diplomats, and families seeking more than just a hotel room. Our portfolio consists of properties that reflect our commitment to quality, security, and modern design.
            </p>
            <p>
              By focusing on key locations within Abuja, we ensure our clients are never far from the city's commercial and diplomatic hubs while enjoying the tranquility of a private residence.
            </p>
            <p>
              Our team works tirelessly to maintain the highest standards of hospitality, ensuring that every guest experiences the seamless blend of comfort and functionality that has become synonymous with JC Kline Homes.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://picsum.photos/id/24/500/700" alt="Interior 1" className="w-full aspect-[3/4] object-cover mt-8" />
          <img src="https://picsum.photos/id/25/500/700" alt="Interior 2" className="w-full aspect-[3/4] object-cover" />
        </div>
      </div>
      
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left border-t border-white/10 pt-16">
        <div>
          <h3 className="text-[#c9a45c] text-2xl font-serif mb-4">Vision</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To be the premier choice for luxury serviced accommodation, setting the benchmark for short-stay excellence across the region.
          </p>
        </div>
        <div>
          <h3 className="text-[#c9a45c] text-2xl font-serif mb-4">Mission</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Providing high-quality, fully-integrated living spaces that empower our clients to live and work without interruption.
          </p>
        </div>
        <div>
          <h3 className="text-[#c9a45c] text-2xl font-serif mb-4">Values</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Reliability, Integrity, and Excellence are the cornerstones of every interaction and every apartment in our care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
