import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

interface SuccessModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Called when the modal is dismissed by tapping anywhere */
  onDismiss: () => void;
  /** Smaller text shown just under the checkmark */
  subheading?: string;
  /** Larger main text in the middle */
  heading?: string;
}

/**
 * A full-screen green "success" overlay with a checkmark icon,
 * two lines of text, and a bottom note. Tap anywhere to dismiss.
 */
export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onDismiss,
  subheading = 'Lorem ipsum dolor sit amet, consectetur',
  heading = 'Your bank transfer account is now ready to use',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      {/* Pressable to capture "tap anywhere" and dismiss */}
      <Pressable
        className="flex-1"
        style={{ backgroundColor: theme.colors.transactionStatus }}
        onPress={onDismiss}
      >
        <View className="flex-1 justify-between items-center py-8 px-4">
          <View className="flex-1 justify-center items-center">
            {/* Checkmark in a circle */}
            <View
              className="w-20 h-20 rounded-full border-2 border-text justify-center items-center mb-6"
              style={{ borderColor: theme.colors.text }}
            >
              <Ionicons name="checkmark" size={40} color={theme.colors.text} />
            </View>

            {/* Subheading */}
            <Text variant="md" color="text" className="mb-5 text-center">
              {subheading}
            </Text>

            {/* Main heading */}
            <Text
              variant="xl"
              weight="bold"
              color="text"
              className="text-center"
            >
              {heading}
            </Text>
          </View>

          {/* Bottom note */}
          <Text variant="md" color="text" className="text-center mb-5">
            Tap anywhere to continue
          </Text>
        </View>
      </Pressable>
    </Modal>
  );
};
