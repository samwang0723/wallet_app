import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
import { setOccupationCallback } from '@/pages/edd/OccupationListScreen';

interface OccupationSelectorProps {
  value?: string;
  onChange: (occupation: string) => void;
  required?: boolean;
}

export const OccupationSelector: React.FC<OccupationSelectorProps> = ({
  value,
  onChange,
  required = false,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    setOccupationCallback(onChange);
    navigation.navigate('OccupationList', {
      currentValue: value,
    });
  };

  return (
    <View className="space-y-2">
      <View className="flex-row">
        <Text variant="lg" weight="bold" color="text">
          Occupation
        </Text>
        {required && (
          <Text className="ml-1" color="error" variant="xl">
            *
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handlePress}
        className="p-4 rounded-lg border"
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderColor: theme.colors.border,
        }}
        testID="occupation-selector"
      >
        <Text variant="md" color="text">
          {value || 'Your occupation'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
