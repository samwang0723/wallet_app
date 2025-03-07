/* eslint-disable  @typescript-eslint/no-require-imports */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface CheckBoxProps {
  text: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  text,
  checked = false,
  onChange,
}) => {
  const handlePress = () => {
    onChange?.(!checked);
  };

  return (
    <View className="my-4">
      <TouchableOpacity
        className="flex-row items-center mb-3"
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View
          className="w-5 h-5 rounded mr-3 items-center justify-center"
          style={{
            backgroundColor: checked ? theme.colors.primary : 'transparent',
            borderWidth: 1,
            borderColor: checked
              ? theme.colors.primary
              : theme.colors.secondaryText,
          }}
        >
          {checked && (
            <Ionicons name="checkmark" size={16} color={theme.colors.text} />
          )}
        </View>
        <Text variant="sm" color="text" className="flex-1">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
