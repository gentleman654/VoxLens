import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              🚀 Real-Time Sentiment Analysis Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Analyze Public Sentiment on{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Any Topic
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Powered by AI and real-time Twitter data. Get instant sentiment
              analysis, emotion detection, and sarcasm identification for any
              search query.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/signup">Try Free - 50 Searches/Month</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="#features">See Features</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  3+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  AI Models
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  5+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Emotions Detected
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  Real-Time
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Analysis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Analysis Features
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to understand public opinion on any topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Multi-Model AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compare results from VADER, RoBERTa, and custom models to get
                  the most accurate sentiment analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">😏</span>
                  Sarcasm Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced NLP identifies sarcastic tweets that traditional
                  sentiment analysis might miss.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">❤️</span>
                  Emotion Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Detect joy, anger, fear, surprise, and sadness with confidence
                  scores for each emotion.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Real-Time Streaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Watch tweets stream in live via WebSocket with instant
                  sentiment classification.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏷️</span>
                  Entity Extraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically identify people, places, and organizations
                  mentioned in tweets.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  Interactive Charts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Beautiful visualizations including pie charts, timelines, word
                  clouds, and more.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get insights in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Enter Your Topic
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Type any search query - person, policy, brand, event, or trend
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                AI Analyzes Data
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We fetch recent tweets and run multiple AI models for analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Get Instant Insights
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                View sentiment breakdown, emotions, entities, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Perfect For Any Topic
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Analyze sentiment on anything from politics to products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { emoji: '🗳️', label: 'Politics & Elections' },
              { emoji: '📱', label: 'Product Launches' },
              { emoji: '🎬', label: 'Entertainment' },
              { emoji: '💼', label: 'Brand Reputation' },
              { emoji: '⚽', label: 'Sports Events' },
              { emoji: '🌍', label: 'World Events' },
              { emoji: '💡', label: 'Tech Trends' },
              { emoji: '📰', label: 'Breaking News' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 text-center border border-slate-200 dark:border-slate-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Analyze Public Sentiment?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start with 50 free searches per month. No credit card required.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">VoxLens</h3>
              <p className="text-sm">
                Real-time sentiment analysis powered by AI and Twitter data.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2025 VoxLens. Built with AI-assisted coding for portfolio
              demonstration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
