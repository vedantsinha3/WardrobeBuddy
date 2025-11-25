export type Category = 'top' | 'bottom' | 'jacket' | 'shoes' | 'accessory';
export type Style = 'casual' | 'streetwear' | 'formal' | 'sporty' | 'business' | 'bohemian';
export type Weather = 'hot' | 'cold' | 'mild';

export interface ClothingItem {
  id: string;
  photo: string; // base64 encoded image or URL
  name: string;
  category: Category;
  color: string;
  style: Style;
  weather: Weather;
  notes?: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface Outfit {
  id: string;
  name: string;
  topId?: string;
  bottomId?: string;
  jacketId?: string;
  shoesId?: string;
  accessoryIds: string[];
  notes?: string;
  createdAt: string;
  lastWorn?: string;
}

export interface WearHistory {
  id: string;
  outfitId: string;
  date: string;
}

