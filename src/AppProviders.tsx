import React from 'react';
import { StoreProvider } from "@/contexts/StoreContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApolloProvider } from "@/contexts/ApolloContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <ApolloProvider>
        <StoreProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </StoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};