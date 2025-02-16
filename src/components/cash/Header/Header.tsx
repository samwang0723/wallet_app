import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
interface HeaderProps {
  title: string;
  showBackButton?: boolean; // optional prop to toggle the back button
  showFaqButton?: boolean; // optional prop to toggle the faq button
  showInfoButton?: boolean; // optional prop to toggle the info button
  onPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton,
  showFaqButton,
  showInfoButton,
  onPress,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View
      className="flex h-14 flex-row items-center border-b-0 mb-2"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Left Container: Show arrow if showBackButton = true */}
      {showBackButton ? (
        <TouchableOpacity
          className="w-14 items-center justify-center"
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      ) : (
        // Even if there's no back button, keep left container for layout
        <View className="w-14 items-center justify-center" />
      )}

      {/* Center: Title */}
      <View className="flex-1 items-center justify-center">
        <Text variant="lg" weight="bold" color="text">
          {title}
        </Text>
      </View>

      {/* Right Container */}
      <View className="w-14 items-center justify-center">
        {showFaqButton && (
          <TouchableOpacity className="p-1" onPress={onPress}>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
        {showInfoButton && (
          <TouchableOpacity className="p-1" onPress={onPress}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
