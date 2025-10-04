export interface MultilingualText {
  fr: string;
  en: string;
  wo: string;
}

export interface Museum {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  location: string;
  coordinates?: { lat: number; lng: number };
  opening_hours?: Record<string, string>;
  contact_info?: Record<string, string>;
}

export interface Collection {
  id: string;
  museum_id: string;
  name: MultilingualText;
  description: MultilingualText;
  display_order: number;
  is_active: boolean;
}

export interface Artwork {
  id: string;
  collection_id: string;
  qr_code: string;
  title: MultilingualText;
  description: MultilingualText;
  artist: MultilingualText;
  period?: string;
  origin?: string;
  materials?: string[];
  dimensions?: Record<string, string>;
  acquisition_date?: string;
  cultural_significance: MultilingualText;
  display_order: number;
  is_featured: boolean;
}

export interface MultimediaContent {
  id: string;
  artwork_id: string;
  type: 'image' | 'audio' | 'video' | '360_image';
  url: string;
  language: 'fr' | 'en' | 'wo' | 'all';
  title?: MultilingualText;
  description?: string;
  duration?: number;
  display_order: number;
}

export interface VirtualRoom {
  id: string;
  museum_id: string;
  name: MultilingualText;
  description: MultilingualText;
  panorama_url: string;
  floor_number: number;
  display_order: number;
  hotspots: Array<{
    artwork_id: string;
    x: number;
    y: number;
    label: MultilingualText;
  }>;
}

export interface ThematicTour {
  id: string;
  museum_id: string;
  name: MultilingualText;
  description: MultilingualText;
  duration_minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  artwork_sequence: string[];
  is_active: boolean;
}

export type Language = 'fr' | 'en' | 'wo';

export type ViewMode = 'home' | 'gallery' | 'virtual-tour' | 'artwork-detail' | 'tours' | 'qr-scanner';
