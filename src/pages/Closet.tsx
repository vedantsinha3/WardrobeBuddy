import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Heart, Edit, PlusCircle } from 'lucide-react';
import { getClothingItems, updateClothingItem } from '../utils/storage';
import { ClothingItem, Category, Style, Weather } from '../types';

export function Closet() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const items = getClothingItems();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  );
  const [styleFilter, setStyleFilter] = useState<Style | 'all'>("all");
  const [weatherFilter, setWeatherFilter] = useState<Weather | 'all'>(
    (searchParams.get('weather') as Weather) || 'all'
  );
  const [colorFilter, setColorFilter] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStyle = styleFilter === 'all' || item.style === styleFilter;
      const matchesWeather = weatherFilter === 'all' || item.weather === weatherFilter;
      const matchesColor = !colorFilter || item.color.toLowerCase().includes(colorFilter.toLowerCase());
      const matchesFavorite = !showFavoritesOnly || item.isFavorite;

      return matchesSearch && matchesCategory && matchesStyle && matchesWeather && matchesColor && matchesFavorite;
    });
  }, [items, searchQuery, categoryFilter, styleFilter, weatherFilter, colorFilter, showFavoritesOnly]);

  const toggleFavorite = (item: ClothingItem) => {
    const updatedItem = { ...item, isFavorite: !item.isFavorite };
    updateClothingItem(item.id, updatedItem);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Closet</h1>
          <p className="text-gray-600 mt-1">{filteredItems.length} items</p>
        </div>
        <button
          onClick={() => navigate('/add-item')}
          className="btn-primary flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="card">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="input-field pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <Filter className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className="label">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  <option value="top">Tops</option>
                  <option value="bottom">Bottoms</option>
                  <option value="jacket">Jackets</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessory">Accessories</option>
                </select>
              </div>

              {/* Style Filter */}
              <div>
                <label className="label">Style</label>
                <select
                  value={styleFilter}
                  onChange={(e) => setStyleFilter(e.target.value as Style | 'all')}
                  className="input-field"
                >
                  <option value="all">All Styles</option>
                  <option value="casual">Casual</option>
                  <option value="streetwear">Streetwear</option>
                  <option value="formal">Formal</option>
                  <option value="sporty">Sporty</option>
                  <option value="business">Business</option>
                  <option value="bohemian">Bohemian</option>
                </select>
              </div>

              {/* Weather Filter */}
              <div>
                <label className="label">Weather</label>
                <select
                  value={weatherFilter}
                  onChange={(e) => setWeatherFilter(e.target.value as Weather | 'all')}
                  className="input-field"
                >
                  <option value="all">All Weather</option>
                  <option value="hot">Hot</option>
                  <option value="mild">Mild</option>
                  <option value="cold">Cold</option>
                </select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="label">Color</label>
                <input
                  type="text"
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  placeholder="e.g., blue"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Favorites Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="favorites"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="favorites" className="ml-2 text-sm font-medium text-gray-700">
              Show Favorites Only
            </label>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found. Try adjusting your filters or add new items.</p>
          <button
            onClick={() => navigate('/add-item')}
            className="btn-primary mt-4 inline-flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="card hover:shadow-lg transition-shadow group relative">
              {/* Image */}
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                {/* Edit Button (appears on hover) */}
                <button
                  onClick={() => navigate(`/edit-item/${item.id}`)}
                  className="absolute bottom-2 right-2 p-2 bg-primary-600 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              {/* Info */}
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
                  {item.category}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                  {item.style}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  {item.weather}
                </span>
              </div>
              {item.color && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Color:</span> {item.color}
                </p>
              )}
              {item.notes && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

