import { makeAutoObservable, runInAction } from "mobx";
import { WeatherResponse } from "@/types/weather";
import { ApolloClient } from "@apollo/client";
import { UPSERT_ITEM } from "@/lib/graphql/mutations";
import { LIST_ITEMS } from "@/lib/graphql/queries";
import { FavoriteItem } from "@/types/favorites";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FavoriteStore {
  favorites: FavoriteItem[] = [];
  loading = false;
  error: string | null = null;
  private readonly LOCAL_STORAGE_KEY = "FAVORITES_LOCAL";
  private syncInProgress = false;

  constructor(private apolloClient: ApolloClient<any> | null) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      await this.loadFromLocalStorage();
      if (this.apolloClient) {
        await this.syncWithBackend();
      }
    } catch (error) {
      console.error("Initialization error:", error);
      runInAction(() => {
        this.error = "Failed to initialize favorites";
      });
    }
  }

  private async loadFromLocalStorage(): Promise<void> {
    try {
      const storedFavorites = await AsyncStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (storedFavorites) {
        runInAction(() => {
          this.favorites = JSON.parse(storedFavorites);
        });
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }

  private async saveToLocalStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.LOCAL_STORAGE_KEY,
        JSON.stringify(this.favorites)
      );
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }

  private async syncWithBackend(): Promise<void> {
    if (!this.apolloClient || this.syncInProgress) return;
    
    this.syncInProgress = true;
    this.setLoading(true);

    try {
      const { data } = await this.apolloClient.query({
        query: LIST_ITEMS,
        fetchPolicy: "network-only"
      });

      const remoteFavorites = data.listItems.map((item: any) => ({
        id: parseInt(item.id),
        data: JSON.parse(item.content),
        timestamp: new Date(item.updatedAt).getTime()
      }));

      runInAction(() => {
        const merged = [...remoteFavorites];
        this.favorites.forEach(local => {
          const existing = merged.find(f => f.id === local.id);
          if (!existing || local.timestamp > existing.timestamp) {
            if (existing) {
              merged[merged.indexOf(existing)] = local;
            } else {
              merged.push(local);
            }
          }
        });

        this.favorites = merged;
        this.error = null;
        this.saveToLocalStorage();
      });

    } catch (error) {
      runInAction(() => {
        this.error = "Failed to sync with server";
        console.error("Sync error:", error);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
        this.syncInProgress = false;
      });
    }
  }

  async loadFavorites(): Promise<void> {
    if (this.apolloClient) {
      await this.syncWithBackend();
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(fav => fav.id === id);
  }

  async addFavorite(weatherData: WeatherResponse): Promise<void> {
    if (this.isFavorite(weatherData.id)) return;

    const newFavorite = {
      id: weatherData.id,
      data: weatherData,
      timestamp: Date.now()
    };

    runInAction(() => {
      this.favorites = [newFavorite, ...this.favorites];
      this.saveToLocalStorage();
    });

    if (this.apolloClient) {
      try {
        await this.apolloClient.mutate({
          mutation: UPSERT_ITEM,
          variables: {
            input: {
              id: weatherData.id.toString(),
              name: `${weatherData.name}, ${weatherData.sys.country}`,
              content: JSON.stringify(weatherData),
              metadata: {
                type: "weather_favorite",
                location: `${weatherData.coord.lat},${weatherData.coord.lon}`
              }
            }
          }
        });

        await this.syncWithBackend();
      } catch (error) {
        console.error("Failed to sync favorite:", error);
      }
    }
  }

  async removeFavorite(id: number): Promise<void> {
    runInAction(() => {
      this.favorites = this.favorites.filter(fav => fav.id !== id);
      this.saveToLocalStorage();
    });

    /* if (this.apolloClient) {
      try {
        await this.apolloClient.mutate({
          mutation: DELETE_ITEM,
          variables: {
            id: id.toString()
          }
        });
      } catch (error) {
        console.error("Failed to remove favorite:", error);
      }
    } */
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
  }

  getFavoriteById(id: number): FavoriteItem | undefined {
    return this.favorites.find(fav => fav.id === id);
  }

  async refreshFavorites(): Promise<void> {
    await this.loadFavorites();
  }
}

export const createFavoriteStore = (apolloClient: ApolloClient<any> | null) => {
  return new FavoriteStore(apolloClient);
};
export type FavoriteStoreType = FavoriteStore;