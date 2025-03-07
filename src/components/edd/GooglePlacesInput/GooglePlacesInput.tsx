import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { logger } from '@/utils/logger';
const GooglePlacesInput = () => {
  logger.info(process.env.GOOGLE_API_KEY);
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      onFail={(error) => console.error(error)}
      query={{
        key: process.env.GOOGLE_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
