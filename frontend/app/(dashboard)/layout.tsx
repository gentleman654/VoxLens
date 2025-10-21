import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - VoxLens',
  description: 'Analyze sentiment on any topic',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
