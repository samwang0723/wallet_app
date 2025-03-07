import { Header } from '@/components/cash/Header/Header';
import GooglePlacesInput from '@/components/edd/GooglePlacesInput/GooglePlacesInput';
import { theme } from '@/themes';
import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import Text from '@/components/ui/Text';

export const AddressSearchScreen = () => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <Header title="Address" showBackButton />
      <View className="flex-1 px-4">
        <GooglePlacesInput />
      </View>
      {/* Fixed bottom button */}
      <View className="px-4 py-4">
        <TouchableOpacity
          testID="button"
          className="px-4 pt-1"
          onPress={() => {}}
        >
          <Text
            variant="lg"
            color="primary"
            weight="bold"
            style={{
              textAlign: 'center',
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            Enter Address Manually
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
