import React, { useState } from 'react';
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
import { WithdrawalInfo } from '@/domains/model';
import { WithdrawalProcessDetails } from '@/services/cash/model';
import { theme } from '@/themes';

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

export const InitWithdrawalScreen: React.FC<InitWithdrawalScreenProps> = ({
  route,
}) => {
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

  // Create a mock WithdrawalProcessDetails object
  const mockDetails: WithdrawalProcessDetails = {
    ok: true,
    details: {
      currency: currency,
      viban_type: 'standard',
      minimum_withdrawal_amount_in_usd: { currency: 'USD', amount: '10' },
      monthly_quota_in_usd: { currency: 'USD', amount: '100000' },
      daily_quota_in_usd: { currency: 'USD', amount: '25000' },
      used_daily_quota_in_usd: { currency: 'USD', amount: '5000' },
      used_monthly_quota_in_usd: { currency: 'USD', amount: '10000' },
      minimum_withdrawal_amount: { currency, amount: '10' },
      monthly_quota: { currency, amount: '100000' },
      daily_quota: { currency, amount: '25000' },
      used_daily_quota: { currency, amount: '5000' },
      used_monthly_quota: { currency, amount: '10000' },
      remaining_daily_quota: { currency, amount: '20000' },
      remaining_monthly_quota: { currency, amount: '90000' },
      remaining_daily_quota_in_usd: { currency: 'USD', amount: '20000' },
      remaining_monthly_quota_in_usd: { currency: 'USD', amount: '90000' },
      network_name: 'Interac',
      review_time_description: 'Instant',
      bank_transfer_time_description: '1-3 business days',
      had_deposited: true,
      had_withdrawn: false,
      fees: [],
      fee_amount: { currency, amount: '1.99' },
      fee_label: { translation_key: 'fee_label', translation_payload: [] },
      transactions_per_day: 10,
      transactions_per_month: 100,
      transactions_daily_count: 2,
      transactions_monthly_count: 5,
      remaining_transactions_daily_count: 8,
      remaining_transactions_monthly_count: 95,
      beneficiaries_count: 1,
      beneficiaries_max: 5,
      maximum_withdrawal_amount: { currency, amount: '10000' },
      maximum_withdrawal_amount_in_usd: { currency: 'USD', amount: '10000' },
      can_add_bank_account: true,
      can_delete_bank_account: true,
      max_bank_accounts: 5,
    },
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.colors.background }}
      >
        <Header
          title="Withdraw CAD"
          showBackButton
          showInfoButton
          onPress={() => navigation.navigate('WithdrawInfo')}
        />
        <View className="flex-1">
          <View className="px-4 pb-4">
            {/* Amount input */}
            <AmountInput
              onAmountChange={handleAmountChange}
              onError={() => {}}
              details={mockDetails}
            />
          </View>

          {/* Daily limit */}
          <DailyLimit used={5000} total={25000} />
        </View>
        <View
          className="px-4 py-4"
          style={{ borderColor: theme.colors.border }}
        >
          <Button onPress={handleClick} amount={amount} text={'Withdraw'} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
