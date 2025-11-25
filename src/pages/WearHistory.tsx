import { useMemo } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { getWearHistory, getOutfits } from '../utils/storage';

export function WearHistory() {
  const history = getWearHistory();
  const outfits = getOutfits();

  const historyWithOutfits = useMemo(() => {
    return history
      .map(record => {
        const outfit = outfits.find(o => o.id === record.outfitId);
        return outfit ? { ...record, outfit } : null;
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime());
  }, [history, outfits]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wear History</h1>
        <p className="text-gray-600 mt-1">{historyWithOutfits.length} total records</p>
      </div>

      {/* History List */}
      {historyWithOutfits.length === 0 ? (
        <div className="card text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No wear history yet.</p>
          <p className="text-gray-400 mt-2">Start tracking when you wear your outfits!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historyWithOutfits.map((record) => {
            if (!record) return null;
            
            return (
              <div key={record.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  {/* Date Icon */}
                  <div className="flex-shrink-0 bg-primary-100 text-primary-700 rounded-lg p-3">
                    <Calendar className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{record.outfit.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {formatDate(record.date)} at {formatTime(record.date)}
                    </p>
                    {record.outfit.notes && (
                      <p className="text-sm text-gray-500 mt-2">{record.outfit.notes}</p>
                    )}
                  </div>

                  {/* Days ago badge */}
                  <div className="flex-shrink-0">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                      {Math.floor((Date.now() - new Date(record.date).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

