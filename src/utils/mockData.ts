import { ContentItem, Recommendation } from '../types';

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock YouTube thumbnails from Pexels
const thumbnails = [
  'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4065183/pexels-photo-4065183.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4498172/pexels-photo-4498172.jpeg?auto=compress&cs=tinysrgb&w=600'
];

// Mock video titles
const videoTitles = [
  'Understanding Advanced Concepts in Machine Learning',
  'Deep Dive into Neural Networks and Deep Learning',
  'Introduction to Data Structures and Algorithms',
  'Comprehensive Guide to Modern Web Development',
  'Quantum Computing: Principles and Applications',
  'The Future of Artificial Intelligence: Ethics and Challenges'
];

// Generate mock recommendations
const generateRecommendations = (title: string): Recommendation[] => {
  const keywords = title.toLowerCase().split(' ');
  
  return Array(6).fill(null).map((_, index) => {
    const randomTitle = videoTitles[Math.floor(Math.random() * videoTitles.length)];
    
    return {
      id: generateId(),
      title: randomTitle,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: thumbnails[index % thumbnails.length],
      source: 'youtube'
    };
  });
};

// Generate mock summaries based on content type
const generateMockSummary = (title: string, type: 'notes' | 'video'): string => {
  if (type === 'notes') {
    return `This lecture covers key concepts in ${title}. Main points include theoretical foundations, practical applications, and recent advancements in the field. The author discusses several case studies and provides examples of how these principles can be applied in real-world scenarios. Key takeaways include methodology frameworks, analytical approaches, and future research directions.`;
  } else {
    return `In this video lecture on ${title}, the presenter explains fundamental principles and advanced techniques. The presentation covers historical context, current state of the art, and potential future developments. Several demonstrations and visual aids are used to illustrate complex concepts. The lecture concludes with a Q&A session addressing common misconceptions and clarifying important details.`;
  }
};

// Generate mock data for a content item
export const generateMockData = (
  title: string, 
  type: 'notes' | 'video',
  videoUrl?: string
): ContentItem => {
  return {
    id: generateId(),
    title,
    type,
    summary: generateMockSummary(title, type),
    recommendations: generateRecommendations(title),
    createdAt: new Date(),
    thumbnailUrl: type === 'video' ? thumbnails[Math.floor(Math.random() * thumbnails.length)] : undefined,
    audioUrl: type === 'notes' ? '/mock-audio.mp3' : undefined
  };
};