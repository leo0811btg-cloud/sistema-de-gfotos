import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MediaGrid from './components/Row';
import UploadView from './components/UploadModal';
import DetailModal from './components/DetailModal';
import { MediaItem } from './types';
import { getAllMediaItems, clearAllMedia } from './services/storageService';

const App: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'upload' | 'gallery'>('gallery');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Carrega as fotos do Supabase ao abrir o site
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedItems = await getAllMediaItems();
        setItems(storedItems);
      } catch (error) {
        console.error("Erro ao carregar galeria:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUploadComplete = (item: MediaItem) => {
      // O item já foi salvo no Supabase pelo UploadModal
      // Apenas adicionamos ao estado local para mostrar na tela imediatamente
      setItems(prev => [item, ...prev]);
      setSelectedItem(item);
      setView('gallery');
  };

  const handleClearData = async () => {
    if (confirm("ATENÇÃO: Isso apagará todas as fotos do banco de dados do Supabase. Tem certeza?")) {
      try {
        await clearAllMedia();
        setItems([]);
        alert("Galeria limpa com sucesso.");
      } catch (e) {
        alert("Erro ao limpar dados.");
        console.error(e);
      }
    }
  };

  // Se não tiver itens e não estiver carregando, mostra mensagem de boas vindas
  const showEmptyState = !isLoading && items.length === 0 && view === 'gallery';

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans overflow-x-hidden">
      <Navbar currentView={view} setView={setView} onClear={handleClearData} />
      
      <div className="pt-20 pb-12">
        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : view === 'upload' ? (
          <UploadView onUploadComplete={handleUploadComplete} />
        ) : (
          <>
            {showEmptyState ? (
               <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 animate-fadeIn">
                 <h2 className="text-3xl font-bold mb-4">Sua galeria está vazia</h2>
                 <p className="text-gray-400 mb-8 max-w-md">
                   Adicione fotos para criar sua coleção estilo Netflix. Elas ficarão salvas no Supabase.
                 </p>
                 <button 
                   onClick={() => setView('upload')}
                   className="bg-[#E50914] text-white px-8 py-3 rounded font-bold hover:bg-[#b2070f] transition"
                 >
                   Adicionar Primeira Foto
                 </button>
               </div>
            ) : (
              <MediaGrid 
                title="Minha Lista" 
                items={items} 
                onItemClick={setSelectedItem} 
              />
            )}
          </>
        )}
      </div>

      <DetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default App;