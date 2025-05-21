import { FileUp, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  onAddContent: () => void;
}

const EmptyState = ({ onAddContent }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="bg-purple-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
        <FileUp className="h-10 w-10 text-purple-600" />
      </div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No content yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by uploading lecture notes or adding a video URL.
      </p>
      <div className="mt-6">
        <button
          onClick={onAddContent}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
        >
          Add Content
          <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
