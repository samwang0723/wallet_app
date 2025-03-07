/* eslint-disable  @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

interface PasscodeModalProps {
  /** Whether this modal is visible */
  visible: boolean;
  withCancel?: boolean;
  /** Called once user has entered 6 digits */
  onSubmit: (passcode: string) => void;
  /** Called when user taps outside or hits "Cancel" */
  onClose?: () => void;
}

const images = {
  delete: require('@/assets/cash/delete.png'),
};

export const PasscodeModal: React.FC<PasscodeModalProps> = ({
  visible,
  withCancel,
  onSubmit,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  const [passcode, setPasscode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const MAX_LENGTH = 6;

  // always reset passcode when modal is shown
  useEffect(() => {
    if (visible) {
      setPasscode('');
      setIsLoading(false);
    }
  }, [visible]);

  useEffect(() => {
    // If passcode length reaches MAX_LENGTH, submit and reset
    if (passcode.length === MAX_LENGTH && !isLoading) {
      setIsLoading(true);

      // Handle async submission
      const handleSubmit = async () => {
        try {
          await onSubmit(String(passcode));
          setPasscode('');
          setIsLoading(false);
        } catch (error) {
          console.error('Error submitting passcode:', error);
        } finally {
          setIsLoading(false);
          setPasscode('');
        }
      };

      handleSubmit();
    }
  }, [passcode, onSubmit, isLoading]);

  // Handle numeric keypad presses
  const handleKeyPress = (value: string) => {
    if (!isLoading) {
      setPasscode((prev) => (prev.length < MAX_LENGTH ? prev + value : prev));
    }
  };

  const handleBackspacePress = () => {
    if (!isLoading) {
      setPasscode(passcode.slice(0, -1));
    }
  };

  // Render passcode circles
  const renderPasscodeCircles = () => (
    <View className="flex-row mt-8 mb-2">
      {Array.from({ length: MAX_LENGTH }, (_, i) => {
        const filled = i < passcode.length;
        if (filled) {
          return (
            <View
              key={i}
              testID="PasscodeModal-Circle-Indicator"
              className="w-5 h-5 rounded-full mx-4 border-2"
              style={{
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary,
              }}
            />
          );
        }
        return (
          <View
            key={i}
            testID="PasscodeModal-Circle-Indicator"
            className="w-5 h-5 rounded-full mx-4 border-2"
            style={{ borderColor: theme.colors.border }}
          />
        );
      })}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Outside overlay */}
      <TouchableOpacity
        className="flex-1 justify-center"
        style={{ backgroundColor: theme.colors.background }}
        activeOpacity={1}
        disabled={isLoading}
      >
        {/* TouchableOpacity as overlay must have a child to
            capture taps inside the content. */}
        <View
          className="flex-1 justify-between"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
          {/* Top Cancel Button */}
          {withCancel && (
            <View
              className="h-14 flex-row items-center border-b-0 px-4"
              style={{ backgroundColor: theme.colors.background }}
            >
              <TouchableOpacity
                className="ml-2 mt-2"
                onPress={onClose}
                disabled={isLoading}
              >
                <Text variant="md" color="text">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Title */}
          <View className="flex-1 justify-center items-center">
            <Text variant="lg" weight="bold" color="text">
              {isLoading ? 'Verifying passcode...' : 'Enter passcode'}
            </Text>
            {/* Passcode circles */}
            {renderPasscodeCircles()}

            {/* Loading indicator or Forgot passcode link */}
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.primary}
                style={{ marginTop: 20 }}
              />
            ) : (
              <TouchableOpacity
                className="mt-5"
                onPress={() => console.log('Forgot pressed')}
              >
                <Text variant="md" color="text">
                  Forgot passcode?
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Keypad */}
          <View
            className="flex-wrap flex-row w-full justify-center border-t-hairline border-b-hairline mb-4"
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.border,
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'].map(
              (digit) => (
                <TouchableOpacity
                  key={digit}
                  className="py-6 items-center justify-center"
                  style={{
                    width: '33.1%',
                    margin: '0.05%',
                    backgroundColor: theme.colors.background,
                  }}
                  onPress={() => handleKeyPress(digit)}
                  disabled={isLoading || digit === ''}
                >
                  <Text variant="xl" color="text">
                    {digit}
                  </Text>
                </TouchableOpacity>
              )
            )}
            {/* Delete button */}
            <TouchableOpacity
              testID="PasscodeModal-Backspace-Button"
              className="py-6 items-center justify-center"
              style={{
                width: '33.1%',
                margin: '0.05%',
                backgroundColor: theme.colors.background,
              }}
              onPress={handleBackspacePress}
              disabled={isLoading}
            >
              <Image source={images.delete} className="w-6 h-6" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PasscodeModal;
