import React from 'react';
import { View, Text, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../styles/theme';
import Hyperlink from 'react-native-hyperlink'

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
        <View key={index} style={styles.bulletItem}>
          <Ionicons
            name="ellipse"
            size={6}
            color={COLORS.text}
            style={styles.bulletIcon}
          />
          {typeof item === 'string' && item.includes('http') ? (
            <Hyperlink
              linkStyle={styles.linkStyle}
              linkText={url => url === 'https://help.crypto.com' ? 'Help Center' : url}
              onPress={(url) => Linking.openURL(url)}
            >
              <Text style={styles.bulletText}>{item}</Text>
            </Hyperlink>
          ) : (
            <Text style={styles.bulletText}>{item}</Text>
          )}
        </View>
      ))}
    </View>
  );
};
