import React from 'react';
import { View, Text, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';
import { parseLinkInText } from '@/utils';

interface DepositInfoSectionProps {
  title: string;
  bullets: string[];
}

export const DepositInfoSection: React.FC<DepositInfoSectionProps> = ({
  title,
  bullets,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {bullets.map((item, index) => (
        <View key={index} style={styles.bulletRow}>
          <Ionicons
            name="ellipse"
            size={6}
            color={COLORS.text}
            style={styles.bulletIcon}
          />
          {/* Wrap Text inside a View with flex: 1 */}
          <View style={{ flex: 1 }}>
            <Text style={styles.bulletText}>
              {parseLinkInText(item).map((part, idx) => {
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
