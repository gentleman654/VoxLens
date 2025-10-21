// Global type definitions for VoxLens

export interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  tier: 'free' | 'pro' | 'admin';
  creditsRemaining: number;
  creditsResetDate: string;
  oauthProvider?: 'google' | 'github';
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Search {
  id: string;
  userId: string;
  query: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalTweets: number;
  sentimentSummary?: SentimentSummary;
  emotionSummary?: EmotionSummary;
  entities?: Entity[];
  createdAt: string;
  completedAt?: string;
}

export interface Tweet {
  id: string;
  searchId: string;
  tweetId: string;
  text: string;
  authorUsername: string;
  authorName: string;
  createdAtTwitter: string;
  retweetCount: number;
  likeCount: number;
  replyCount: number;
  isVerified: boolean;
  location?: string;
  sentiment?: Sentiment;
}

export interface Sentiment {
  id: string;
  tweetId: string;
  modelName: 'vader' | 'roberta' | 'custom';
  sentimentLabel: 'positive' | 'negative' | 'neutral';
  confidenceScore: number;
  isSarcastic: boolean;
  sarcasmScore: number;
  emotions: EmotionScores;
}

export interface SentimentSummary {
  positive: number;
  negative: number;
  neutral: number;
  sarcastic: number;
}

export interface EmotionScores {
  joy: number;
  anger: number;
  fear: number;
  surprise: number;
  sadness: number;
}

export interface EmotionSummary {
  joy: number;
  anger: number;
  fear: number;
  surprise: number;
  sadness: number;
}

export interface Entity {
  text: string;
  type: 'PERSON' | 'ORG' | 'GPE' | 'LOC' | 'EVENT';
  count: number;
}

export interface SavedSearch {
  id: string;
  userId: string;
  query: string;
  alertEnabled: boolean;
  alertThreshold?: number;
  lastChecked?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  searchId: string;
  userId: string;
  format: 'pdf' | 'csv' | 'json';
  fileUrl: string;
  fileSizeKb: number;
  createdAt: string;
  expiresAt: string;
}

export interface AnalysisRequest {
  query: string;
  timeRange?: '24h' | '7d' | '30d';
  maxTweets?: number;
  includeRetweets?: boolean;
  verifiedOnly?: boolean;
}

export interface AnalysisResponse {
  searchId: string;
  status: string;
  message: string;
}

export interface WebSocketMessage {
  type: 'progress' | 'tweet' | 'complete' | 'error';
  data: unknown;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  positive: number;
  negative: number;
  neutral: number;
  sarcastic: number;
}
