import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';
import Toast from 'react-native-toast-message';

interface BankInfo {
  label: string;
  value: string;
}

export const BankInfoRow: React.FC<BankInfo> = ({ label, value }) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);

    Toast.show({
      type: 'success', // 'success' | 'error' | 'info' (or custom)
      text1: label + ' copied to clipboard !',
      position: 'bottom', // Show it at the bottom
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}> {label} </Text>
      <View style={styles.valueRow}>
        <Text style={styles.value} ellipsizeMode="tail">
          {value}
        </Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
