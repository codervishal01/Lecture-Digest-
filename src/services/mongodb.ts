import mongoose from 'mongoose';
import { ContentItem, Recommendation } from '../types';

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/learnsync';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const RecommendationSchema = new mongoose.Schema({
  id: String,
  title: String,
  url: String,
  thumbnailUrl: String,
  source: String
});

const ContentSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: String,
  summary: String,
  audioUrl: String,
  recommendations: [RecommendationSchema],
  createdAt: Date,
  thumbnailUrl: String
});

// Create models
const Content = mongoose.model('Content', ContentSchema);

// Service functions
export async function saveContent(content: ContentItem): Promise<ContentItem> {
  const newContent = new Content(content);
  await newContent.save();
  return content;
}

export async function getAllContent(): Promise<ContentItem[]> {
  const contents = await Content.find().sort({ createdAt: -1 });
  return contents;
}

export async function getContentById(id: string): Promise<ContentItem | null> {
  return await Content.findOne({ id });
}