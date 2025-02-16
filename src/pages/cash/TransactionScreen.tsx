import React from 'react';
import { View, ScrollView } from 'react-native';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

type TransactionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Transaction'
>;

type TransactionScreenRouteProp = RouteProp<RootStackParamList, 'Transaction'>;

type TransactionScreenProps = {
  navigation: TransactionScreenNavigationProp;
  route: TransactionScreenRouteProp;
};

export const TransactionScreen: React.FC<TransactionScreenProps> = ({
  route,
}) => {
  const { transactions } = route.params;
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header title="Transaction History" showBackButton />
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: theme.colors.background }}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>
    </SafeAreaView>
  );
};
