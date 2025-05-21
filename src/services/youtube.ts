import { Recommendation } from '../types';

const API_KEY = 'AIzaSyC8tuaDew7dg_cA1PwDev2Nce3pZs2ynUo';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchYouTubeVideos(query: string): Promise<Recommendation[]> {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&maxResults=8&q=${encodeURIComponent(
        query
      )}&type=video&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      source: 'youtube' as const
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}