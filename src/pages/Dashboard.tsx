import { useNavigate } from 'react-router-dom';
import { PlusCircle, Sparkles, ShirtIcon, PackageOpen, Footprints, Palette } from 'lucide-react';
import { getClothingItems, getOutfits } from '../utils/storage';
import { useMemo } from 'react';

export function Dashboard() {
  const navigate = useNavigate();
  const items = getClothingItems();
  const outfits = getOutfits();

  const stats = useMemo(() => {
    const categoryCounts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const weatherCounts = items.reduce((acc, item) => {
      acc[item.weather] = (acc[item.weather] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: items.length,
      outfits: outfits.length,
      categories: categoryCounts,
      weather: weatherCounts,
    };
  }, [items, outfits]);

  const quickFilters = [
    { label: 'Tops', path: '/closet?category=top', icon: ShirtIcon },
    { label: 'Bottoms', path: '/closet?category=bottom', icon: PackageOpen },
    { label: 'Jackets', path: '/closet?category=jacket', icon: Palette },
    { label: 'Shoes', path: '/closet?category=shoes', icon: Footprints },
    { label: 'Hot Weather', path: '/closet?weather=hot', icon: '☀️' },
    { label: 'Cold Weather', path: '/closet?weather=cold', icon: '❄️' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to Your Wardrobe
        </h1>
        <p className="text-lg text-gray-600">
          Organize your style, one outfit at a time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm font-medium">Total Items</p>
              <p className="text-4xl font-bold mt-2">{stats.total}</p>
            </div>
            <ShirtIcon className="h-12 w-12 text-primary-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Outfits</p>
              <p className="text-4xl font-bold mt-2">{stats.outfits}</p>
            </div>
            <Sparkles className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Tops</p>
              <p className="text-4xl font-bold mt-2">{stats.categories.top || 0}</p>
            </div>
            <ShirtIcon className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Bottoms</p>
              <p className="text-4xl font-bold mt-2">{stats.categories.bottom || 0}</p>
            </div>
            <PackageOpen className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/add-item')}
            className="flex items-center justify-center space-x-3 p-6 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors border-2 border-primary-200 hover:border-primary-300"
          >
            <PlusCircle className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-semibold text-primary-700">Add New Item</span>
          </button>

          <button
            onClick={() => navigate('/outfit-builder')}
            className="flex items-center justify-center space-x-3 p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border-2 border-purple-200 hover:border-purple-300"
          >
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-semibold text-purple-700">Create Outfit</span>
          </button>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wardrobe Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-primary-600">{stats.categories.top || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Tops</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-primary-600">{stats.categories.bottom || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Bottoms</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-primary-600">{stats.categories.jacket || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Jackets</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-primary-600">{stats.categories.shoes || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Shoes</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-primary-600">{stats.categories.accessory || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Accessories</p>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-3">
          {quickFilters.map((filter) => {
            const Icon = typeof filter.icon === 'string' ? null : filter.icon;
            return (
              <button
                key={filter.label}
                onClick={() => navigate(filter.path)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-700 font-medium"
              >
                {Icon ? <Icon className="h-4 w-4" /> : <span>{filter.icon}</span>}
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

