import { ClothingItem, Outfit, WearHistory } from '../types';

const STORAGE_KEYS = {
  CLOTHING_ITEMS: 'wardrobe_clothing_items',
  OUTFITS: 'wardrobe_outfits',
  WEAR_HISTORY: 'wardrobe_wear_history',
};

// Clothing Items
export const getClothingItems = (): ClothingItem[] => {
  const items = localStorage.getItem(STORAGE_KEYS.CLOTHING_ITEMS);
  return items ? JSON.parse(items) : [];
};

export const saveClothingItems = (items: ClothingItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.CLOTHING_ITEMS, JSON.stringify(items));
};

export const addClothingItem = (item: ClothingItem): void => {
  const items = getClothingItems();
  items.push(item);
  saveClothingItems(items);
};

export const updateClothingItem = (id: string, updatedItem: ClothingItem): void => {
  const items = getClothingItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = updatedItem;
    saveClothingItems(items);
  }
};

export const deleteClothingItem = (id: string): void => {
  const items = getClothingItems();
  const filtered = items.filter(item => item.id !== id);
  saveClothingItems(filtered);
};

// Outfits
export const getOutfits = (): Outfit[] => {
  const outfits = localStorage.getItem(STORAGE_KEYS.OUTFITS);
  return outfits ? JSON.parse(outfits) : [];
};

export const saveOutfits = (outfits: Outfit[]): void => {
  localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(outfits));
};

export const addOutfit = (outfit: Outfit): void => {
  const outfits = getOutfits();
  outfits.push(outfit);
  saveOutfits(outfits);
};

export const updateOutfit = (id: string, updatedOutfit: Outfit): void => {
  const outfits = getOutfits();
  const index = outfits.findIndex(outfit => outfit.id === id);
  if (index !== -1) {
    outfits[index] = updatedOutfit;
    saveOutfits(outfits);
  }
};

export const deleteOutfit = (id: string): void => {
  const outfits = getOutfits();
  const filtered = outfits.filter(outfit => outfit.id !== id);
  saveOutfits(filtered);
};

// Wear History
export const getWearHistory = (): WearHistory[] => {
  const history = localStorage.getItem(STORAGE_KEYS.WEAR_HISTORY);
  return history ? JSON.parse(history) : [];
};

export const saveWearHistory = (history: WearHistory[]): void => {
  localStorage.setItem(STORAGE_KEYS.WEAR_HISTORY, JSON.stringify(history));
};

export const addWearRecord = (outfitId: string): void => {
  const history = getWearHistory();
  const record: WearHistory = {
    id: Date.now().toString(),
    outfitId,
    date: new Date().toISOString(),
  };
  history.push(record);
  saveWearHistory(history);

  // Update outfit's lastWorn date
  const outfits = getOutfits();
  const outfit = outfits.find(o => o.id === outfitId);
  if (outfit) {
    outfit.lastWorn = record.date;
    saveOutfits(outfits);
  }
};

