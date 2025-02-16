import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

interface ButtonProps {
  code: string;
  timeout: number;
  onPress: () => void;
}

export const EmailButton: React.FC<ButtonProps> = ({
  code,
  timeout,
  onPress,
}) => {
  const [countdown, setCountdown] = useState(timeout);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false); // Reset timer when countdown reaches 0
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, isTimerActive]);

  const handlePress = () => {
    onPress();
    setIsTimerActive(true);
    setCountdown(timeout);
  };

  const isButtonDisabled = isTimerActive && countdown > 0;

  return (
    <View className="py-1.5 items-center">
      {isTimerActive && (
        <View className="flex-row justify-between items-center mb-1">
          <View className="flex-1 mr-1.5">
            <Text variant="base" color="secondaryText">
              Ensure the 4-digit verification code shown here and the one in the
              email subject line match up.
            </Text>
          </View>

          <View
            className="border border-primary rounded-lg px-4 py-2 my-4"
            style={{ borderColor: theme.colors.primary }}
          >
            <Text variant="base" color="primary" weight="medium">
              {code}
            </Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        className="w-full p-4 rounded items-center"
        style={{
          backgroundColor: isButtonDisabled
            ? theme.colors.primaryDisable
            : theme.colors.primary,
        }}
        onPress={handlePress}
        disabled={isButtonDisabled}
      >
        <Text
          variant="md"
          weight="medium"
          color={isButtonDisabled ? 'textDisabled' : 'text'}
          className="text-center"
        >
          {isTimerActive
            ? `Email Sent. Available again in ${countdown}s`
            : 'Send Info To Email'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
