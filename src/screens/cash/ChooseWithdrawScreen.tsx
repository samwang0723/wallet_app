import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/styles/theme';

type ChooseWithdrawScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChooseWithdraw'
>;

type ChooseWithdrawScreenRouteProp = RouteProp<
  RootStackParamList,
  'ChooseWithdraw'
>;

type ChooseWithdrawScreenProps = {
  navigation: ChooseWithdrawScreenNavigationProp;
  route: ChooseWithdrawScreenRouteProp;
};

export const ChooseWithdrawScreen: React.FC<ChooseWithdrawScreenProps> = ({
  route,
}) => {
  const { bankAccounts } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choose Withdrawal Email" showBackButton showInfoButton />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Email List */}
        {bankAccounts.map((bankAccount) => {
          return (
            <TouchableOpacity
              key={bankAccount.accountName}
              style={styles.optionRow}
              onPress={() => { }}
            >
              <Text style={styles.optionText}>{bankAccount.accountName}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.secondaryText}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
