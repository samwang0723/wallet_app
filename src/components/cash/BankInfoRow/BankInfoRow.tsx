import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
import Toast from 'react-native-toast-message';

interface BankInfo {
  label: string;
  value: string;
}

export const BankInfoRow: React.FC<BankInfo> = ({ label, value }) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);

    Toast.show({
      type: 'success', // 'success' | 'error' | 'info' (or custom)
      text1: label + ' copied to clipboard !',
      position: 'bottom', // Show it at the bottom
    });
  };

  return (
    <View
      className="bg-cardBackground px-4 py-2 border-b"
      style={{ borderColor: theme.colors.border }}
    >
      <Text variant="md" color="secondaryText" className="mt-1">
        {label}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text variant="md" color="text" className="flex-shrink my-1 mr-4">
          {value}
        </Text>
        <TouchableOpacity className="p-1" onPress={handleCopy}>
          <Ionicons
            name="copy-outline"
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
