import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import DashboardView from './views/DashboardView';
import UploadView from './views/UploadView';
import HistoryView from './views/HistoryView';
import { ContentItem } from './types';
import { getAllContent } from './services/mongodb';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'history'>('dashboard');
  const [processedItems, setProcessedItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const content = await getAllContent();
      setProcessedItems(content);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleAddContent = async (item: ContentItem) => {
    setProcessedItems(prev => [item, ...prev]);
    setCurrentView('dashboard');
    await loadContent(); // Reload content from database
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && (
        <DashboardView items={processedItems} onAddContent={() => setCurrentView('upload')}/>
      )}
      {currentView === 'upload' && (
        <UploadView onContentProcessed={handleAddContent} />
      )}
      {currentView === 'history' && (
        <HistoryView items={processedItems} />
      )}
    </Layout>
  );
}

export default App;