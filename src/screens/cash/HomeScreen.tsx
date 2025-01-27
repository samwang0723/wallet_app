import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Transaction } from '@/types';

export type RootStackParamList = {
  Deposit: undefined;
};

const transactionsData: Transaction[] = [
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transaction}>
      <Text style={styles.transactionDescription}>{item.title}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
      <Text style={[styles.transactionAmount, item.amount.startsWith('+') ? styles.positiveAmount : null]}>
        {item.amount}
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>USD Account</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            {isBalanceVisible ? '$ 0.85 USD' : '****'}
          </Text>
          <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeButton}>
            <Ionicons
              name={isBalanceVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Deposit')} // Navigate to Deposit screen
        >
          <Text style={styles.actionButtonText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactionsData}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
