/* eslint-disable  @typescript-eslint/no-require-imports */
import React, { useCallback, useState } from 'react';
import { View, Image } from 'react-native';
import { currencyDecimals } from '@/utils';
import { WithdrawalProcessDetails } from '@/services/cash/model';
import Text from '@/components/ui/Text';
import InputField from '@/components/ui/InputField';
import { debounce } from 'lodash';

const images = {
  USD: require('@/assets/cash/USD.png'),
  CAD: require('@/assets/cash/CAD.png'),
  EUR: require('@/assets/cash/EUR.png'),
  GBP: require('@/assets/cash/GBP.png'),
  TRY: require('@/assets/cash/TRY.png'),
  AUD: require('@/assets/cash/AUD.png'),
  SGD: require('@/assets/cash/SGD.png'),
  BRL: require('@/assets/cash/BRL.png'),
  AED: require('@/assets/cash/AED.png'),
};

interface AmountInputProps {
  onAmountChange: (amount: number) => void;
  onError: (error: boolean) => void;
  details: WithdrawalProcessDetails;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  onAmountChange,
  onError,
  details,
}) => {
  const currency = details.details?.currency;
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  const validateError = useCallback(
    debounce((value: number) => {
      if (
        value < parseFloat(details.details.minimum_withdrawal_amount.amount)
      ) {
        setError('Amount is below the minimum withdrawal amount');
        onError(true);
      } else if (
        value > parseFloat(details.details.remaining_daily_quota.amount)
      ) {
        setError('Amount is above the remaining daily quota');
        onError(true);
      } else if (
        details.details.maximum_withdrawal_amount &&
        value > parseFloat(details.details.maximum_withdrawal_amount.amount)
      ) {
        setError('Amount is above the maximum withdrawal amount');
        onError(true);
      } else {
        setError(undefined);
        onError(false);
      }
    }, 300),
    [details]
  );

  const handleAmountChange = (value: string) => {
    const decimals = currencyDecimals[currency] || 2;
    let sanitizedValue = value.replace(/[^\d.]/g, '');

    if (decimals === 0) {
      sanitizedValue = sanitizedValue.split('.')[0];
    } else {
      sanitizedValue = sanitizedValue.replace(/^0+(?=\d)/, '');
      const parts = sanitizedValue.split('.');
      if (parts.length > 2) {
        sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
      }
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, decimals);
        sanitizedValue = parts[0] + '.' + parts[1];
      }
    }

    setAmount(sanitizedValue);

    if (sanitizedValue === '' || sanitizedValue === '.') {
      onAmountChange(0);
      return;
    }

    const numValue = parseFloat(sanitizedValue);
    if (!isNaN(numValue)) {
      validateError(numValue);
      onAmountChange(numValue);
    }
  };

  const handleBlur = () => {
    const decimals = currencyDecimals[currency] || 2;

    if (amount === '' || amount === '.') {
      setAmount('');
      return;
    }

    const numValue = parseFloat(amount.replace(/,/g, ''));
    if (!isNaN(numValue)) {
      // Use Intl.NumberFormat to format the value
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      const formattedValue = formatter.format(numValue);
      setAmount(formattedValue);
    }
  };

  const handleFocus = () => {
    // Remove any formatting (commas)
    const newValue = amount.replace(/,/g, '');
    setAmount(newValue);
  };

  return (
    <InputField
      keyboardType="decimal-pad"
      placeholder="100"
      title="Amount"
      helperText="A $10 fee will be deducted from your withdrawal amount"
      sideView={
        <View className="items-center flex-row">
          <Image
            source={images[currency as keyof typeof images]}
            className="w-4 h-4 mr-2"
          />
          <Text variant="md" color="text">
            {currency}
          </Text>
        </View>
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={handleAmountChange}
      value={amount}
      isError={!!error}
      errorText={error}
      fontSize={16}
    />
  );
};
