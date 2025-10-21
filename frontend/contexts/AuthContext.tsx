'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async (): Promise<boolean> => {
    try {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        setUser(null);
        setIsLoading(false);
        return false;
      }

      // Set token in API client
      apiClient.setToken(accessToken);

      // Verify token by fetching user data
      try {
        const userData = await apiClient.getCurrentUser();
        setUser(userData);
        setIsLoading(false);
        return true;
      } catch (error: unknown) {
        // If 401 or 404, try to refresh token
        console.error('Auth check failed:', error);

        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const response = await apiClient.refreshToken(refreshToken);
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            apiClient.setToken(response.access_token);

            const userData = await apiClient.getCurrentUser();
            setUser(userData);
            setIsLoading(false);
            return true;
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Clear invalid tokens
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            apiClient.clearToken();
            setUser(null);
            setIsLoading(false);
            return false;
          }
        }

        // No refresh token, clear everything
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        apiClient.clearToken();
        setUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Unexpected error in checkAuth:', error);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);

      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      apiClient.setToken(response.access_token);

      const userData = await apiClient.getCurrentUser();
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    apiClient.clearToken();
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
