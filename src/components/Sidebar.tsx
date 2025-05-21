import { Home, Upload, History } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'upload' | 'history';
  onNavigate: (view: 'dashboard' | 'upload' | 'history') => void;
}

const Sidebar = ({ currentView, onNavigate }: SidebarProps) => {
  const navigation = [
    { name: 'Dashboard', icon: Home, view: 'dashboard' as const },
    { name: 'Upload', icon: Upload, view: 'upload' as const },
    { name: 'History', icon: History, view: 'history' as const },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.view)}
                  className={`
                    ${currentView === item.view ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} 
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors duration-200
                  `}
                >
                  <item.icon 
                    className={`
                      ${currentView === item.view ? 'text-purple-700' : 'text-gray-400 group-hover:text-gray-500'} 
                      mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-200
                    `} 
                  />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;