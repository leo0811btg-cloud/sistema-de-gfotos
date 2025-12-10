import React from 'react';
import { MediaItem } from '../types';
import MediaCard from './MediaCard';

interface GridProps {
  title: string;
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

const MediaGrid: React.FC<GridProps> = ({ title, items, onItemClick }) => {
  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
      <p className="text-xl">Sua lista está vazia.</p>
      <p className="text-sm">Clique em "Adicionar" para começar.</p>
    </div>
  );

  return (
    <div className="px-4 md:px-12 py-8 animate-fadeIn">
      <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-[#E50914] pl-4">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="w-full">
            <MediaCard item={item} onClick={onItemClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;