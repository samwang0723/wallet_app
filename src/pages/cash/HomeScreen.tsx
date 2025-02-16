import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/cash/Header/Header';
import { RootStackParamList } from '@/navigation/types';
import { TransactionSection } from '@/components/cash/TransactionSection/TransactionSection';
import { BankAccount, PaymentNetwork, Transaction } from '@/domains/model';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
import { OccupationSelector } from '@/components/edd/OccupationSelector/OccupationSelector';

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
  const [occupation, setOccupation] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <Header title="" showBackButton showFaqButton />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Account Type */}
        <View className="flex-row items-center justify-center mb-5">
          <Image
            source={{ uri: 'https://flagcdn.com/w80/us.png' }}
            className="w-5 h-5 rounded-full mr-2 border"
            style={{ borderColor: theme.colors.text }}
          />
          <Text variant="md" weight="bold" color="text">
            USD Account
          </Text>
        </View>

        {/* Balance Section */}
        <View className="items-center mb-8">
          <View className="flex-row items-center">
            <Text variant="md" color="secondaryText">
              Total Balance
            </Text>
            <TouchableOpacity
              className="p-1 ml-0.5"
              onPress={() => setIsBalanceVisible(!isBalanceVisible)}
            >
              <Ionicons
                name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={theme.colors.secondaryText}
              />
            </TouchableOpacity>
          </View>
          <Text variant="xxl" weight="semibold" color="text">
            {isBalanceVisible ? '$ 0.85 USD' : '*****'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-around px-8 mb-10">
          <TouchableOpacity
            className="items-center"
            onPress={() =>
              navigation.navigate('PaymentNetwork', {
                paymentNetworks: depositMethods,
              })
            }
          >
            <View
              className="w-[50px] h-[50px] rounded-full justify-center items-center mb-2"
              style={{ backgroundColor: theme.colors.actionButtonBackground }}
            >
              <Text variant="xxxl" weight="regular" color="text">
                +
              </Text>
            </View>
            <Text variant="md" color="text">
              Deposit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() =>
              navigation.navigate('ChooseBankAccount', { bankAccounts })
            }
          >
            <View
              className="w-[50px] h-[50px] rounded-full justify-center items-center mb-2"
              style={{ backgroundColor: theme.colors.actionButtonBackground }}
            >
              <Text variant="xxxl" weight="regular" color="text">
                -
              </Text>
            </View>
            <Text variant="md" color="text">
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <TransactionSection transactions={transactions} />

        {/* Occupation Selector */}
        <View className="px-4 pt-4">
          <OccupationSelector
            value={occupation}
            onChange={setOccupation}
            required
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
