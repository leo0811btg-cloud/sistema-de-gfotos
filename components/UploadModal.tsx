import React, { useState, useCallback } from 'react';
import { UploadCloudIcon } from './Icons';
import { MediaItem } from '../types';
import { uploadMedia } from '../services/storageService';

interface UploadViewProps {
  onUploadComplete: (item: MediaItem) => void;
}

const UploadView: React.FC<UploadViewProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const processFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
        alert("Por favor, selecione apenas arquivos de imagem.");
        return;
    }
    
    setIsUploading(true);

    try {
        // Envia para o Supabase (Storage + Banco de Dados)
        const newItem = await uploadMedia(file);
        onUploadComplete(newItem);
    } catch (error) {
        console.error(error);
        alert("Erro ao fazer upload. Verifique as configurações do Supabase (URL e Key) no arquivo services/supabaseClient.ts");
    } finally {
        setIsUploading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [isUploading]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#141414]">
      <div className="w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 text-center drop-shadow-lg">
          Adicionar ao Catálogo
        </h2>

        <div 
          className={`
            relative border-4 border-dashed rounded-xl p-16 flex flex-col items-center justify-center text-center transition-all duration-300 
            ${isDragging 
              ? 'border-[#E50914] bg-[#E50914]/10 scale-105' 
              : 'border-[#333] bg-[#181818] hover:border-gray-500 hover:bg-[#202020]'
            }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onDrop={isUploading ? undefined : onDrop}
          onDragOver={isUploading ? undefined : onDragOver}
          onDragLeave={isUploading ? undefined : onDragLeave}
          onClick={() => !isUploading && document.getElementById('fileInput')?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xl font-bold text-white">Enviando para a nuvem...</p>
            </div>
          ) : (
            <>
                <UploadCloudIcon className={`w-24 h-24 mb-6 ${isDragging ? 'text-[#E50914]' : 'text-gray-400'}`} />
                <p className="text-2xl text-white font-bold mb-3">Arraste sua foto aqui</p>
                <p className="text-gray-400 text-lg mb-8">ou clique para selecionar</p>
                
                <button className="bg-[#E50914] hover:bg-[#b2070f] text-white font-bold py-3 px-8 rounded shadow-lg transition transform hover:scale-105">
                    Selecionar Arquivo
                </button>
            </>
          )}
          
          <input 
            id="fileInput"
            type="file" 
            className="hidden" 
            accept="image/*" 
            disabled={isUploading}
            onChange={handleFileInput} 
          />
        </div>
        
        <p className="text-center text-gray-500 mt-6 text-sm">
            Armazenamento gratuito via Supabase
        </p>
      </div>
    </div>
  );
};

export default UploadView;