import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Calendar } from 'lucide-react';
import { getOutfits, getClothingItems, deleteOutfit, addWearRecord } from '../utils/storage';
import { useMemo } from 'react';

export function OutfitLibrary() {
  const navigate = useNavigate();
  const outfits = getOutfits();
  const items = getClothingItems();

  const outfitsWithItems = useMemo(() => {
    return outfits.map(outfit => {
      const top = items.find(i => i.id === outfit.topId);
      const bottom = items.find(i => i.id === outfit.bottomId);
      const jacket = items.find(i => i.id === outfit.jacketId);
      const shoes = items.find(i => i.id === outfit.shoesId);
      const accessories = outfit.accessoryIds.map(id => items.find(i => i.id === id)).filter(Boolean);
      
      return {
        ...outfit,
        items: { top, bottom, jacket, shoes, accessories },
      };
    });
  }, [outfits, items]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      deleteOutfit(id);
      window.location.reload();
    }
  };

  const handleWearToday = (id: string) => {
    if (window.confirm('Mark this outfit as worn today?')) {
      addWearRecord(id);
      window.location.reload();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never worn';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Outfits</h1>
          <p className="text-gray-600 mt-1">{outfits.length} saved outfits</p>
        </div>
        <button
          onClick={() => navigate('/outfit-builder')}
          className="btn-primary flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Outfit
        </button>
      </div>

      {/* Outfits Grid */}
      {outfitsWithItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No outfits created yet.</p>
          <button
            onClick={() => navigate('/outfit-builder')}
            className="btn-primary mt-4 inline-flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Your First Outfit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfitsWithItems.map((outfit) => (
            <div key={outfit.id} className="card hover:shadow-lg transition-shadow">
              {/* Outfit Preview Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {outfit.items.top && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={outfit.items.top.photo} alt={outfit.items.top.name} className="w-full h-full object-cover" />
                  </div>
                )}
                {outfit.items.bottom && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={outfit.items.bottom.photo} alt={outfit.items.bottom.name} className="w-full h-full object-cover" />
                  </div>
                )}
                {outfit.items.jacket && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={outfit.items.jacket.photo} alt={outfit.items.jacket.name} className="w-full h-full object-cover" />
                  </div>
                )}
                {outfit.items.shoes && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={outfit.items.shoes.photo} alt={outfit.items.shoes.name} className="w-full h-full object-cover" />
                  </div>
                )}
                {outfit.items.accessories.map((acc, idx) => (
                  acc && (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img src={acc.photo} alt={acc.name} className="w-full h-full object-cover" />
                    </div>
                  )
                ))}
              </div>

              {/* Outfit Info */}
              <h3 className="font-bold text-xl text-gray-900 mb-2">{outfit.name}</h3>
              
              {/* Last Worn */}
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last worn: {formatDate(outfit.lastWorn)}</span>
              </div>

              {/* Items List */}
              <div className="text-sm text-gray-600 mb-3 space-y-1">
                {outfit.items.top && <p>• Top: {outfit.items.top.name}</p>}
                {outfit.items.bottom && <p>• Bottom: {outfit.items.bottom.name}</p>}
                {outfit.items.jacket && <p>• Jacket: {outfit.items.jacket.name}</p>}
                {outfit.items.shoes && <p>• Shoes: {outfit.items.shoes.name}</p>}
                {outfit.items.accessories.length > 0 && (
                  <p>• Accessories: {outfit.items.accessories.map(a => a?.name).join(', ')}</p>
                )}
              </div>

              {/* Notes */}
              {outfit.notes && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{outfit.notes}</p>
              )}

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleWearToday(outfit.id)}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                >
                  Wear
                </button>
                <button
                  onClick={() => navigate(`/edit-outfit/${outfit.id}`)}
                  className="px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(outfit.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

