import { makeAutoObservable } from "mobx";
import { WeatherResponse } from "@/types/weather";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../api/weatherApi";
import * as Location from "expo-location";

class WeatherStore {
  searchText: string = "";
  isSearching: boolean = false;
  weatherData: WeatherResponse | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchText(text: string): void {
    this.searchText = text;
  }

  async searchWeather(): Promise<void> {
    if (!this.searchText.trim()) {
      this.error = "Please enter a city name";
      return;
    }

    this.isSearching = true;
    this.error = null;

    try {
      const data = await fetchWeatherByCity(this.searchText);
      this.weatherData = data;
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : "Failed to fetch weather data";
    } finally {
      this.isSearching = false;
    }
  }

  async searchByCurrentPosition(): Promise<void> {
    this.isSearching = true;
    this.error = null;

    try {
      const position = await this.getCurrentPosition();
      const data = await fetchWeatherByCoords(
        position.latitude,
        position.longitude
      );
      this.weatherData = data;
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : "Failed to get current position";
    } finally {
      this.isSearching = false;
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

  reset(): void {
    this.searchText = "";
    this.weatherData = null;
    this.error = null;
  }
}

export const weatherStore = new WeatherStore();
