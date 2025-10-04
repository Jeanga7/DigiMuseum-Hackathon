import { useState } from 'react';
import { Image as ImageIcon, Play, Volume2, Search, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { mockArtworks, mockCollections } from '../data/mockData';
import { Artwork } from '../types';

interface GalleryViewProps {
  onArtworkSelect: (artwork: Artwork) => void;
}

export function GalleryView({ onArtworkSelect }: GalleryViewProps) {
  const { t } = useLanguage();
  const { speak } = useAccessibility();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtworks = mockArtworks.filter(artwork => {
    const matchesCollection = !selectedCollection || artwork.collection_id === selectedCollection;
    const matchesSearch = !searchQuery ||
      t(artwork.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(artwork.artist).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Galerie en Ligne</h1>
          <p className="text-xl text-gray-600">Explorez notre collection d'œuvres exceptionnelles</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une œuvre, un artiste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCollection || ''}
                onChange={(e) => setSelectedCollection(e.target.value || null)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Toutes les collections</option>
                {mockCollections.map(col => (
                  <option key={col.id} value={col.id}>{t(col.name)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 text-gray-600">
          <p>{filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? 's' : ''} trouvée{filteredArtworks.length > 1 ? 's' : ''}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all cursor-pointer group"
              onClick={() => onArtworkSelect(artwork)}
            >
              <div className="relative h-64 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center overflow-hidden">
                <ImageIcon size={80} className="text-amber-600 opacity-30 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {artwork.qr_code}
                </div>
                {artwork.is_featured && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ À la une
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2 line-clamp-2">
                  {t(artwork.title)}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{t(artwork.artist)}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                  {t(artwork.description)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500 font-medium">{artwork.period}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(t(artwork.title) + '. ' + t(artwork.description));
                      }}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Écouter"
                    >
                      <Volume2 size={18} />
                    </button>
                    <button
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Voir le détail"
                    >
                      <Play size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Aucune œuvre trouvée</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCollection(null);
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 font-semibold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
