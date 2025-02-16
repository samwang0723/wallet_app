import React from 'react';
import { View, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
import { parseLinkInText } from '@/utils';

interface WarningsSectionProps {
  warnings: string[];
}

export const WarningsSection: React.FC<WarningsSectionProps> = ({
  warnings,
}) => {
  return (
    <View className="px-4 py-2">
      {warnings.map((warning, index) => (
        <View key={index} className="flex-row items-start my-1">
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color={theme.colors.warning}
            style={{ marginRight: 8 }}
          />
          {/* Wrap Text inside a View with flex: 1 */}
          <View className="flex-1">
            <Text variant="base" color="text" className="flex-wrap flex-shrink">
              {parseLinkInText(warning).map((part, idx) => {
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
