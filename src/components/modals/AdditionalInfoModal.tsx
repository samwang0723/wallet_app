/* eslint-disable  @typescript-eslint/no-require-imports */
import React from 'react';
import { View, TouchableOpacity, Modal, Image } from 'react-native';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

const images = {
  edd: require('@/assets/cash/edd.png'),
};

interface AdditionalInfoModalProps {
  isVisible: boolean;
  onSubmit: () => void;
  onDismiss: () => void;
}

export const AdditionalInfoModal: React.FC<AdditionalInfoModalProps> = ({
  isVisible,
  onSubmit,
  onDismiss,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View
          className="w-full rounded-2xl p-6"
          style={{ backgroundColor: theme.colors.cardBackground }}
        >
          {/* Icon */}
          <View className="items-center mb-6 mt-6">
            <View
              className="w-20 h-20 rounded-full items-center justify-center border-4"
              style={{
                borderColor: theme.colors.border,
              }}
            >
              <Image
                source={images.edd}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                }}
              />
            </View>
          </View>

          {/* Title */}
          <Text
            variant="base"
            color="text"
            style={{ textAlign: 'center', marginBottom: 10 }}
          >
            Additional Info
          </Text>

          {/* Description */}
          <Text
            variant="base"
            color="text"
            style={{ textAlign: 'center', marginBottom: 30 }}
          >
            For regulatory reasons, we need to verify your address.
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={onSubmit}
            className="w-full rounded-md py-4 mb-4"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Text variant="md" color="text" style={{ textAlign: 'center' }}>
              Submit
            </Text>
          </TouchableOpacity>

          {/* Dismiss Button */}
          <TouchableOpacity onPress={onDismiss} className="w-full py-2">
            <Text variant="md" color="text" style={{ textAlign: 'center' }}>
              I&apos;ll do it later
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
