import { create } from 'zustand';
import type { User } from '@/types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  creditsRemaining: number;
  setUser: (user: User | null) => void;
  setCredits: (credits: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  creditsRemaining: 50, // Default for demo
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setCredits: (credits) => set({ creditsRemaining: credits }),
  logout: () => set({ user: null, isAuthenticated: false, creditsRemaining: 0 }),
}));
