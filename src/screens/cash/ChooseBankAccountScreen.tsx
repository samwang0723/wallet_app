import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/styles/theme';

type ChooseBankAccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChooseBankAccount'
>;

type ChooseBankAccountScreenRouteProp = RouteProp<
  RootStackParamList,
  'ChooseBankAccount'
>;

type ChooseBankAccountScreenProps = {
  navigation: ChooseBankAccountScreenNavigationProp;
  route: ChooseBankAccountScreenRouteProp;
};

export const ChooseBankAccountScreen: React.FC<ChooseBankAccountScreenProps> = ({
  route,
}) => {
  const { bankAccounts } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
              onPress={() => { navigation.navigate('InitWithdrawal'); }}
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
