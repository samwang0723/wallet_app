import React from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';

export const InitWithdrawalScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Withdraw CAD" showBackButton showInfoButton />

    </SafeAreaView>
  );
};
