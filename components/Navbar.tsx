import React from 'react';
import { PlusIcon, XIcon } from './Icons';

interface NavbarProps {
  currentView: 'upload' | 'gallery';
  setView: (view: 'upload' | 'gallery') => void;
  onClear?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onClear }) => {
  return (
    <nav className="fixed top-0 w-full z-40 bg-[#141414] border-b border-[#333]">
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <h1 
            onClick={() => setView('gallery')}
            className="text-[#E50914] text-3xl font-bold tracking-tighter cursor-pointer"
          >
            NETGALLERY
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setView('upload')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition font-medium ${
              currentView === 'upload' 
                ? 'text-white bg-[#E50914]' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
             <PlusIcon className="w-5 h-5" />
             <span className="hidden sm:block">Adicionar</span>
          </button>

          <button 
             onClick={() => setView('gallery')}
             className={`px-4 py-2 rounded transition font-medium ${
               currentView === 'gallery'
                 ? 'text-white'
                 : 'text-gray-300 hover:text-white'
             }`}
          >
            Minha Lista
          </button>
          
          {onClear && (
            <button 
              onClick={onClear}
              className="text-gray-400 hover:text-red-500 transition text-sm ml-4 border border-gray-700 px-3 py-1 rounded hover:border-red-500"
              title="Apagar todas as fotos salvas"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;