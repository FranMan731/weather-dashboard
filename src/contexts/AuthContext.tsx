import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContextType } from '../types/auth';
import { useApolloContext } from './ApolloContext';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  signIn: async () => {
    throw new Error("AuthProvider not initialized");
  },
  signOut: async () => {
    throw new Error("AuthProvider not initialized");
  }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const { initializeApolloClient } = useApolloContext();

  const signIn = async () => {
    try {
      await auth.authSignIn();
      await initializeApolloClient();
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      signIn,
      signOut: auth.authSignOut,
      isLoading: auth.isLoading,
      error: auth.error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);