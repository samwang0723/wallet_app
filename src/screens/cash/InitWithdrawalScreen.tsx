import React, { useState } from 'react';
import { styles } from './styles';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { AmountInput } from '@/components/cash/AmountInput/AmountInput';
import { DailyLimit } from '@/components/cash/DailyLimit/DailyLimit';
import { Button } from '@/components/cash/Button/Button';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { formatAmount } from '@/utils';
import { WithdrawalInfo } from '@/store/types';

type InitWithdrawalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InitWithdrawal'
>;

type InitWithdrawalScreenRouteProp = RouteProp<
  RootStackParamList,
  'InitWithdrawal'
>;

type InitWithdrawalScreenProps = {
  navigation: InitWithdrawalScreenNavigationProp;
  route: InitWithdrawalScreenRouteProp;
};

export const InitWithdrawalScreen: React.FC<InitWithdrawalScreenProps> = ({ route }) => {
  const { currency } = route.params;
  const [amount, setAmount] = useState<number>(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleClick = () => {
    const withdrawalInfo: WithdrawalInfo = {
      currency: currency,
      amount: amount,
      method: 'Interac e-Transfer',
      bankAccount: {
        bankName: 'TD Canada Trust',
        accountNumber: '123456789',
        accountName: 'sample@crypto.com',
      },
      fee: 1.99,
      receiveAmount: parseFloat(formatAmount(amount - 1.99, currency)),
    };
    navigation.navigate('ConfirmWithdrawal', { withdrawalInfo });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header title="Withdraw CAD" showBackButton showInfoButton onPress={
          () => navigation.navigate('WithdrawInfo')
        } />
        <View style={{ flex: 1 }}>
          {/* Amount input */}
          <AmountInput onAmountChange={handleAmountChange} currency={currency} />

          {/* Daily limit */}
          <DailyLimit used={5000} total={25000} />
        </View>
        <View style={styles.bottomButton}>
          <Button onPress={handleClick} amount={amount} text={'Withdraw'} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
