import React from 'react';
import Navbar from './components/Navbar';
import { PlusIcon, PlayIcon } from './components/Icons';

const App: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans overflow-hidden relative">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen w-full flex items-center">
        
        {/* Background - Simulating a cover image */}
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/63JJG3DD/IMG-3624.jpg')] bg-cover bg-center">
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-12 w-full max-w-3xl mt-20 animate-fadeIn">
          <div className="flex items-center space-x-2 text-gray-300 font-bold tracking-widest text-sm mb-4 uppercase">
            <span className="text-[#E50914]">Nossa História</span>
            <span>•</span>
            <span>Momentos</span>
            <span>•</span>
            <span>Memórias</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            Bem-vindos à <br/> Nossa Galeria
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 font-medium max-w-xl drop-shadow-md leading-relaxed">
            Compartilhe seus registros favoritos conosco. Cada foto conta uma parte da nossa história e queremos guardar todas com carinho.
          </p>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Botão transformado em Link Direto para garantir o funcionamento */}
            <a 
              href="https://forms.gle/heHDuKyCJaBHGtBXA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#E50914] hover:bg-[#b2070f] text-white text-xl px-8 py-4 rounded font-bold transition transform hover:scale-105 shadow-lg"
            >
              <PlusIcon className="w-6 h-6 mr-3" />
              Adicionar Foto
            </a>

            <button 
              className="flex items-center justify-center bg-gray-600/60 hover:bg-gray-600/40 text-white text-xl px-8 py-4 rounded font-bold transition backdrop-blur-sm"
              onClick={() => alert("Em breve, nossa história completa aqui.")}
            >
              <PlayIcon className="w-6 h-6 mr-3" />
              Saiba Mais
            </button>
          </div>
          
          <p className="mt-8 text-gray-500 text-sm font-semibold">
            * Ao clicar, você será redirecionado para o formulário de envio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;