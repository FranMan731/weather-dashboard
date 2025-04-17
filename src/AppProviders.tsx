import React from 'react';
import { AuthProvider } from "@/contexts/AuthContext";
import { ApolloProvider } from "@/contexts/ApolloContext";
import { StoreProvider } from "@/contexts/StoreContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AuthProvider>
          <ApolloProvider>
            {children}
          </ApolloProvider>
        </AuthProvider>
      </StoreProvider>
    </ThemeProvider>
  );
};