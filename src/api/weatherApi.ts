import { WeatherResponse } from '@/types/weather';
import { OPEN_WEATHER_API_KEY, WEATHER_BASE_URL } from '@env';

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${WEATHER_BASE_URL}/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather by coords:', error);
    throw error;
  }
};