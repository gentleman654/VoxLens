"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
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
              <Badge variant="secondary">50 credits remaining</Badge>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome to VoxLens
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Analyze public sentiment on any topic using AI-powered insights
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/analyze">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    New Analysis
                  </CardTitle>
                  <CardDescription>
                    Start analyzing sentiment on any topic
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/history">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Search History
                  </CardTitle>
                  <CardDescription>
                    View your previous analyses
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/saved">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    Saved Searches
                  </CardTitle>
                  <CardDescription>
                    Access your saved analyses
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-slate-500 mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Credits Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 / 50</div>
                <p className="text-xs text-slate-500 mt-1">Free tier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Saved Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-slate-500 mt-1">No limit</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Account Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Free</div>
                <p className="text-xs text-blue-600 mt-1 cursor-pointer hover:underline">
                  Upgrade to Pro
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest sentiment analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold mb-2">No Activity Yet</h3>
                <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-4">
                  Start your first analysis to see your activity here
                </p>
                <Button asChild>
                  <Link href="/analyze">Start Analyzing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
