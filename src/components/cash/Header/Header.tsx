// components/Header/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean; // optional prop to toggle the back button
  showFaqButton?: boolean; // optional prop to toggle the faq button
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton, showFaqButton }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {/* Left Container: Show arrow if showBackButton = true */}
      {showBackButton ? (
        <TouchableOpacity style={styles.leftContainer} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        // Even if there's no back button, keep left container for layout
        <View style={styles.leftContainer} />
      )}

      {/* Center: Title */}
      <View style={styles.centerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Container (empty or for future icons) */}
      {showFaqButton ? (
        <TouchableOpacity style={styles.rightContainer}>
          <Ionicons name="help-circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightContainer} />
      )}
    </View>
  );
};
