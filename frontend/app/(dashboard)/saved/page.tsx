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
  Star,
  Bell,
  BellOff,
  Play,
  Trash2,
  Plus
} from "lucide-react";

// Mock data - will be replaced with API calls
const mockSavedSearches = [
  {
    id: "1",
    query: "Elon Musk",
    createdAt: "2025-10-15T10:00:00Z",
    lastChecked: "2025-10-20T14:30:00Z",
    alertEnabled: true,
    alertThreshold: 20,
    analysisCoun: 12
  },
  {
    id: "2",
    query: "OpenAI",
    createdAt: "2025-10-10T08:00:00Z",
    lastChecked: "2025-10-19T09:15:00Z",
    alertEnabled: true,
    alertThreshold: 15,
    analysisCount: 8
  },
  {
    id: "3",
    query: "Climate action",
    createdAt: "2025-10-05T14:30:00Z",
    lastChecked: "2025-10-18T16:45:00Z",
    alertEnabled: false,
    alertThreshold: null,
    analysisCount: 5
  },
  {
    id: "4",
    query: "Cryptocurrency",
    createdAt: "2025-09-28T12:00:00Z",
    lastChecked: "2025-10-17T11:20:00Z",
    alertEnabled: true,
    alertThreshold: 25,
    analysisCount: 15
  }
];

export default function SavedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewSavedDialog, setShowNewSavedDialog] = useState(false);
  const { creditsRemaining } = useUserStore();

  const filteredSaved = mockSavedSearches.filter((search) =>
    search.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleToggleAlert = (id: string, currentState: boolean) => {
    // TODO: Implement toggle alert API call
    alert(`${currentState ? "Disable" : "Enable"} alert for search ${id} - Will be implemented with backend!`);
  };

  const handleRunAnalysis = (query: string) => {
    // TODO: Navigate to analyze page with pre-filled query
    alert(`Run analysis for "${query}" - Will be implemented!`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete API call
    alert(`Delete saved search ${id} - Will be implemented with backend!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VoxLens
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/analyze" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Analyze
              </Link>
              <Link href="/history" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                History
              </Link>
              <Link href="/saved" className="text-sm font-medium text-slate-900 dark:text-white border-b-2 border-blue-600">
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Saved Searches
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor topics and set up alerts for sentiment changes
              </p>
            </div>
            <Button onClick={() => setShowNewSavedDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Save New Search
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search saved queries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Searches List */}
          <div className="space-y-4">
            {filteredSaved.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Star className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No saved searches
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {searchTerm ? "Try a different search term" : "Save searches to monitor topics and track sentiment over time"}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setShowNewSavedDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Save Your First Search
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredSaved.map((search) => (
                <Card key={search.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <CardTitle className="text-xl">
                            {search.query}
                          </CardTitle>
                          {search.alertEnabled && (
                            <Badge variant="outline" className="gap-1">
                              <Bell className="h-3 w-3" />
                              Alert On
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <span className="text-xs text-slate-500">Created:</span>{" "}
                            <span className="text-sm">{formatDate(search.createdAt)}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500">Last checked:</span>{" "}
                            <span className="text-sm">{formatDate(search.lastChecked)}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500">Total analyses:</span>{" "}
                            <span className="text-sm font-semibold">{search.analysisCount}</span>
                          </div>
                          {search.alertThreshold && (
                            <div>
                              <span className="text-xs text-slate-500">Alert threshold:</span>{" "}
                              <span className="text-sm font-semibold">±{search.alertThreshold}%</span>
                            </div>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRunAnalysis(search.query)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Run Analysis
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleAlert(search.id, search.alertEnabled)}
                        >
                          {search.alertEnabled ? (
                            <BellOff className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(search.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Monitoring this topic for sentiment changes
                        </span>
                        <Button variant="link" size="sm" asChild>
                          <Link href={`/history?query=${encodeURIComponent(search.query)}`}>
                            View History
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pro Tip */}
          <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Set up sentiment alerts
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Enable alerts on your saved searches to get notified when sentiment changes by your threshold percentage. 
                    Perfect for monitoring brand reputation, political topics, or trending events.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
