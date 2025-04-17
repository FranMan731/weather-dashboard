import { useState } from 'react';
import { signIn, signOut, getCurrentUser } from '../lib/api';
import { ApiError, toApiError } from '../types/errors';
import { AuthUser, UseAuthReturn } from '../types/auth';

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const authSignIn = async (username: string, password: string): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await signIn({ username, password });
      setUser(user);
      return user;
    } catch (err) {
      const authError = toApiError(err);
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const authSignOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
      setError(null);
    } catch (err) {
      const authError = toApiError(err);
      setError(authError);
      console.error('Error signing out: ', authError.message);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentAuthenticatedUser = async (): Promise<AuthUser | null> => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    user,
    authSignIn,
    authSignOut,
    getCurrentAuthenticatedUser,
    isLoading,
    error,
    clearError,
  };
};