import { create } from 'zustand';
import type { Search, Tweet, SentimentSummary } from '@/types';

interface AnalysisState {
  currentSearch: Search | null;
  tweets: Tweet[];
  isAnalyzing: boolean;
  progress: number;
  sentimentSummary: SentimentSummary | null;
  selectedModel: 'vader' | 'roberta' | 'custom';
  setCurrentSearch: (search: Search | null) => void;
  setTweets: (tweets: Tweet[]) => void;
  addTweet: (tweet: Tweet) => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
  setProgress: (progress: number) => void;
  setSentimentSummary: (summary: SentimentSummary | null) => void;
  setSelectedModel: (model: 'vader' | 'roberta' | 'custom') => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  currentSearch: null,
  tweets: [],
  isAnalyzing: false,
  progress: 0,
  sentimentSummary: null,
  selectedModel: 'vader',
  setCurrentSearch: (search) => set({ currentSearch: search }),
  setTweets: (tweets) => set({ tweets }),
  addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setProgress: (progress) => set({ progress }),
  setSentimentSummary: (summary) => set({ sentimentSummary: summary }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  reset: () => set({
    currentSearch: null,
    tweets: [],
    isAnalyzing: false,
    progress: 0,
    sentimentSummary: null,
  }),
}));
