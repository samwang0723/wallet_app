// src/components/Header/Header.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/components/Header/styles';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

