export interface ContentItem {
  id: string;
  title: string;
  type: 'notes' | 'video';
  summary: string;
  audioUrl?: string;
  recommendations: Recommendation[];
  createdAt: Date;
  thumbnailUrl?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  source: 'youtube' | 'other';
}