import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">VoxLens</h1>
        <p className="text-lg text-slate-600 mb-8">Real-Time Sentiment Analysis Platform</p>
        <Button asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
