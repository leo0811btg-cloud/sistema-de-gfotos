import { MediaItem } from '../types';
import { supabase } from './supabaseClient';

const BUCKET_NAME = 'images';
const TABLE_NAME = 'media';

// Faz upload da imagem para o Storage e salva os metadados no Banco de Dados
export const uploadMedia = async (file: File): Promise<MediaItem> => {
  try {
    // 1. Upload da Imagem para o Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Erro no upload: ${uploadError.message}`);
    }

    // 2. Pegar a URL pública da imagem
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    // 3. Criar objeto de metadados
    const newItem: Omit<MediaItem, 'id'> = {
      url: publicUrl,
      title: `Foto ${new Date().toLocaleDateString()}`,
      synopsis: `Imagem adicionada à sua coleção em ${new Date().toLocaleString()}.`,
      genres: ["Galeria", "Upload"],
      timestamp: Date.now()
    };

    // 4. Salvar no Banco de Dados (Tabela 'media')
    const { data, error: dbError } = await supabase
      .from(TABLE_NAME)
      .insert([newItem])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Erro ao salvar no banco: ${dbError.message}`);
    }

    // Retorna o item formatado como MediaItem (o ID vem do banco)
    return {
        id: data.id,
        url: data.url,
        title: data.title,
        synopsis: data.synopsis,
        genres: data.genres,
        timestamp: data.timestamp
    };

  } catch (error) {
    console.error("Erro completo no uploadMedia:", error);
    throw error;
  }
};

// Pega todas as fotos do Banco de Dados
export const getAllMediaItems = async (): Promise<MediaItem[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    console.error("Erro ao buscar itens:", error);
    return [];
  }

  return data as MediaItem[];
};

// Apaga uma foto (Opcional - remove do banco, idealmente removeria do storage também)
export const deleteMediaItem = async (id: string): Promise<void> => {
    // Nota: Para uma implementação completa, deveríamos deletar o arquivo do bucket também.
    // Aqui deletamos apenas o registro do banco para simplificar.
    const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);
    
    if (error) throw error;
};

export const clearAllMedia = async (): Promise<void> => {
    // Cuidado: isso apaga o banco todo
    const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all uuids
    
    if (error) throw error;
};