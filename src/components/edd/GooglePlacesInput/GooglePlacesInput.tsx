/* eslint-disable  @typescript-eslint/no-require-imports */
import React, { useRef } from 'react';
import { theme } from '@/themes';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from './GooglePlacesAutoComplete';

interface RowData {
  description?: string;
  formatted_address?: string;
  name?: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

interface GooglePlacesRef {
  setAddressText: (address: string) => void;
  getAddressText: () => string;
  blur: () => void;
  focus: () => void;
  isFocused: () => boolean;
  clear: () => void;
  getCurrentLocation: () => void;
}

const images = {
  delete: require('@assets/edd/delete.png'),
  search: require('@assets/edd/search.png'),
};

const GooglePlacesInput = () => {
  const ref = useRef<GooglePlacesRef>(null);

  const renderLeftButton = () => {
    return (
      <View style={{ marginLeft: 14, justifyContent: 'center' }}>
        <Image
          source={images.search}
          style={{
            height: 20,
            width: 20,
            tintColor: theme.colors.text,
          }}
        />
      </View>
    );
  };

  const renderRightButton = () => {
    return (
      <TouchableOpacity
        style={{ marginRight: 14, justifyContent: 'center' }}
        onPress={() => {
          ref.current?.setAddressText('');
          ref.current?.focus();
        }}
      >
        <Image
          source={images.delete}
          style={{
            height: 20,
            width: 20,
            tintColor: theme.colors.secondaryText,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderRow = (rowData: RowData) => {
    // Use structured formatting if available, otherwise fallback to description
    const mainText = rowData.structured_formatting?.main_text || '';
    const secondaryText = rowData.structured_formatting?.secondary_text || '';

    if (mainText && secondaryText) {
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 16,
              lineHeight: 24,
            }}
            numberOfLines={3}
          >
            {mainText}
            <Text
              style={{
                color: theme.colors.secondaryText,
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {` ${secondaryText}`}
            </Text>
          </Text>
        </View>
      );
    }

    return (
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 16,
          lineHeight: 24,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        numberOfLines={3}
      >
        {rowData.description || rowData.formatted_address || rowData.name || ''}
      </Text>
    );
  };

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search Address"
      minLength={3}
      fetchDetails={true}
      numberOfLines={3}
      renderRow={renderRow}
      renderLeftButton={renderLeftButton}
      renderRightButton={renderRightButton}
      isRowScrollable={false}
      textInputProps={{
        placeholderTextColor: theme.colors.secondaryText,
        clearButtonMode: 'never',
      }}
      onPress={(data, details = undefined) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      onFail={(error) => console.error(error)}
      query={{
        key: process.env.GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        textInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        textInput: {
          height: 44,
          color: theme.colors.text,
          fontSize: 16,
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 8,
          paddingTop: 8,
        },
        predefinedPlacesDescription: {
          color: theme.colors.text,
        },
        row: {
          backgroundColor: theme.colors.background,
          margin: 0,
          paddingVertical: 4,
          paddingHorizontal: 0,
        },
        separator: {
          height: 1,
          backgroundColor: theme.colors.border,
        },
        listView: {
          backgroundColor: theme.colors.background,
          marginTop: 10,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          padding: 0,
        },
        poweredContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderColor: theme.colors.border,
          borderTopWidth: 0.5,
          backgroundColor: theme.colors.background,
        },
        powered: {
          resizeMode: 'contain',
          alignSelf: 'center',
        },
        description: {
          color: theme.colors.text,
        },
      }}
    />
  );
};

export default GooglePlacesInput;
