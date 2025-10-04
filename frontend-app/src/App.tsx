import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { GalleryView } from './components/GalleryView';
import { VirtualTour } from './components/VirtualTour';
import { ThematicTours } from './components/ThematicTours';
import { QRScanner } from './components/QRScanner';
import { ArtworkDetail } from './components/ArtworkDetail';
import { MobileMenu } from './components/MobileMenu';
import { ViewMode, Artwork } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleArtworkSelect = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    setSelectedArtwork(null);
  };

  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            currentView={currentView}
            onViewChange={handleViewChange}
            onMenuToggle={() => setIsMobileMenuOpen(true)}
          />

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            currentView={currentView}
            onViewChange={handleViewChange}
          />

          {currentView === 'home' && <HomePage onViewChange={handleViewChange} />}
          {currentView === 'gallery' && <GalleryView onArtworkSelect={handleArtworkSelect} />}
          {currentView === 'virtual-tour' && <VirtualTour onArtworkSelect={handleArtworkSelect} />}
          {currentView === 'tours' && <ThematicTours />}
          {currentView === 'qr-scanner' && <QRScanner onArtworkFound={handleArtworkSelect} />}

          {selectedArtwork && (
            <ArtworkDetail
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
            />
          )}
        </div>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
