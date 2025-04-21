import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { fetchAuthSession } from '../lib/api';
import { ApiError, toApiError, getErrorMessage } from '../types/errors';

type ApolloContextType = {
  client: ApolloClient<any> | null;
  isLoading: boolean;
  error: ApiError | null;
  initializeApolloClient: () => Promise<void>;
  clearClient: () => void;
};

const ApolloContext = createContext<ApolloContextType>({
  client: null,
  isLoading: false,
  error: null,
  initializeApolloClient: async () => {},
  clearClient: () => {}
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const initializeApolloClient = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const httpLink = createHttpLink({
        uri: 'https://nlop9z9t2e.execute-api.eu-west-1.amazonaws.com/',
      });

      const authLink = setContext(async (_, { headers }) => {
        try {
          const token = (await fetchAuthSession()).tokens?.accessToken;
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          };
        } catch (err) {
          console.error('Error getting token:', getErrorMessage(err));
          return { headers };
        }
      });

      const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });

      setClient(apolloClient);
    } catch (err) {
      setError(toApiError(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearClient = () => {
    setClient(null);
  };

  return (
    <ApolloContext.Provider 
      value={{ 
        client, 
        isLoading, 
        error, 
        initializeApolloClient,
        clearClient
      }}
    >
      {client ? (
        <BaseApolloProvider client={client}>{children}</BaseApolloProvider>
      ) : (
        children
      )}
    </ApolloContext.Provider>
  );
};

export const useApolloContext = () => useContext(ApolloContext);