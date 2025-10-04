import { useState } from 'react';
import { QrCode, Search, Camera, AlertCircle } from 'lucide-react';
import { mockArtworks } from '../data/mockData';
import { Artwork } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface QRScannerProps {
  onArtworkFound: (artwork: Artwork) => void;
}

export function QRScanner({ onArtworkFound }: QRScannerProps) {
  const { t } = useLanguage();
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleSearch = () => {
    setError('');
    const artwork = mockArtworks.find(a => a.qr_code === qrCode.toUpperCase());

    if (artwork) {
      onArtworkFound(artwork);
    } else {
      setError('Aucune œuvre trouvée avec ce code QR. Veuillez vérifier et réessayer.');
    }
  };

  const handleQuickAccess = (code: string) => {
    const artwork = mockArtworks.find(a => a.qr_code === code);
    if (artwork) {
      onArtworkFound(artwork);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const randomArtwork = mockArtworks[Math.floor(Math.random() * mockArtworks.length)];
      onArtworkFound(randomArtwork);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-amber-600 rounded-2xl mb-4">
            <QrCode size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Scanner QR Code</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scannez les QR codes près des œuvres pour accéder instantanément à des contenus enrichis
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {isScanning ? (
            <div className="text-center py-12">
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-amber-600 rounded-2xl animate-pulse" />
                <div className="absolute inset-4 border-4 border-amber-400 rounded-2xl animate-pulse delay-75" />
                <div className="absolute inset-8 border-4 border-amber-200 rounded-2xl animate-pulse delay-150" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={64} className="text-amber-600" />
                </div>
              </div>
              <p className="text-xl font-semibold text-amber-900">Scan en cours...</p>
              <p className="text-gray-600 mt-2">Positionnez le QR code dans le cadre</p>
            </div>
          ) : (
            <>
              <button
                onClick={startScanning}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 shadow-xl transform hover:scale-105 transition-all mb-6"
              >
                <Camera size={28} />
                <span>Activer la Caméra</span>
              </button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">OU</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Entrer le code manuellement
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Ex: MCN001"
                      value={qrCode}
                      onChange={(e) => {
                        setQrCode(e.target.value);
                        setError('');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg font-mono"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-md"
                  >
                    Rechercher
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Accès Rapide</h2>
          <p className="text-gray-700 mb-6">
            Découvrez nos œuvres phares en un clic
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockArtworks.filter(a => a.is_featured).map((artwork) => (
              <button
                key={artwork.id}
                onClick={() => handleQuickAccess(artwork.qr_code)}
                className="bg-white hover:bg-amber-50 rounded-xl p-4 text-left transition-all transform hover:scale-105 shadow-md"
              >
                <div className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
                  {artwork.qr_code}
                </div>
                <h3 className="font-semibold text-amber-900 text-sm line-clamp-2">
                  {t(artwork.title)}
                </h3>
                <p className="text-gray-600 text-xs mt-1">{t(artwork.artist)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
            <AlertCircle size={20} className="text-amber-600" />
            <span>Comment utiliser le scanner QR?</span>
          </h3>
          <ol className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start space-x-2">
              <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
              <span>Repérez le QR code près de l'œuvre qui vous intéresse</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
              <span>Cliquez sur "Activer la Caméra" et autorisez l'accès à votre appareil photo</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
              <span>Positionnez le QR code dans le cadre pour un scan automatique</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
              <span>Découvrez instantanément les détails, audios et vidéos de l'œuvre</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
