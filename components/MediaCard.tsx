import React from 'react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  return (
    <div 
      className="relative w-full aspect-video cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 group rounded overflow-hidden bg-[#202020]"
      onClick={() => onClick(item)}
    >
      <img 
        src={item.url} 
        alt={item.title} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="text-white text-lg font-bold truncate drop-shadow-md">{item.title}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.genres.slice(0, 3).map((g, i) => (
               <span key={i} className="text-[10px] uppercase font-bold text-gray-200 bg-red-600/80 px-2 py-0.5 rounded">{g}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;