import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { BankInfo } from '../../types';
import { COLORS } from '../../styles/theme';

export const BankInfoRow: React.FC<BankInfo> = ({ label, value }) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">
          {value}
        </Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
