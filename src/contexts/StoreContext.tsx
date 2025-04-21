import React, { createContext, useContext, useEffect, useState } from 'react';
import { weatherStore, WeatherStoreType } from '@/stores/weather.store';
import { authStore, AuthStoreType } from '@/stores/auth.store';
import { createFavoriteStore, FavoriteStoreType } from '@/stores/favorite.store';
import { useApolloContext } from '@/contexts/ApolloContext';
import { LoadingScreen } from '@/components/loading/LoadingScreen';
import { ErrorScreen } from '@/components/error/ErrorScreen';

interface Stores {
  weatherStore: WeatherStoreType;
  authStore: AuthStoreType;
  favoriteStore: FavoriteStoreType;
}

const StoreContext = createContext<Stores | null>(null);

export const StoreProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { client: apolloClient, isLoading: apolloLoading, error: apolloError } = useApolloContext();
  const [state, setState] = useState<{
    stores: Stores | null;
    loading: boolean;
    error: Error | null;
  }>({
    stores: null,
    loading: true,
    error: null
  });

  const retryInitialization = () => {
    setState({
      stores: null,
      loading: true,
      error: null
    });
  };

  useEffect(() => {
    if (apolloLoading) return;
    
    const initialize = async () => {
      try {
        if (apolloError) throw new Error('Failed to initialize Apollo: ' + apolloError.message);
        if (!apolloClient) throw new Error('Apollo client not available');
        
        const stores = {
          weatherStore,
          authStore,
          favoriteStore: createFavoriteStore(apolloClient)
        };
        
        setState({
          stores,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          stores: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown initialization error')
        });
      }
    };

    initialize();
  }, [apolloClient, apolloLoading, apolloError]);

  if (state.loading) {
    return <LoadingScreen />;
  }

  if (state.error) {
    return (
      <ErrorScreen 
        error={state.error} 
        onRetry={retryInitialization} 
      />
    );
  }

  if (!state.stores) {
    return (
      <ErrorScreen 
        error={new Error('Application state not available')} 
        onRetry={retryInitialization} 
      />
    );
  }

  return (
    <StoreContext.Provider value={state.stores}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): Stores => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};