import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


type TransactionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Transaction'
>;

type TransactionScreenRouteProp = RouteProp<
  RootStackParamList,
  'Transaction'
>;

type TransactionScreenProps = {
  navigation: TransactionScreenNavigationProp;
  route: TransactionScreenRouteProp;
};

export const TransactionScreen: React.FC<TransactionScreenProps> = ({ route }) => {
  const { transactions } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Transaction History" showBackButton />
      {/* TODO: missing export */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </SafeAreaView>
  );
};
