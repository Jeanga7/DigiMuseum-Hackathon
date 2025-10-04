import { X, Home, Image, Map, Compass, QrCode, Globe } from 'lucide-react';
import { ViewMode, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function MobileMenu({ isOpen, onClose, currentView, onViewChange }: MobileMenuProps) {
  const { language, setLanguage } = useLanguage();

  if (!isOpen) return null;

  const handleNavigation = (view: ViewMode) => {
    onViewChange(view);
    onClose();
  };

  const menuItems = [
    { icon: Home, label: 'Accueil', view: 'home' as ViewMode },
    { icon: Image, label: 'Galerie', view: 'gallery' as ViewMode },
    { icon: Map, label: 'Visite Virtuelle', view: 'virtual-tour' as ViewMode },
    { icon: Compass, label: 'Parcours', view: 'tours' as ViewMode },
    { icon: QrCode, label: 'Scanner QR', view: 'qr-scanner' as ViewMode },
  ];

  const languages = [
    { code: 'fr' as Language, label: 'Français', flag: '🇫🇷' },
    { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
    { code: 'wo' as Language, label: 'Wolof', flag: '🇸🇳' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-amber-600">
          <div>
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <p className="text-sm text-amber-200">MCN Digital</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-amber-600 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;

            return (
              <button
                key={item.view}
                onClick={() => handleNavigation(item.view)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white text-amber-900 shadow-lg font-semibold'
                    : 'text-amber-100 hover:bg-amber-600'
                }`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-amber-600">
          <div className="mb-4">
            <p className="text-sm font-semibold text-amber-200 mb-2 flex items-center space-x-2">
              <Globe size={16} />
              <span>Langue / Language</span>
            </p>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                    language === lang.code
                      ? 'bg-white text-amber-900 font-semibold'
                      : 'bg-amber-800 text-amber-100 hover:bg-amber-700'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
