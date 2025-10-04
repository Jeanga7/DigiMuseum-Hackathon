import { QrCode, Map, Image as ImageIcon, Compass, Globe, Volume2, Languages, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ViewMode } from '../types';
import { mockMuseum, mockArtworks } from '../data/mockData';

interface HomePageProps {
  onViewChange: (view: ViewMode) => void;
}

export function HomePage({ onViewChange }: HomePageProps) {
  const { t } = useLanguage();

  const featuredArtworks = mockArtworks.filter(a => a.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
              {t(mockMuseum.name)}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              {t(mockMuseum.description)}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onViewChange('gallery')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2"
              >
                <ImageIcon size={24} />
                <span>Explorer la Galerie</span>
              </button>
              <button
                onClick={() => onViewChange('virtual-tour')}
                className="bg-white hover:bg-gray-100 text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Map size={24} />
                <span>Visite Virtuelle 360°</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={QrCode}
            title="Scannez & Découvrez"
            description="Scannez les QR codes près des œuvres pour accéder à des contenus multimédias enrichis"
            onClick={() => onViewChange('qr-scanner')}
            color="amber"
          />
          <FeatureCard
            icon={Map}
            title="Visite Immersive"
            description="Explorez le musée en 360° depuis chez vous ou préparez votre visite"
            onClick={() => onViewChange('virtual-tour')}
            color="orange"
          />
          <FeatureCard
            icon={Compass}
            title="Parcours Thématiques"
            description="Suivez des parcours guidés adaptés à vos centres d'intérêt"
            onClick={() => onViewChange('tours')}
            color="amber"
          />
        </div>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-8 text-center">Œuvres à la Une</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, idx) => (
              <div
                key={artwork.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all cursor-pointer"
                onClick={() => onViewChange('artwork-detail')}
              >
                <div className="h-64 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                  <ImageIcon size={80} className="text-amber-600 opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{t(artwork.title)}</h3>
                  <p className="text-gray-600 text-sm mb-2">{t(artwork.artist)}</p>
                  <p className="text-gray-500 text-sm line-clamp-3">{t(artwork.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-amber-800 to-amber-900 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Expérience Accessible à Tous</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-8">
            <AccessFeature icon={Languages} text="3 Langues: Français, English, Wolof" />
            <AccessFeature icon={Volume2} text="Audio guides et lecture TTS" />
            <AccessFeature icon={Globe} text="Accessible partout dans le monde" />
            <AccessFeature icon={Users} text="Contenus adaptés pour tous âges" />
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, onClick, color }: {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer border-t-4 border-${color}-500`}
    >
      <div className={`w-16 h-16 bg-${color}-100 rounded-xl flex items-center justify-center mb-4`}>
        <Icon size={32} className={`text-${color}-600`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function AccessFeature({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex flex-col items-center">
      <Icon size={40} className="mb-3" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
