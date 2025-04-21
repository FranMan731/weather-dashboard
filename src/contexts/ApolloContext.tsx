import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { fetchAuthSession } from '../lib/api';
import { ApiError, toApiError, getErrorMessage } from '../types/errors';

type ApolloContextType = {
  client: ApolloClient<any>;
  isLoading: boolean;
  error: ApiError | null;
};

const ApolloContext = createContext<ApolloContextType>({
  client: null as any,
  isLoading: false,
  error: null,
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<ApolloClient<any>>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    initializeApolloClient();
  }, []);

  const initializeApolloClient = async () => {
    try {
      setIsLoading(true);

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
      setError(null);
    } catch (err) {
      setError(toApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (!client) {
    return null;
  }

  return (
    <ApolloContext.Provider value={{ client, isLoading, error }}>
      <BaseApolloProvider client={client}>{children}</BaseApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApolloContext = () => useContext(ApolloContext);