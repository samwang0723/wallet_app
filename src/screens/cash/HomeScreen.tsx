import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Header } from '@/components/cash/Header/Header';
import { RootStackParamList } from '@/navigation/types';
import { TransactionSection } from '@/components/cash/TransactionSection/TransactionSection';
import { BankAccount, PaymentNetwork, Transaction } from '@/store/types';

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

// generate fake bank account data
const bankAccounts: BankAccount[] = [
  {
    bankName: 'Bank of America',
    accountNumber: '**** 1234',
    accountName: 'sample.test1@gmail.com',
  },
  {
    bankName: 'Chase Bank',
    accountNumber: '**** 5678',
    accountName: 'sample.test2@example.com',
  },
];

const depositMethods: PaymentNetwork[] = [
  {
    id: 'instant',
    title: 'Instant Deposit',
    type: '',
    description:
      'Link your bank account securely and Crypto.com provides you with an instant deposit before the funds are processed, so you can buy crypto and trade derivatives immediately. No Fees.',
    recommended: true,
    iconName: 'home-outline', // Ionicons building icon
  },
  {
    id: 'ach',
    title: 'ACH Bank Transfer',
    type: '',
    description:
      'Transfer USD via the ACH network from your bank account manually using your Crypto.com bank details. No fees, funds received in 3-5 business days.',
    iconName: 'home-outline',
  },
  {
    id: 'wire',
    title: 'Wire Transfer',
    type: '',
    description:
      'Transfer USD via the wire network from your bank account manually using your Crypto.com bank details. No fees, funds received in 1-3 business days.',
    iconName: 'home-outline',
  },
  {
    id: 'credit',
    title: 'Credit Card',
    type: '',
    description:
      'Top up your fiat wallet with your personal debit/credit card. Fees start from 1.49%. Additional fees might be charged by the issuing financial institution',
    iconName: 'card-outline',
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
                name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
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
            onPress={() =>
              navigation.navigate('PaymentNetwork', {
                paymentNetworks: depositMethods,
              })
            } // Navigate to Deposit screen
          >
            <View style={styles.actionIcon}>
              <Text style={styles.plusMinus}>+</Text>
            </View>
            <Text style={styles.actionText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate('ChooseBankAccount', { bankAccounts })
            } // Navigate to ChooseBankAccount screen
          >
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
