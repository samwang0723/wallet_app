// components/Header/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';

interface HeaderProps {
  title: string;
  showBackButton?: boolean; // optional prop to toggle the back button
  showFaqButton?: boolean; // optional prop to toggle the faq button
  showInfoButton?: boolean; // optional prop to toggle the info button
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton,
  showFaqButton,
  showInfoButton,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {/* Left Container: Show arrow if showBackButton = true */}
      {showBackButton ? (
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        // Even if there's no back button, keep left container for layout
        <View style={styles.leftContainer} />
      )}

      {/* Center: Title */}
      <View style={styles.centerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Container */}
      <View style={styles.rightContainer}>
        {showFaqButton && (
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        )}
        {showInfoButton && (
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={COLORS.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
