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
  favoriteStore: FavoriteStoreType | null;
}

const StoreContext = createContext<Stores>({
  weatherStore,
  authStore,
  favoriteStore: null
});

export const StoreProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { client: apolloClient } = useApolloContext();
  const [favoriteStore, setFavoriteStore] = useState<FavoriteStoreType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const newFavoriteStore = createFavoriteStore(apolloClient);
        setFavoriteStore(newFavoriteStore);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize stores'));
      } finally {
        setInitializing(false);
      }
    };

    initializeStore();
  }, [apolloClient]);

  const retryInitialization = () => {
    setError(null);
    setInitializing(true);
  };

  if (initializing) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={retryInitialization} />;
  }

  return (
    <StoreContext.Provider value={{
      weatherStore,
      authStore,
      favoriteStore
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): Stores => {
  return useContext(StoreContext);
};