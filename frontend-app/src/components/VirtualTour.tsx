import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Info, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockVirtualRooms, mockArtworks } from '../data/mockData';
import { Artwork } from '../types';

interface VirtualTourProps {
  onArtworkSelect: (artwork: Artwork) => void;
}

export function VirtualTour({ onArtworkSelect }: VirtualTourProps) {
  const { t } = useLanguage();
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const currentRoom = mockVirtualRooms[currentRoomIndex];

  const nextRoom = () => {
    setCurrentRoomIndex((prev) => (prev + 1) % mockVirtualRooms.length);
  };

  const prevRoom = () => {
    setCurrentRoomIndex((prev) => (prev - 1 + mockVirtualRooms.length) % mockVirtualRooms.length);
  };

  return (
    <div className="h-screen bg-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${currentRoom.panorama_url})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {currentRoom.hotspots.map((hotspot, idx) => {
          const artwork = mockArtworks.find(a => a.id === hotspot.artwork_id);
          if (!artwork) return null;

          return (
            <button
              key={idx}
              onClick={() => onArtworkSelect(artwork)}
              className="absolute w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-125 transition-all animate-pulse hover:animate-none"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Info size={28} className="text-white" />
            </button>
          );
        })}
      </div>

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-4">
          <h2 className="text-2xl font-bold text-amber-900 text-center">{t(currentRoom.name)}</h2>
          <p className="text-gray-600 text-center text-sm mt-1">Étage {currentRoom.floor_number}</p>
        </div>
      </div>

      {showInfo && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10 max-w-2xl mx-auto px-4">
          <div className="bg-amber-600 text-white rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-2 right-2 text-white hover:bg-amber-700 rounded-full p-1"
            >
              ×
            </button>
            <p className="text-center leading-relaxed">
              {t(currentRoom.description)}
            </p>
            <p className="text-center text-sm mt-3 text-amber-100">
              Cliquez sur les points lumineux pour découvrir les œuvres
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4">
        <button
          onClick={prevRoom}
          className="bg-white bg-opacity-95 hover:bg-opacity-100 rounded-full p-4 shadow-2xl transition-all hover:scale-110"
        >
          <ChevronLeft size={32} className="text-amber-900" />
        </button>

        <div className="bg-white bg-opacity-95 rounded-full px-6 py-3 shadow-2xl flex items-center space-x-4">
          {mockVirtualRooms.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentRoomIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentRoomIndex ? 'bg-amber-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextRoom}
          className="bg-white bg-opacity-95 hover:bg-opacity-100 rounded-full p-4 shadow-2xl transition-all hover:scale-110"
        >
          <ChevronRight size={32} className="text-amber-900" />
        </button>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex flex-col space-y-3">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-white bg-opacity-95 hover:bg-opacity-100 rounded-full p-4 shadow-2xl transition-all hover:scale-110"
          title="Informations"
        >
          <Info size={24} className="text-amber-900" />
        </button>
        <button
          className="bg-white bg-opacity-95 hover:bg-opacity-100 rounded-full p-4 shadow-2xl transition-all hover:scale-110"
          title="Vue panoramique"
        >
          <Maximize size={24} className="text-amber-900" />
        </button>
        <button
          className="bg-white bg-opacity-95 hover:bg-opacity-100 rounded-full p-4 shadow-2xl transition-all hover:scale-110"
          title="Navigation"
        >
          <Navigation size={24} className="text-amber-900" />
        </button>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-4">
          <p className="text-sm text-gray-600 mb-2 font-semibold">Salles disponibles</p>
          <div className="space-y-2">
            {mockVirtualRooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => setCurrentRoomIndex(idx)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  idx === currentRoomIndex
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(room.name)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
