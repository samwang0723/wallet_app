/* eslint-disable  @typescript-eslint/no-require-imports */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

interface ReadOnlyProps {
  value: string;
  title: string;
  placeholder: string;
}

export const ReadOnly: React.FC<ReadOnlyProps> = ({
  value,
  title,
  placeholder,
}) => {
  return (
    <View className="my-4">
      <View className="flex-row mb-3">
        <Text variant="sm" color="secondaryText">
          {title}
        </Text>
      </View>
      <TouchableOpacity
        className="p-4 rounded-md border flex-row items-center justify-between"
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderColor: theme.colors.secondaryText,
        }}
        testID="readonly-selector"
        disabled={true}
      >
        <Text variant="sm" color="secondaryText">
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
