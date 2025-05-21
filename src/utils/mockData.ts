import { ContentItem, Recommendation } from '../types';
import { searchYouTubeVideos } from '../services/youtube';
import { saveContent } from '../services/mongodb';

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Generate mock summaries based on content type
const generateMockSummary = (title: string, type: 'notes' | 'video'): string => {
  if (type === 'notes') {
    return `This lecture covers key concepts in ${title}. Main points include theoretical foundations, practical applications, and recent advancements in the field. The author discusses several case studies and provides examples of how these principles can be applied in real-world scenarios. Key takeaways include methodology frameworks, analytical approaches, and future research directions.`;
  } else {
    return `In this video lecture on ${title}, the presenter explains fundamental principles and advanced techniques. The presentation covers historical context, current state of the art, and potential future developments. Several demonstrations and visual aids are used to illustrate complex concepts. The lecture concludes with a Q&A session addressing common misconceptions and clarifying important details.`;
  }
};

// Generate mock data for a content item
export const generateMockData = async (
  title: string, 
  type: 'notes' | 'video',
  videoUrl?: string
): Promise<ContentItem> => {
  // Fetch real YouTube recommendations based on the title
  const recommendations = await searchYouTubeVideos(title);

  const content: ContentItem = {
    id: generateId(),
    title,
    type,
    summary: generateMockSummary(title, type),
    recommendations,
    createdAt: new Date(),
    thumbnailUrl: type === 'video' && recommendations.length > 0 
      ? recommendations[0].thumbnailUrl 
      : undefined,
    audioUrl: type === 'notes' ? '/mock-audio.mp3' : undefined
  };

  // Save to MongoDB
  await saveContent(content);

  return content;
};