import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

interface InputProps extends TextInputProps {
  keyboardType: KeyboardTypeOptions;
  placeholder?: string;
  title?: string;
  helperText?: string;
  sideView?: React.ReactNode;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  isError?: boolean;
  errorText?: string | undefined;
  value?: string;
  required?: boolean;
  fontSize?: number | 14;
}

export const InputField: React.FC<InputProps> = ({
  keyboardType,
  placeholder,
  title,
  helperText,
  sideView,
  onChangeText,
  onBlur,
  onFocus,
  isError,
  errorText,
  value,
  required,
  fontSize,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View className="pt-2">
      {/* Label */}
      <View className="flex-row items-center">
        <Text variant="md" color="secondaryText">
          {title}
        </Text>
        {required && (
          <Text variant="md" color="error">
            {' '}
            *
          </Text>
        )}
      </View>

      {/* Input container with border */}
      <View
        testID="input-container"
        className="flex-row items-center border rounded-md p-3 my-3"
        style={{
          borderColor: isError
            ? theme.colors.error
            : isFocused
              ? theme.colors.primary
              : theme.colors.border,
          backgroundColor: theme.colors.cardBackground,
        }}
      >
        <TextInput
          testID={testID}
          className="flex-1 py-1"
          style={{ color: theme.colors.text, fontSize: fontSize }}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.secondaryText}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={value}
        />
        {sideView}
      </View>

      {/* Optional Helper */}
      {(isError ? errorText : helperText) && (
        <Text
          variant="base"
          color={isError ? 'error' : 'secondaryText'}
          style={{ marginBottom: 8 }}
        >
          {isError ? errorText : helperText}
        </Text>
      )}
    </View>
  );
};
