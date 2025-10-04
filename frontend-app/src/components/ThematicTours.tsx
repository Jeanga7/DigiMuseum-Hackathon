import { Clock, Target, CheckCircle, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockThematicTours, mockArtworks } from '../data/mockData';
import { ThematicTour } from '../types';

export function ThematicTours() {
  const { t } = useLanguage();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Intermédiaire';
      case 'hard': return 'Avancé';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Parcours Thématiques</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre collection à travers des parcours guidés adaptés à vos centres d'intérêt et votre niveau de connaissance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockThematicTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} getDifficultyColor={getDifficultyColor} getDifficultyLabel={getDifficultyLabel} />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-800 to-orange-800 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Créez Votre Propre Parcours</h2>
          <p className="text-lg mb-6 text-amber-100">
            Personnalisez votre visite en sélectionnant vos œuvres favorites et créez un parcours unique
          </p>
          <button className="bg-white text-amber-900 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors shadow-xl">
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
}

function TourCard({ tour, getDifficultyColor, getDifficultyLabel }: {
  tour: ThematicTour;
  getDifficultyColor: (d: string) => string;
  getDifficultyLabel: (d: string) => string;
}) {
  const { t } = useLanguage();
  const artworkCount = tour.artwork_sequence.length;
  const tourArtworks = mockArtworks.filter(a => tour.artwork_sequence.includes(a.id));

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all cursor-pointer group">
      <div className="relative h-48 bg-gradient-to-br from-amber-300 via-orange-300 to-amber-400 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-3 gap-2 p-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg aspect-square" />
            ))}
          </div>
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:scale-110 transition-transform">
            <Target size={40} className="text-amber-600" />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tour.difficulty)}`}>
            {getDifficultyLabel(tour.difficulty)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">
          {t(tour.name)}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {t(tour.description)}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{tour.duration_minutes} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle size={16} />
            <span>{artworkCount} œuvres</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 font-semibold mb-2">Œuvres incluses:</p>
          <div className="space-y-1">
            {tourArtworks.slice(0, 3).map((artwork) => (
              <div key={artwork.id} className="text-xs text-gray-600 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                <span className="line-clamp-1">{t(artwork.title)}</span>
              </div>
            ))}
            {artworkCount > 3 && (
              <div className="text-xs text-amber-600 font-semibold">
                + {artworkCount - 3} autres œuvres
              </div>
            )}
          </div>
        </div>

        <button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-md">
          <Play size={18} />
          <span>Commencer le parcours</span>
        </button>
      </div>
    </div>
  );
}
