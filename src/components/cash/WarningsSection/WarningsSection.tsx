import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';

interface WarningsSectionProps {
  warnings: string[];
}

export const WarningsSection: React.FC<WarningsSectionProps> = ({ warnings }) => {
  return (
    <View style={styles.container}>
      {warnings.map((warning, index) => (
        <View key={index} style={styles.warningRow}>
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color={COLORS.warning} // or any color you prefer for the icon
            style={styles.warningIcon}
          />
          <Text style={styles.warningText}>{warning}</Text>
        </View>
      ))}
    </View>
  );
};
