import { Menu, Globe, Accessibility, QrCode, Home, Image, Map, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onMenuToggle: () => void;
}

export function Header({ currentView, onViewChange, onMenuToggle }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const { toggleHighContrast, toggleLargeText, toggleTTS, highContrast, largeText, ttsEnabled } = useAccessibility();

  const languages = [
    { code: 'fr' as const, label: 'Français' },
    { code: 'en' as const, label: 'English' },
    { code: 'wo' as const, label: 'Wolof' }
  ];

  return (
    <header className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-amber-600 transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onViewChange('home')}>
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <Compass size={28} className="text-amber-100" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold tracking-tight">MCN</h1>
                <p className="text-xs text-amber-200">Musée des Civilisations Noires</p>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            <NavButton
              icon={Home}
              label="Accueil"
              active={currentView === 'home'}
              onClick={() => onViewChange('home')}
            />
            <NavButton
              icon={Image}
              label="Galerie"
              active={currentView === 'gallery'}
              onClick={() => onViewChange('gallery')}
            />
            <NavButton
              icon={Map}
              label="Visite Virtuelle"
              active={currentView === 'virtual-tour'}
              onClick={() => onViewChange('virtual-tour')}
            />
            <NavButton
              icon={Compass}
              label="Parcours"
              active={currentView === 'tours'}
              onClick={() => onViewChange('tours')}
            />
            <NavButton
              icon={QrCode}
              label="Scanner QR"
              active={currentView === 'qr-scanner'}
              onClick={() => onViewChange('qr-scanner')}
            />
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 bg-amber-900/50 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    language === lang.code
                      ? 'bg-white text-amber-900 shadow-md'
                      : 'text-amber-200 hover:text-white hover:bg-amber-800'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1 bg-amber-900/50 rounded-lg p-1">
              <button
                onClick={toggleHighContrast}
                className={`p-2 rounded transition-colors ${
                  highContrast ? 'bg-white text-amber-900' : 'text-amber-200 hover:bg-amber-800'
                }`}
                title="Contraste élevé"
              >
                <Accessibility size={20} />
              </button>
              <button
                onClick={toggleLargeText}
                className={`p-2 rounded transition-colors text-sm font-bold ${
                  largeText ? 'bg-white text-amber-900' : 'text-amber-200 hover:bg-amber-800'
                }`}
                title="Texte agrandi"
              >
                A+
              </button>
              <button
                onClick={toggleTTS}
                className={`p-2 rounded transition-colors ${
                  ttsEnabled ? 'bg-white text-amber-900' : 'text-amber-200 hover:bg-amber-800'
                }`}
                title="Lecture audio"
              >
                <Globe size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-white text-amber-900 shadow-md font-semibold'
          : 'text-amber-100 hover:bg-amber-600 hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span className="text-sm">{label}</span>
    </button>
  );
}
