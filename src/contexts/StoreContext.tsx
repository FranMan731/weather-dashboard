import React, { createContext, useContext } from 'react';
import { weatherStore, WeatherStoreType} from '@/stores/weather.store';
import { authStore, AuthStoreType } from '@/stores/auth.store';

interface Stores {
  weatherStore: WeatherStoreType;
  authStore: AuthStoreType;
}

const stores: Stores = {
  weatherStore,
  authStore
};

const StoreContext = createContext<Stores>(stores);

export const StoreProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <StoreContext.Provider value={stores}>
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