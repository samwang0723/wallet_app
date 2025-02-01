import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/styles/theme';
import { currencyDecimals } from '@/utils';

/**
 * AmountInput component recreating the “Amount” field, the box with
 * “CAD” on the right, and the fee note below it.
 */
interface AmountInputProps {
  onAmountChange: (amount: number) => void;
  currency: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  onAmountChange,
  currency,
}) => {
  const [amount, setAmount] = useState<string>('');
  const handleAmountChange = (value: string) => {
    const decimals = currencyDecimals[currency] || 2;
    // Remove all non-numeric characters except decimal
    let sanitizedValue = value.replace(/[^\d.]/g, '');

    if (decimals === 0) {
      // For currencies with no decimal places, remove decimal and following digits
      sanitizedValue = sanitizedValue.split('.')[0];
    } else {
      // Remove leading zeros unless the number is '0.' or '0'
      sanitizedValue = sanitizedValue.replace(/^0+(?=\d)/, '');
      // Handle multiple decimal points
      const parts = sanitizedValue.split('.');
      if (parts.length > 2) {
        sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
      }

      // Limit decimal places
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, decimals);
        sanitizedValue = parts[0] + '.' + parts[1];
      }
    }

    // Update 'amount' state
    setAmount(sanitizedValue);

    // If empty or '.', treat as zero
    if (sanitizedValue === '' || sanitizedValue === '.') {
      onAmountChange(0);
      return;
    }

    const numValue = parseFloat(sanitizedValue);
    if (!isNaN(numValue)) {
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
    <View style={styles.amountContainer}>
      {/* Label */}
      <Text style={styles.label}>Amount</Text>

      {/* Input container with border, “20.00”, and “CAD” + flag on right */}
      <View style={styles.amountInputWrapper}>
        <TextInput
          style={styles.amountInput}
          placeholder="20.00"
          placeholderTextColor={COLORS.secondaryText}
          keyboardType="decimal-pad"
          onChangeText={handleAmountChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={amount}
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
