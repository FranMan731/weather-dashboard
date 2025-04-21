import { makeAutoObservable, makeObservable, runInAction } from "mobx";
import { WeatherResponse } from "@/types/weather";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../api/weatherApi";
import * as Location from "expo-location";
import { ApiError, toApiError } from "@/types/errors";
import AsyncStorage from "@react-native-async-storage/async-storage";

class WeatherStore {
  searchText: string = "";
  isSearching: boolean = false;
  weatherData: WeatherResponse | null = null;
  error: ApiError | null = null;
  recentSearches: string[] = [];

  private static instance: WeatherStore;
  private readonly RECENT_SEARCHES_KEY = "RECENT_SEARCHES";

  public static getInstance(): WeatherStore {
    if (!WeatherStore.instance) {
      WeatherStore.instance = new WeatherStore();
    }
    return WeatherStore.instance;
  }

  constructor() {
    makeAutoObservable(this);
    this.initializeRecentSearches();
  }

  private async initializeRecentSearches(): Promise<void> {
    try {
      await this.loadRecentSearches();
      console.log('Recent searches loaded:', this.recentSearches);
    } catch (error) {
      console.error('Failed to initialize recent searches:', error);
    }
  }

  setSearchText(text: string): void {
    this.searchText = text;
  }

  setIsSearching(searching: boolean): void {
    this.isSearching = searching;
  }

  setWeatherData(data: WeatherResponse | null): void {
    this.weatherData = data;
  }

  setError(error: ApiError | null): void {
    this.error = error;
  }

  async searchWeather(): Promise<void> {
    if (!this.searchText.trim()) {
      this.setError(toApiError("Please enter a city name"));
      return;
    }

    this.setIsSearching(true);
    this.setError(null);

    try {
      const data = await fetchWeatherByCity(this.searchText);
      this.setWeatherData(data);
      this.addRecentSearch(this.searchText);
    } catch (err) {
      this.setError(
        toApiError(
          err instanceof Error ? err.message : "Failed to fetch weather data"
        )
      );
    } finally {
      this.setIsSearching(false);
    }
  }

  async searchByCurrentPosition(): Promise<void> {
    this.setIsSearching(true);
    this.setError(null);

    try {
      const position = await this.getCurrentPosition();
      const data = await fetchWeatherByCoords(
        position.latitude,
        position.longitude
      );
      this.setWeatherData(data);
      this.addRecentSearch(`${data.name}, ${data.sys.country}`);
    } catch (err) {
      this.setError(
        toApiError(
          err instanceof Error ? err.message : "Failed to get current position"
        )
      );
    } finally {
      this.setIsSearching(false);
    }
  }

  private async getCurrentPosition(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error("Error getting location:", error);
      throw error;
    }
  }

  private addRecentSearch(search: string): void {
    if (!search.trim()) return;

    runInAction(() => {
      const normalizedSearch = search.toLowerCase();
      this.recentSearches = [
        search,
        ...this.recentSearches.filter(
          s => s.toLowerCase() !== normalizedSearch
        )
      ].slice(0, 5);
      
      this.saveRecentSearches();
    });
  }

  private async saveRecentSearches(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.RECENT_SEARCHES_KEY,
        JSON.stringify(this.recentSearches)
      );
      console.log('Recent searches saved successfully');
    } catch (error) {
      console.error('Failed to save recent searches:', error);
      throw error;
    }
  }

  private async loadRecentSearches(): Promise<void> {
    try {
      const savedSearches = await AsyncStorage.getItem(this.RECENT_SEARCHES_KEY);
      if (savedSearches) {
        runInAction(() => {
          this.recentSearches = JSON.parse(savedSearches);
        });
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
      throw error;
    }
  }

  get currentWeather(): WeatherResponse | null {
    return this.weatherData;
  }

  get hasWeatherData(): boolean {
    return this.weatherData !== null;
  }

  public async clearRecentSearches(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.RECENT_SEARCHES_KEY);
      runInAction(() => {
        this.recentSearches = [];
      });
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
      throw error;
    }
  }

  // Resetear estado
  reset(): void {
    this.searchText = "";
    this.weatherData = null;
    this.error = null;
  }
}

export const weatherStore = WeatherStore.getInstance();
export type WeatherStoreType = WeatherStore;