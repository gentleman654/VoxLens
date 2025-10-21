'use client';

import { useState } from 'react';
import { useAnalysisStore } from '@/store/analysis-store';
import { useUserStore } from '@/store/user-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AnalyzePage() {
  return (
    <ProtectedRoute>
      <AnalyzePageContent />
    </ProtectedRoute>
  );
}

function AnalyzePageContent() {
  const [query, setQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');

  const {
    isAnalyzing,
    progress,
    sentimentSummary,
    selectedModel,
    setSelectedModel,
  } = useAnalysisStore();
  const { creditsRemaining } = useUserStore();

  const handleAnalyze = async () => {
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }

    if (creditsRemaining <= 0) {
      alert('No credits remaining! Upgrade to Pro to continue.');
      return;
    }

    // TODO: Implement actual analysis
    alert(`Analyzing: "${query}" - This will be implemented with backend!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VoxLens
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                {creditsRemaining} credits remaining
              </Badge>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">History</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved">Saved</Link>
              </Button>
              <Button variant="ghost" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle>Analyze Public Sentiment</CardTitle>
              <CardDescription>
                Enter any topic to analyze sentiment from recent tweets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="e.g., Climate Change, Taylor Swift, iPhone 16..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="flex-1"
                  disabled={isAnalyzing}
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !query.trim()}
                >
                  {isAnalyzing ? `Analyzing... ${progress}%` : 'Analyze'}
                </Button>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Time range:
                </span>
                <div className="flex gap-2">
                  {['24h', '7d', '30d'].map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                    >
                      {range === '24h'
                        ? 'Last 24 hours'
                        : range === '7d'
                        ? 'Last 7 days'
                        : 'Last 30 days'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Model Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  AI Model:
                </span>
                <div className="flex gap-2">
                  <Button
                    variant={selectedModel === 'vader' ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => setSelectedModel('vader')}
                  >
                    VADER
                  </Button>
                  <Button
                    variant={
                      selectedModel === 'roberta' ? 'outline' : 'default'
                    }
                    size="sm"
                    onClick={() => setSelectedModel('roberta')}
                  >
                    RoBERTa
                  </Button>
                  <Button
                    variant={selectedModel === 'custom' ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => setSelectedModel('custom')}
                  >
                    Custom
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {sentimentSummary ? (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tweets">Tweets</TabsTrigger>
                <TabsTrigger value="emotions">Emotions</TabsTrigger>
                <TabsTrigger value="entities">Entities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Positive
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {sentimentSummary.positive}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Negative
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        {sentimentSummary.negative}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Neutral
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-600">
                        {sentimentSummary.neutral}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Sarcastic
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {sentimentSummary.sarcastic}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Placeholder for charts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center text-slate-400">
                    Chart will be displayed here
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tweets">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Tweets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-400">
                      Tweets will be displayed here in real-time
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emotions">
                <Card>
                  <CardHeader>
                    <CardTitle>Emotion Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center text-slate-400">
                    Emotion breakdown will be displayed here
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="entities">
                <Card>
                  <CardHeader>
                    <CardTitle>Entity Extraction</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center text-slate-400">
                    Mentioned entities will be displayed here
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
                <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
                  Enter a search query above and click &quot;Analyze&quot; to
                  get started with sentiment analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
