/* eslint-disable  @typescript-eslint/no-require-imports */
import React from 'react';
import { Modal, Pressable, View, Image } from 'react-native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

interface EddResultModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Called when the modal is dismissed by tapping anywhere */
  onDismiss: () => void;
  /** Smaller text shown just under the checkmark */
  subheading?: string;
  /** Larger main text in the middle */
  heading?: string;
}

const images = {
  pending: require('@/assets/edd/pending.png'),
};

/**
 * A full-screen green "success" overlay with a checkmark icon,
 * two lines of text, and a bottom note. Tap anywhere to dismiss.
 */
export const EddResultModal: React.FC<EddResultModalProps> = ({
  visible,
  onDismiss,
  subheading = '',
  heading = '',
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Pressable to capture "tap anywhere" and dismiss */}
      <Pressable
        className="flex-1"
        style={{ backgroundColor: theme.colors.background }}
        onPress={onDismiss}
      >
        <View className="flex-1 justify-between items-center py-8 px-4">
          <View className="flex-1 justify-center items-center">
            {/* Checkmark in a circle */}
            <View
              className="w-20 h-20 rounded-full border-2 border-text justify-center items-center mb-6"
              style={{ borderColor: theme.colors.border }}
            >
              <Image source={images.pending} className="w-10 h-10" />
            </View>

            {/* Subheading */}
            <Text variant="md" color="text">
              {subheading}
            </Text>

            {/* Main heading */}
            <Text
              variant="lg"
              color="text"
              style={{ marginTop: 20, textAlign: 'center' }}
            >
              {heading}
            </Text>
          </View>

          {/* Bottom note */}
          <Text variant="md" color="text" style={{ marginBottom: 20 }}>
            Tap anywhere to continue
          </Text>
        </View>
      </Pressable>
    </Modal>
  );
};
