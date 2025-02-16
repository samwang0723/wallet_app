import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

interface ButtonProps {
  amount?: number;
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  amount,
  text,
  onPress,
  disabled,
}) => {
  const handlePress = () => {
    onPress();
  };

  const isButtonDisabled = amount == 0;

  return (
    <View className="py-1.5 items-center">
      <TouchableOpacity
        className="w-full p-4 rounded items-center"
        style={{
          backgroundColor: isButtonDisabled
            ? theme.colors.primaryDisable
            : theme.colors.primary,
        }}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          variant="md"
          weight="medium"
          color={disabled ? 'textDisabled' : 'text'}
          className="text-center"
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
