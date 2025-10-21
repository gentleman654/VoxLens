"use client";

import { useState } from "react";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Download,
  Trash2,
  RefreshCw
} from "lucide-react";

// Mock data - will be replaced with API calls
const mockSearchHistory = [
  {
    id: "1",
    query: "Donald Trump",
    createdAt: "2025-10-20T14:30:00Z",
    completedAt: "2025-10-20T14:32:15Z",
    status: "completed",
    totalTweets: 1247,
    sentimentSummary: {
      positive: 35,
      negative: 48,
      neutral: 12,
      sarcastic: 5
    }
  },
  {
    id: "2",
    query: "Climate change policies",
    createdAt: "2025-10-19T09:15:00Z",
    completedAt: "2025-10-19T09:17:45Z",
    status: "completed",
    totalTweets: 892,
    sentimentSummary: {
      positive: 52,
      negative: 28,
      neutral: 15,
      sarcastic: 5
    }
  },
  {
    id: "3",
    query: "Taylor Swift",
    createdAt: "2025-10-18T16:45:00Z",
    completedAt: "2025-10-18T16:48:20Z",
    status: "completed",
    totalTweets: 2134,
    sentimentSummary: {
      positive: 78,
      negative: 12,
      neutral: 8,
      sarcastic: 2
    }
  },
  {
    id: "4",
    query: "Bitcoin price",
    createdAt: "2025-10-17T11:20:00Z",
    completedAt: "2025-10-17T11:22:35Z",
    status: "completed",
    totalTweets: 1563,
    sentimentSummary: {
      positive: 42,
      negative: 38,
      neutral: 18,
      sarcastic: 2
    }
  },
  {
    id: "5",
    query: "AI regulation",
    createdAt: "2025-10-16T08:00:00Z",
    status: "failed",
    totalTweets: 0,
    sentimentSummary: null
  }
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { creditsRemaining } = useUserStore();

  const filteredHistory = mockSearchHistory.filter((search) =>
    search.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getSentimentTrend = (summary: typeof mockSearchHistory[0]["sentimentSummary"]) => {
    if (!summary) return null;
    const { positive, negative } = summary;
    if (positive > negative + 10) return "positive";
    if (negative > positive + 10) return "negative";
    return "neutral";
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete API call
    alert(`Delete search ${id} - Will be implemented with backend!`);
  };

  const handleReanalyze = (query: string) => {
    // TODO: Navigate to analyze page with pre-filled query
    alert(`Re-analyze "${query}" - Will be implemented!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VoxLens
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/analyze" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Analyze
              </Link>
              <Link href="/history" className="text-sm font-medium text-slate-900 dark:text-white border-b-2 border-blue-600">
                History
              </Link>
              <Link href="/saved" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Saved
              </Link>
              <Badge variant="secondary">
                {creditsRemaining} credits
              </Badge>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Search History
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              View and manage your past sentiment analyses
            </p>
          </div>

          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search your history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No searches found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {searchTerm ? "Try a different search term" : "Start analyzing topics to see your history here"}
                  </p>
                  {!searchTerm && (
                    <Button asChild>
                      <Link href="/analyze">Start New Analysis</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredHistory.map((search) => {
                const trend = getSentimentTrend(search.sentimentSummary);
                return (
                  <Card key={search.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">
                              {search.query}
                            </CardTitle>
                            <Badge 
                              variant={
                                search.status === "completed" 
                                  ? "secondary" 
                                  : search.status === "failed" 
                                  ? "destructive" 
                                  : "outline"
                              }
                            >
                              {search.status}
                            </Badge>
                            {trend && (
                              <Badge variant="outline" className="gap-1">
                                {trend === "positive" && (
                                  <>
                                    <TrendingUp className="h-3 w-3 text-green-600" />
                                    <span className="text-green-600">Positive</span>
                                  </>
                                )}
                                {trend === "negative" && (
                                  <>
                                    <TrendingDown className="h-3 w-3 text-red-600" />
                                    <span className="text-red-600">Negative</span>
                                  </>
                                )}
                                {trend === "neutral" && (
                                  <>
                                    <Minus className="h-3 w-3 text-slate-600" />
                                    <span className="text-slate-600">Neutral</span>
                                  </>
                                )}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(search.createdAt)}
                            </span>
                            {search.totalTweets > 0 && (
                              <span>
                                {search.totalTweets.toLocaleString()} tweets analyzed
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {search.status === "completed" && (
                            <>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/analyze?id=${search.id}`}>
                                  View Details
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleReanalyze(search.query)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(search.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {search.sentimentSummary && (
                      <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {search.sentimentSummary.positive}%
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Positive</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                              {search.sentimentSummary.negative}%
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Negative</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-slate-600">
                              {search.sentimentSummary.neutral}%
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Neutral</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {search.sentimentSummary.sarcastic}%
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Sarcastic</div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
