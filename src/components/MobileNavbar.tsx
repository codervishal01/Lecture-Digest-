import { useState } from 'react';
import { Menu, X, Home, Upload, History, BookOpen } from 'lucide-react';

interface MobileNavbarProps {
  currentView: 'dashboard' | 'upload' | 'history';
  onNavigate: (view: 'dashboard' | 'upload' | 'history') => void;
}

const MobileNavbar = ({ currentView, onNavigate }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: Home, view: 'dashboard' as const },
    { name: 'Upload', icon: Upload, view: 'upload' as const },
    { name: 'History', icon: History, view: 'history' as const },
  ];

  const handleNavigation = (view: 'dashboard' | 'upload' | 'history') => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-purple-700" />
          <span className="ml-2 text-xl font-bold text-gray-900">LearnSync</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="bg-white pt-2 pb-3 space-y-1 border-b border-gray-200">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.view)}
              className={`
                ${currentView === item.view ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} 
                block pl-3 pr-4 py-2 text-base font-medium w-full text-left flex items-center
              `}
            >
              <item.icon 
                className={`
                  ${currentView === item.view ? 'text-purple-700' : 'text-gray-400'} 
                  mr-3 flex-shrink-0 h-6 w-6
                `} 
              />
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;