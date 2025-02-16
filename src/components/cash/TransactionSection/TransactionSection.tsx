import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@/components/ui/Text';
import { Transaction } from '@/domains/model';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '@/themes';

interface TransactionSectionProps {
  transactions: Transaction[];
}

export type RootStackParamList = {
  Transaction: {
    transactions: Transaction[];
  };
};

export const TransactionSection: React.FC<TransactionSectionProps> = ({
  transactions,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (transactions: Transaction[]) => {
    console.log('See all transactions:', transactions);
    navigation.navigate('Transaction', { transactions });
  };

  return (
    <View
      className="mx-4 my-1 rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.colors.cardBackground }}
    >
      <View className="flex-row justify-between items-center m-5">
        <Text variant="lg" weight="semibold" color="text">
          Recent Transactions
        </Text>
        <TouchableOpacity onPress={() => handlePress(transactions)}>
          <Text variant="base" color="primary">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      {transactions.map((transaction) => (
        <View
          key={transaction.id}
          className="flex-row justify-between items-center mx-5 mb-5 pl-5"
        >
          <View>
            <Text variant="md" color="text" className="mb-1">
              {transaction.title}
            </Text>
            <View className="flex-row items-center">
              <Text variant="base" color="secondaryText">
                {transaction.date}
              </Text>
              <Text variant="md" color="secondaryText" className="mx-1">
                •
              </Text>
              <Text variant="base" color="transactionStatus">
                {transaction.status}
              </Text>
            </View>
          </View>
          <Text variant="md" color="text" weight="regular">
            {transaction.amount}
          </Text>
        </View>
      ))}
    </View>
  );
};
