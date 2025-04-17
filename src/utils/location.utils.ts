import { ApiError } from "@/types/errors";

export const getLocationErrorText = (error: ApiError): string => {
  if (error.message.includes('Permission')) {
    return 'Please enable location permissions in settings';
  }
  if (error.message.includes('location')) {
    return 'Could not determine your location. Please try again or enter a city manually.';
  }
  return error.message;
};