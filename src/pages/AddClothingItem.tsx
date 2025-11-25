import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import { addClothingItem } from '../utils/storage';
import { Category, Style, Weather, ClothingItem } from '../types';

export function AddClothingItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'top' as Category,
    color: '',
    style: 'casual' as Style,
    weather: 'mild' as Weather,
    notes: '',
  });
  const [photo, setPhoto] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhoto(result);
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !photo) {
      alert('Please provide at least a name and photo for the item.');
      return;
    }

    const newItem: ClothingItem = {
      id: Date.now().toString(),
      photo,
      name: formData.name,
      category: formData.category,
      color: formData.color,
      style: formData.style,
      weather: formData.weather,
      notes: formData.notes,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };

    addClothingItem(newItem);
    navigate('/closet');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Clothing Item</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="label">Photo *</label>
            <div className="flex flex-col items-center justify-center w-full">
              {photoPreview ? (
                <div className="relative w-full">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto('');
                      setPhotoPreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="label">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g., Blue Denim Jacket"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              className="input-field"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="jacket">Jacket</option>
              <option value="shoes">Shoes</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="label">Color</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="input-field"
              placeholder="e.g., Blue, Red, Black"
            />
          </div>

          {/* Style */}
          <div>
            <label className="label">Style *</label>
            <select
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value as Style })}
              className="input-field"
            >
              <option value="casual">Casual</option>
              <option value="streetwear">Streetwear</option>
              <option value="formal">Formal</option>
              <option value="sporty">Sporty</option>
              <option value="business">Business</option>
              <option value="bohemian">Bohemian</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="label">Weather Suitability *</label>
            <select
              value={formData.weather}
              onChange={(e) => setFormData({ ...formData, weather: e.target.value as Weather })}
              className="input-field"
            >
              <option value="hot">Hot</option>
              <option value="mild">Mild</option>
              <option value="cold">Cold</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="label">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Any additional notes about this item..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button type="submit" className="btn-primary flex items-center flex-1">
              <Save className="h-5 w-5 mr-2" />
              Save Item
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

