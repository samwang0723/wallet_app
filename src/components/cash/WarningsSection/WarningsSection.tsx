import React from 'react';
import { View, Text, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';
import { parseLinkInText } from '@/utils';

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
          {/* Wrap Text inside a View with flex: 1 */}
          <View style={{ flex: 1 }}>
            <Text style={styles.warningText}>
              {parseLinkInText(warning).map((part, idx) => {
                if (part.type === 'text') {
                  return part.text; // Return plain text directly
                } else if (part.type === 'link' && part.text && part.url) {
                  return (
                    <Text
                      key={idx}
                      style={styles.linkStyle}
                      onPress={() => Linking.openURL(part.url)}
                    >
                      {part.text}
                    </Text>
                  );
                }
                return null;
              })}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
