import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-purple-700" />
            <span className="ml-2 text-xl font-bold text-gray-900">Lecture Digest</span>
          </div>
          <div className="flex items-center">
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;