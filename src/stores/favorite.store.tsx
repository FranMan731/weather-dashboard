import { makeAutoObservable, runInAction } from "mobx";
import { WeatherResponse } from "@/types/weather";
import { ApolloClient } from "@apollo/client";
import { UPSERT_ITEM } from "@/lib/graphql/mutations";
import { LIST_ITEMS, GET_ITEM } from "@/lib/graphql/queries";
import { FavoriteItem } from "@/types/favorites";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FavoriteStore {
  favorites: FavoriteItem[] = [];
  loading = false;
  error: string | null = null;
  private readonly LOCAL_STORAGE_KEY = "FAVORITES_LOCAL";
  private syncInProgress = false;

  constructor(private apolloClient: ApolloClient<any>) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      await this.loadFromLocalStorage();
      this.syncWithBackend();
    } catch (error) {
      console.error("Initialization error:", error);
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
    if (this.syncInProgress) return;
    this.syncInProgress = true;

    try {
      this.setLoading(true);
      const { data } = await this.apolloClient.query({
        query: LIST_ITEMS,
      });

      const remoteFavorites = data.listItems.map((item: any) => ({
        id: parseInt(item.id),
        data: JSON.parse(item.content),
        timestamp: new Date(item.updatedAt).getTime()
      }));

      runInAction(() => {
        const mergedFavorites = [...remoteFavorites];
        this.favorites.forEach(localFav => {
          const existingIndex = mergedFavorites.findIndex(f => f.id === localFav.id);
          if (existingIndex === -1) {
            mergedFavorites.push(localFav);
          } else if (localFav.timestamp > mergedFavorites[existingIndex].timestamp) {
            mergedFavorites[existingIndex] = localFav;
          }
        });

        this.favorites = mergedFavorites;
        this.error = null;
        this.saveToLocalStorage();
      });
    } catch (error) {
      runInAction(() => {
        console.error("Sync with backend failed, using local data:", error);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
        this.syncInProgress = false;
      });
    }
  }

  async loadFavorites(): Promise<void> {
    await this.syncWithBackend();
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
    } catch (error) {
      console.error("Failed to sync favorite with backend:", error);
    }
  }

  async removeFavorite(id: number): Promise<void> {
    runInAction(() => {
      this.favorites = this.favorites.filter(fav => fav.id !== id);
      this.saveToLocalStorage();
    });

    try {
      await this.apolloClient.mutate({
        mutation: UPSERT_ITEM,
        variables: {
          input: {
            id: id.toString(),
            content: null
          }
        }
      });
    } catch (error) {
      console.error("Failed to sync favorite removal with backend:", error);
    }
  }

  private setLoading(loading: boolean): void {
    runInAction(() => {
      this.loading = loading;
    });
  }

  getFavoriteById(id: number): FavoriteItem | undefined {
    return this.favorites.find(fav => fav.id === id);
  }

  async refreshFavorites(): Promise<void> {
    await this.syncWithBackend();
  }
}

export const createFavoriteStore = (apolloClient: ApolloClient<any>) => {
  return new FavoriteStore(apolloClient);
};
export type FavoriteStoreType = FavoriteStore;