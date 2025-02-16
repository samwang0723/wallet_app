import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

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

export const ChooseBankAccountScreen: React.FC<
  ChooseBankAccountScreenProps
> = ({ route }) => {
  const { bankAccounts } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header title="Choose Withdrawal Email" showBackButton showInfoButton />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Email List */}
        {bankAccounts.map((bankAccount) => {
          return (
            <TouchableOpacity
              key={bankAccount.accountName}
              className="flex-row items-center justify-between px-4 py-5 border-b"
              style={{ borderColor: theme.colors.border }}
              onPress={() => {
                navigation.navigate('InitWithdrawal', { currency: 'CAD' });
              }}
            >
              <Text variant="md" color="text">
                {bankAccount.accountName}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={theme.colors.secondaryText}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
