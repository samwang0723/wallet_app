import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { TransactionSectionProps } from '@/types';


export const TransactionSection: React.FC<TransactionSectionProps> = ({ transactions }) => {
  return (
    <View style={styles.transactionsContainer}>
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <View style={styles.transactionSubtitle}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.transactionStatus}>{transaction.status}</Text>
            </View>
          </View>
          <Text style={styles.transactionAmount}>
            {transaction.amount}
          </Text>
        </View>
      ))}
    </View>
  );
};
