import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';

interface LayoutProps {
  children: ReactNode;
  currentView: 'dashboard' | 'upload' | 'history';
  onNavigate: (view: 'dashboard' | 'upload' | 'history') => void;
}

export const Layout = ({ children, currentView, onNavigate }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <MobileNavbar currentView={currentView} onNavigate={onNavigate} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onNavigate={onNavigate} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        <p>Lecture Digest © {new Date().getFullYear()} - Digest without Indigestion</p>
      </footer>
    </div>
  );
};