import React from 'react';
import { MediaItem } from '../types';
import { PlayIcon, PlusIcon, XIcon } from './Icons';

interface DetailModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="relative bg-[#181818] w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden animate-fadeIn border border-[#333]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#181818]/80 p-2 rounded-full hover:bg-[#2a2a2a] transition"
        >
          <XIcon className="w-6 h-6 text-white" />
        </button>

        <div className="relative aspect-video w-full">
           <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
           
           <div className="absolute bottom-8 left-8 right-8">
             <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">{item.title}</h2>
             <div className="flex items-center space-x-4">
               <button className="flex items-center bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition">
                 <PlayIcon className="w-6 h-6 mr-2" />
                 Assistir
               </button>
               <button className="flex items-center bg-[#333]/80 text-white px-6 py-2 rounded font-bold hover:bg-[#333] transition border border-gray-500">
                 <PlusIcon className="w-6 h-6 mr-2" />
                 Minha Lista
               </button>
             </div>
           </div>
        </div>

        <div className="px-8 py-6 grid md:grid-cols-3 gap-8 text-white">
          <div className="md:col-span-2 space-y-4">
             <div className="flex items-center space-x-3 text-sm font-semibold text-green-400">
                <span>98% Relevante</span>
                <span className="text-gray-400">2025</span>
                <span className="border border-gray-600 px-1 text-xs text-gray-300 rounded">4K</span>
             </div>
             <p className="text-lg leading-relaxed text-gray-200">
               {item.synopsis}
             </p>
          </div>
          <div className="text-sm space-y-4">
            <div>
              <span className="text-gray-500 block mb-1">Gêneros:</span>
              <div className="flex flex-wrap gap-2">
                {item.genres.map(g => (
                  <span key={g} className="text-gray-300 bg-[#333] px-2 py-1 rounded text-xs">{g}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Qualidade:</span> <span className="text-gray-300 ml-1">Ultra HD</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailModal;