import { useState } from 'react';
import { FileText, Youtube, Upload as UploadIcon, Loader2 } from 'lucide-react';
import { ContentItem } from '../types';
import { generateMockData } from '../utils/mockData';

interface UploadViewProps {
  onContentProcessed: (item: ContentItem) => void;
}

const UploadView = ({ onContentProcessed }: UploadViewProps) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'video'>('notes');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!title) {
        setTitle(e.target.files[0].name.split('.')[0]);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setFile(null);
    setVideoUrl('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'notes' && !file) {
      setError('Please upload a file');
      return;
    }

    if (activeTab === 'video' && !videoUrl) {
      setError('Please enter a video URL');
      return;
    }

    if (!title) {
      setError('Please enter a title');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      setTimeout(() => {
        const mockData = generateMockData(
          title,
          activeTab === 'notes' ? 'notes' : 'video',
          activeTab === 'video' ? videoUrl : undefined
        );
        onContentProcessed(mockData);
        setIsProcessing(false);
        resetForm();
      }, 2000);
    } catch (err) {
      setError('An error occurred while processing your content');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Content</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
              activeTab === 'notes'
                ? 'text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            <div className="flex justify-center items-center">
              <FileText className="h-5 w-5 mr-2" />
              <span>Lecture Notes</span>
            </div>
          </button>
          <button
            type="button"
            className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
              activeTab === 'video'
                ? 'text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('video')}
          >
            <div className="flex justify-center items-center">
              <Youtube className="h-5 w-5 mr-2" />
              <span>Video Lecture</span>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter a title for your content"
            />
          </div>

          {activeTab === 'notes' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <label
                  htmlFor="file-upload"
                  className="space-y-1 text-center cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <UploadIcon className="h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-medium text-purple-700 hover:text-purple-800">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, TXT, DOCX up to 10MB</p>
                  </div>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf,.txt,.docx"
                  />
                </label>
              </div>
              {file && (
                <div className="mt-2 flex items-center bg-purple-50 px-3 py-2 rounded">
                  <FileText className="h-5 w-5 text-purple-700" />
                  <span className="ml-2 text-sm text-purple-700 truncate max-w-xs">
                    {file.name}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                type="text"
                id="video-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter YouTube or other video URL"
              />
            </div>
          )}

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={resetForm}
              disabled={isProcessing}
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors duration-200"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Process Content</>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-purple-50 rounded-lg p-5 border border-purple-200">
        <h2 className="text-lg font-medium text-purple-800 mb-2">How it works</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mb-3">
              <span className="text-purple-700 font-bold">1</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Upload</h3>
            <p className="text-sm text-gray-600">
              Upload your lecture notes or input a video URL to begin processing.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mb-3">
              <span className="text-purple-700 font-bold">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Process</h3>
            <p className="text-sm text-gray-600">
              Our AI summarizes content and prepares audio versions of your materials.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mb-3">
              <span className="text-purple-700 font-bold">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Learn</h3>
            <p className="text-sm text-gray-600">
              Access summaries, listen to audio, and explore recommended videos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadView;
