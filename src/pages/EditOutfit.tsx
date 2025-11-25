import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import { getClothingItems, getOutfits, updateOutfit } from '../utils/storage';
import { ClothingItem } from '../types';

export function EditOutfit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const items = getClothingItems();

  const [outfitName, setOutfitName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTop, setSelectedTop] = useState<string | undefined>();
  const [selectedBottom, setSelectedBottom] = useState<string | undefined>();
  const [selectedJacket, setSelectedJacket] = useState<string | undefined>();
  const [selectedShoes, setSelectedShoes] = useState<string | undefined>();
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  useEffect(() => {
    const outfits = getOutfits();
    const outfit = outfits.find(o => o.id === id);
    if (outfit) {
      setOutfitName(outfit.name);
      setNotes(outfit.notes || '');
      setSelectedTop(outfit.topId);
      setSelectedBottom(outfit.bottomId);
      setSelectedJacket(outfit.jacketId);
      setSelectedShoes(outfit.shoesId);
      setSelectedAccessories(outfit.accessoryIds);
    }
  }, [id]);

  const categorizedItems = useMemo(() => {
    return {
      tops: items.filter(item => item.category === 'top'),
      bottoms: items.filter(item => item.category === 'bottom'),
      jackets: items.filter(item => item.category === 'jacket'),
      shoes: items.filter(item => item.category === 'shoes'),
      accessories: items.filter(item => item.category === 'accessory'),
    };
  }, [items]);

  const getItemById = (id: string | undefined): ClothingItem | undefined => {
    if (!id) return undefined;
    return items.find(item => item.id === id);
  };

  const toggleAccessory = (id: string) => {
    if (selectedAccessories.includes(id)) {
      setSelectedAccessories(selectedAccessories.filter(accId => accId !== id));
    } else {
      setSelectedAccessories([...selectedAccessories, id]);
    }
  };

  const handleSave = () => {
    if (!outfitName) {
      alert('Please provide a name for your outfit.');
      return;
    }

    if (!selectedTop && !selectedBottom) {
      alert('Please select at least a top or bottom for your outfit.');
      return;
    }

    const outfits = getOutfits();
    const existingOutfit = outfits.find(o => o.id === id);

    if (existingOutfit) {
      const updatedOutfit = {
        ...existingOutfit,
        name: outfitName,
        topId: selectedTop,
        bottomId: selectedBottom,
        jacketId: selectedJacket,
        shoesId: selectedShoes,
        accessoryIds: selectedAccessories,
        notes,
      };

      updateOutfit(id!, updatedOutfit);
      navigate('/outfits');
    }
  };

  const ItemSelector = ({ 
    title, 
    items, 
    selectedId, 
    onSelect, 
    optional = false 
  }: { 
    title: string; 
    items: ClothingItem[]; 
    selectedId: string | undefined; 
    onSelect: (id: string | undefined) => void;
    optional?: boolean;
  }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-900">
        {title} {optional && <span className="text-sm text-gray-500">(Optional)</span>}
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No items in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => onSelect(selectedId === item.id ? undefined : item.id)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedId === item.id
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
              {selectedId === item.id && (
                <div className="absolute inset-0 bg-primary-600 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-primary-600 text-white rounded-full p-1">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                {item.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const AccessorySelector = () => (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-gray-900">
        Accessories <span className="text-sm text-gray-500">(Optional, Multiple)</span>
      </h3>
      {categorizedItems.accessories.length === 0 ? (
        <p className="text-sm text-gray-500">No accessories yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categorizedItems.accessories.map(item => (
            <button
              key={item.id}
              onClick={() => toggleAccessory(item.id)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedAccessories.includes(item.id)
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
              {selectedAccessories.includes(item.id) && (
                <div className="absolute inset-0 bg-primary-600 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-primary-600 text-white rounded-full p-1">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                {item.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Edit Outfit</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Outfit Preview */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Outfit Preview</h2>
            
            {/* Outfit Name */}
            <div className="mb-4">
              <label className="label">Outfit Name *</label>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="input-field"
                placeholder="e.g., Casual Friday"
              />
            </div>

            {/* Selected Items Preview */}
            <div className="space-y-3 mb-4">
              {selectedTop && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <img src={getItemById(selectedTop)?.photo} alt="" className="h-12 w-12 object-cover rounded" />
                    <div>
                      <p className="text-xs text-gray-500">Top</p>
                      <p className="text-sm font-medium">{getItemById(selectedTop)?.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTop(undefined)} className="text-gray-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedBottom && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <img src={getItemById(selectedBottom)?.photo} alt="" className="h-12 w-12 object-cover rounded" />
                    <div>
                      <p className="text-xs text-gray-500">Bottom</p>
                      <p className="text-sm font-medium">{getItemById(selectedBottom)?.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedBottom(undefined)} className="text-gray-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedJacket && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <img src={getItemById(selectedJacket)?.photo} alt="" className="h-12 w-12 object-cover rounded" />
                    <div>
                      <p className="text-xs text-gray-500">Jacket</p>
                      <p className="text-sm font-medium">{getItemById(selectedJacket)?.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedJacket(undefined)} className="text-gray-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedShoes && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <img src={getItemById(selectedShoes)?.photo} alt="" className="h-12 w-12 object-cover rounded" />
                    <div>
                      <p className="text-xs text-gray-500">Shoes</p>
                      <p className="text-sm font-medium">{getItemById(selectedShoes)?.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedShoes(undefined)} className="text-gray-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedAccessories.map(accId => {
                const acc = getItemById(accId);
                return acc ? (
                  <div key={accId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <img src={acc.photo} alt="" className="h-12 w-12 object-cover rounded" />
                      <div>
                        <p className="text-xs text-gray-500">Accessory</p>
                        <p className="text-sm font-medium">{acc.name}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleAccessory(accId)} className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="label">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Any notes about this outfit..."
              />
            </div>

            {/* Save Button */}
            <button onClick={handleSave} className="btn-primary w-full flex items-center justify-center">
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Item Selection */}
        <div className="lg:col-span-2 space-y-8">
          <ItemSelector
            title="Choose Top"
            items={categorizedItems.tops}
            selectedId={selectedTop}
            onSelect={setSelectedTop}
          />

          <ItemSelector
            title="Choose Bottom"
            items={categorizedItems.bottoms}
            selectedId={selectedBottom}
            onSelect={setSelectedBottom}
          />

          <ItemSelector
            title="Choose Jacket"
            items={categorizedItems.jackets}
            selectedId={selectedJacket}
            onSelect={setSelectedJacket}
            optional
          />

          <ItemSelector
            title="Choose Shoes"
            items={categorizedItems.shoes}
            selectedId={selectedShoes}
            onSelect={setSelectedShoes}
            optional
          />

          <AccessorySelector />
        </div>
      </div>
    </div>
  );
}

