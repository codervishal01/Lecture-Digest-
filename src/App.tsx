import { useState } from 'react';
import { Layout } from './components/Layout';
import DashboardView from './views/DashboardView';
import UploadView from './views/UploadView';
import HistoryView from './views/HistoryView';
import { ContentItem } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'history'>('dashboard');
  const [processedItems, setProcessedItems] = useState<ContentItem[]>([]);

  const handleAddContent = (item: ContentItem) => {
    setProcessedItems(prev => [item, ...prev]);
    setCurrentView('dashboard');
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