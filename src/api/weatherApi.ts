import { WeatherResponse } from '@/types/weather';

const API_KEY = '65d5dffea1077d3f31fcf02c8d972d87';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
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
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
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