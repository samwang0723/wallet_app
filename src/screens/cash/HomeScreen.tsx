import React, { useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Header } from '@/components/cash/Header/Header';
import { Transaction } from '@/types';
import { TransactionSection } from '@/components/cash/TransactionSection/TransactionSection';

export type RootStackParamList = {
  Deposit: undefined;
};

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Buy Featured 10 Basket',
    date: '12月 4',
    status: 'Processed',
    amount: '$100.00',
  },
  {
    id: '2',
    title: 'Top 10 Basket → USD',
    date: '12月 4',
    status: 'Processed',
    amount: '+$100.85',
    isPositive: true,
  },
];

export const HomeScreen = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="" showBackButton showFaqButton />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Type */}
        <View style={styles.accountType}>
          <Image
            source={{ uri: 'https://flagcdn.com/w80/us.png' }}
            style={styles.flag}
          />
          <Text style={styles.accountText}>USD Account</Text>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceLabelContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <TouchableOpacity
              onPress={() => setIsBalanceVisible(!isBalanceVisible)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={isBalanceVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balance}>
            {isBalanceVisible ? '$ 0.85 USD' : '*****'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Deposit')} // Navigate to Deposit screen
          >
            <View style={styles.actionIcon}>
              <Text style={styles.plusMinus}>+</Text>
            </View>
            <Text style={styles.actionText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.plusMinus}>-</Text>
            </View>
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <TransactionSection transactions={transactions} />
      </ScrollView>

    </SafeAreaView>
  );
};
