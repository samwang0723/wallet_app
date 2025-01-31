import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
  amount: number;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ amount, onPress }) => {
  const handlePress = () => {
    onPress();
  };

  const isButtonDisabled = amount == 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={isButtonDisabled}
      >
        <Text
          style={[
            styles.buttonText,
            isButtonDisabled && styles.buttonTextDisabled,
          ]}
        >
          {'Withdraw'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
