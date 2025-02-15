import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';

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
    <View style={styles.container}>
      {isTimerActive && (
        <View style={styles.topContainer}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Ensure the 4-digit verification code shown here and the one in the
              email subject line match up.
            </Text>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{code}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={isButtonDisabled}
      >
        <Text
          style={[
            styles.buttonText,
            isButtonDisabled && styles.buttonTextDisabled,
          ]}
        >
          {isTimerActive
            ? `Email Sent. Available again in ${countdown}s`
            : 'Send Info To Email'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
