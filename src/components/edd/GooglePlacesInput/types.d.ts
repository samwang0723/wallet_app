declare module 'lodash.debounce';
declare module 'qs';
declare module 'uuid';

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface GeolocationPositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

declare global {
  interface Navigator {
    geolocation: {
      getCurrentPosition(
        success: (position: GeolocationPosition) => void,
        error?: (error: GeolocationPositionError) => void,
        options?: GeolocationOptions
      ): void;
      watchPosition(
        success: (position: GeolocationPosition) => void,
        error?: (error: GeolocationPositionError) => void,
        options?: GeolocationOptions
      ): number;
      clearWatch(id: number): void;
    };
  }
} 