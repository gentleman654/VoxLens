import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - VoxLens",
  description: "Login or sign up to VoxLens",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
