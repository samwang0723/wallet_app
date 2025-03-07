/* eslint-disable  @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Pressable, Image } from 'react-native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

const images = {
  check: require('@/assets/edd/check.png'),
};

interface Option {
  label: string;
  value: string;
}

interface OptionsProps {
  options: Option[];
  selectedValue: string[];
  onChange: (value: string[]) => void;
  maxSelect?: number;
}

export const Options: React.FC<OptionsProps> = ({
  options,
  selectedValue = [],
  onChange,
  maxSelect = 1,
}) => {
  const handleOptionPress = (value: string) => {
    if (maxSelect === 1) {
      onChange([value]);
      return;
    }

    const newSelectedValues = selectedValue.includes(value)
      ? selectedValue.filter((v) => v !== value)
      : [...selectedValue, value];

    // Ensure we don't exceed maxSelect
    if (newSelectedValues.length <= maxSelect) {
      onChange(newSelectedValues);
    }
  };

  const isSelected = (value: string) => selectedValue.includes(value);

  const renderSelectionIndicator = (value: string) => {
    if (maxSelect === 1) {
      return (
        <View
          className="w-6 h-6 rounded-full border-2 mr-4 items-center justify-center"
          style={{
            borderColor: isSelected(value)
              ? theme.colors.primary
              : theme.colors.secondaryText,
          }}
        >
          {isSelected(value) && (
            <View
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            />
          )}
        </View>
      );
    }

    return isSelected(value) ? (
      <Image
        source={images.check}
        className="w-6 h-6"
        style={{ tintColor: theme.colors.primary }}
      />
    ) : null;
  };

  return (
    <View className="flex flex-col my-4">
      {options.map((option) => (
        <Pressable
          key={option.value}
          className="flex flex-row items-center py-6 px-3 active:bg-gray-800 border-b-hairline"
          style={{
            borderBottomWidth: 1,
            borderColor: theme.colors.secondaryText,
          }}
          onPress={() => handleOptionPress(option.value)}
        >
          {maxSelect === 1 && renderSelectionIndicator(option.value)}
          <Text variant="sm" color="text" style={{ flex: 1 }}>
            {option.label}
          </Text>
          {maxSelect > 1 && renderSelectionIndicator(option.value)}
        </Pressable>
      ))}
    </View>
  );
};
