import React from 'react';
import { View, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
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
    <View className="px-4 pb-2 bg-background">
      <Text variant="xl" weight="bold" color="text" className="mb-2">
        {title}
      </Text>
      {bullets.map((item, index) => (
        <View key={index} className="flex-row items-center my-1 flex-wrap">
          <Ionicons
            name="ellipse"
            size={6}
            color={theme.colors.text}
            style={{ marginRight: 12 }}
          />
          {/* Wrap Text inside a View with flex: 1 */}
          <View className="flex-1">
            <Text
              variant="base"
              color="secondaryText"
              className="flex-wrap flex-shrink"
            >
              {parseLinkInText(item).map((part, idx) => {
                if (part.type === 'text') {
                  return part.text; // Return plain text directly
                } else if (part.type === 'link' && part.text && part.url) {
                  return (
                    <Text
                      key={idx}
                      variant="base"
                      color="primary"
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
