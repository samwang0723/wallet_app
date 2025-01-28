import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const EmailButton: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
