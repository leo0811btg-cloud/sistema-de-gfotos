import { createClient } from '@supabase/supabase-js';

// =================================================================
// CONFIGURAÇÃO DO SUPABASE PARA VERCEL
// =================================================================

// Tenta pegar das variáveis de ambiente da Vercel (Vite)
// Se não encontrar, usa as strings de fallback (Substitua se for rodar local sem .env)
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://SUA_URL_AQUI.supabase.co';
const SUPABASE_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'SUA_KEY_AQUI';

if (SUPABASE_URL.includes('SUA_URL_AQUI')) {
  console.warn('⚠️ AVISO: As chaves do Supabase não foram configuradas.');
  console.warn('Configure as Variáveis de Ambiente na Vercel (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY) ou edite o arquivo services/supabaseClient.ts');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);