import { Header } from '@/components/cash/Header/Header';
import GooglePlacesInput from '@/components/edd/GooglePlacesInput/GooglePlacesInput';
import { theme } from '@/themes';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';

export const AddressSearchScreen = () => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <Header title="" showBackButton />
      <View className="flex-1 px-4">
        <GooglePlacesInput />
      </View>
    </SafeAreaView>
  );
};
