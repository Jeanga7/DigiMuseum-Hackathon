import { X, Volume2, Share2, Heart, QrCode, Image as ImageIcon, Play, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Artwork } from '../types';

interface ArtworkDetailProps {
  artwork: Artwork;
  onClose: () => void;
}

export function ArtworkDetail({ artwork, onClose }: ArtworkDetailProps) {
  const { t } = useLanguage();
  const { speak, stopSpeaking } = useAccessibility();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'cultural' | 'technical'>('description');

  const handleShare = () => {
    const shareText = `Découvrez "${t(artwork.title)}" au Musée des Civilisations Noires`;
    const shareUrl = `${window.location.origin}?artwork=${artwork.qr_code}`;

    if (navigator.share) {
      navigator.share({
        title: t(artwork.title),
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Lien copié dans le presse-papier!');
    }
  };

  const handleAudioPlay = () => {
    const fullText = `${t(artwork.title)}. ${t(artwork.artist)}. ${t(artwork.description)}. ${t(artwork.cultural_significance)}`;
    speak(fullText);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-700" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <div className="relative h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl flex items-center justify-center overflow-hidden group">
                  <ImageIcon size={120} className="text-amber-600 opacity-30 group-hover:scale-110 transition-transform" />
                  <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2">
                    <QrCode size={18} />
                    <span>{artwork.qr_code}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                      <ImageIcon size={32} className="text-amber-500 opacity-50" />
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <Play size={20} />
                    <span>Contenu Multimédia</span>
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={handleAudioPlay}
                      className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 flex items-center space-x-3 transition-colors"
                    >
                      <Volume2 size={20} />
                      <span>Audio Guide (3:45)</span>
                    </button>
                    <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 flex items-center space-x-3 transition-colors">
                      <Play size={20} />
                      <span>Vidéo Documentaire (8:12)</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-amber-900 mb-3">
                    {t(artwork.title)}
                  </h1>
                  <p className="text-xl text-gray-700 mb-2">{t(artwork.artist)}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="bg-amber-100 px-3 py-1 rounded-full">{artwork.period}</span>
                    <span className="bg-orange-100 px-3 py-1 rounded-full">{artwork.origin}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isFavorite
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? 'white' : 'none'} />
                    <span>Favoris</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Share2 size={20} />
                    <span>Partager</span>
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <ExternalLink size={20} className="text-gray-700" />
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex space-x-2 mb-4">
                    {[
                      { id: 'description', label: 'Description' },
                      { id: 'cultural', label: 'Signification' },
                      { id: 'technical', label: 'Technique' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="prose max-w-none">
                    {activeTab === 'description' && (
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">{t(artwork.description)}</p>
                      </div>
                    )}

                    {activeTab === 'cultural' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-amber-900">Signification Culturelle</h3>
                        <p className="text-gray-700 leading-relaxed">{t(artwork.cultural_significance)}</p>
                      </div>
                    )}

                    {activeTab === 'technical' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-amber-900">Informations Techniques</h3>
                        <dl className="space-y-2">
                          <div>
                            <dt className="font-semibold text-gray-700">Matériaux</dt>
                            <dd className="text-gray-600">{artwork.materials?.join(', ')}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-gray-700">Origine</dt>
                            <dd className="text-gray-600">{artwork.origin}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-gray-700">Période</dt>
                            <dd className="text-gray-600">{artwork.period}</dd>
                          </div>
                          {artwork.acquisition_date && (
                            <div>
                              <dt className="font-semibold text-gray-700">Date d'acquisition</dt>
                              <dd className="text-gray-600">{artwork.acquisition_date}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
