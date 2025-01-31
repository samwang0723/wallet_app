import React, { useState } from 'react';
import { styles } from './styles';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { AmountInput } from '@/components/cash/AmountInput/AmountInput';
import { DailyLimit } from '@/components/cash/DailyLimit/DailyLimit';
import { Button } from '@/components/cash/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';


export const InitWithdrawalScreen = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleClick = () => {
    console.log('Withdraw button pressed');
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header title="Withdraw CAD" showBackButton showInfoButton onPress={
          () => navigation.navigate('WithdrawInfo')
        } />
        <View style={{ flex: 1 }}>
          {/* Amount input */}
          <AmountInput onAmountChange={handleAmountChange} />

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
