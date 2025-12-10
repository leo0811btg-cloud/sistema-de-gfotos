import React from 'react';
import { MediaItem } from '../types';
import { PlayIcon, InfoIcon } from './Icons';

interface HeroProps {
  item: MediaItem;
  onMoreInfo: () => void;
}

const Hero: React.FC<HeroProps> = ({ item, onMoreInfo }) => {
  return (
    <div className="relative h-[56.25vw] md:h-[80vh] w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={item.url} 
          alt={item.title} 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradients to blend into navbar and content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute top-[30%] md:top-[35%] left-4 md:left-12 max-w-2xl z-10">
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4 md:mb-6 tracking-tight leading-tight">
          {item.title}
        </h1>
        <p className="text-white text-base md:text-xl drop-shadow-md mb-8 w-[90%] md:w-full font-medium line-clamp-3">
          {item.synopsis}
        </p>
        
        <div className="flex space-x-3">
          <button className="flex items-center justify-center bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-80 transition">
            <PlayIcon className="w-5 h-5 md:w-7 md:h-7 mr-2" />
            Play
          </button>
          <button 
            onClick={onMoreInfo}
            className="flex items-center justify-center bg-[gray]/60 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-[gray]/40 transition"
          >
            <InfoIcon className="w-5 h-5 md:w-7 md:h-7 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
