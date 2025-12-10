export interface MediaItem {
  id: string;
  url: string; // Base64 or URL
  title: string;
  synopsis: string;
  genres: string[];
  timestamp: number;
}

export interface GeneratedMetadata {
  title: string;
  synopsis: string;
  genres: string[];
}
