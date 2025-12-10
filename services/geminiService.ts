import { GeneratedMetadata } from "../types";

// Serviço desativado conforme solicitação do usuário.
// Mantido apenas para compatibilidade de tipos, caso seja reativado no futuro.

export const analyzeImage = async (base64Data: string, mimeType: string): Promise<GeneratedMetadata> => {
  // Retorna metadados padrão instantaneamente sem chamar API
  return {
    title: "Foto da Galeria",
    synopsis: "Imagem enviada pelo usuário.",
    genres: ["Upload", "Galeria"]
  };
};