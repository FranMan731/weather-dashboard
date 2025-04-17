import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  signIn: async (username: string, password: string) => {
    throw new Error("AuthProvider not initialized");
  },
  signOut: async () => {
    throw new Error("AuthProvider not initialized");
  }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={{
      user: auth.user,
      signIn: auth.authSignIn,
      signOut: auth.authSignOut,
      isLoading: auth.isLoading,
      error: auth.error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);