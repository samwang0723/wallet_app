import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';

/**
 * AmountInput component recreating the “Amount” field, the box with
 * “CAD” on the right, and the fee note below it.
 */
interface AmountInputProps {
  onAmountChange: (amount: number) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ onAmountChange }) => {
  const [amount, setAmount] = useState<string>('');

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onAmountChange(numericValue);
    } else {
      onAmountChange(0);
    }
  };

  return (
    <View style={styles.amountContainer}>
      {/* Label */}
      <Text style={styles.label}>Amount</Text>

      {/* Input container with border, “20.00”, and “CAD” + flag on right */}
      <View style={styles.amountInputWrapper}>
        <TextInput
          style={styles.amountInput}
          placeholder='20.00'
          placeholderTextColor={COLORS.secondaryText}
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
        />
        {/* Right side: flag icon + “CAD” */}
        <View style={styles.currencyContainer}>
          {/* Placeholder: Replace with your own flag image or Ionicon */}
          {/* Example: <Image source={require('./assets/cad-flag.png')} ... /> */}
          <Image
            source={{ uri: 'https://flagcdn.com/w80/ca.png' }}
            style={styles.flag}
          />
          <Text style={styles.currencyText}>CAD</Text>
        </View>
      </View>

      {/* Fee note */}
      <Text style={styles.feeText}>
        A $1.99 fee will be applied to this transaction
      </Text>
    </View>
  );
};
