import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

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
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <View style={styles.container}>
          <View style={styles.centerContainer}>
            {/* Checkmark in a circle */}
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={40} color="white" />
            </View>

            {/* Subheading */}
            <Text style={styles.subheadingText}>{subheading}</Text>

            {/* Main heading */}
            <Text style={styles.headingText}>{heading}</Text>
          </View>

          {/* Bottom note */}
          <Text style={styles.tapToContinue}>Tap anywhere to continue</Text>
        </View>
      </Pressable>
    </Modal>
  );
};
