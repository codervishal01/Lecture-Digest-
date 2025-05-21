import { Play, Download, ExternalLink } from 'lucide-react';
import { ContentItem } from '../types';
import EmptyState from '../components/EmptyState';

interface DashboardViewProps {
  items: ContentItem[];
  onAddContent: () => void;
}

const DashboardView = ({ items, onAddContent }: DashboardViewProps) => {
  if (items.length === 0) {
    return <EmptyState onAddContent={onAddContent} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
            {item.thumbnailUrl && (
              <div className="h-40 bg-gray-200">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center mb-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  item.type === 'notes' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {item.type === 'notes' ? 'Notes' : 'Video'}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">{item.summary}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                  <Play className="h-4 w-4 mr-1" />
                  Listen
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Videos</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items[0].recommendations.slice(0, 4).map((rec) => (
              <a 
                key={rec.id} 
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer" 
                className="group bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-36 bg-gray-200">
                  <img 
                    src={rec.thumbnailUrl} 
                    alt={rec.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                    <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
                    {rec.title}
                  </h3>
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      YouTube
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;