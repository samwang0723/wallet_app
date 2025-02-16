import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

/**
 * Defines the props for VendorSelector:
 * - `vendorOptions` is an array of strings (each string is a vendor name).
 * - `selectedVendor` is a string representing the currently chosen vendor.
 * - `onVendorSelect` is a callback function that returns the newly selected vendor string.
 */
interface VendorSelectorProps {
  vendorOptions: string[];
  selectedVendor: string;
  onVendorSelect: (vendor: string) => void;
}

export const VendorSelector: React.FC<VendorSelectorProps> = ({
  vendorOptions,
  onVendorSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // Store the selected vendor in local state
  const [selectedVendor, setSelectedVendor] = useState<string>(
    vendorOptions[0]
  );

  // Open/close the modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Handle vendor selection
  const handleSelectVendor = (vendor: string) => {
    setSelectedVendor(vendor);
    onVendorSelect(vendor);
    closeModal();
  };

  return (
    <View
      className="flex-1 justify-center py-1 px-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Main "option" button */}
      <TouchableOpacity
        className="px-4 py-2 rounded-3xl flex-row items-center self-start"
        style={{ backgroundColor: theme.colors.cardBackground }}
        onPress={openModal}
      >
        <Text variant="md" color="text" className="pr-1">
          {selectedVendor}
        </Text>
        <Ionicons name="chevron-down" size={22} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Bottom sheet–style modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        {/* Pressable backdrop */}
        <Pressable
          className="flex-1"
          style={{ backgroundColor: theme.colors.modalBackground }}
          onPress={closeModal}
        />

        <View
          className="absolute bottom-0 w-full rounded-t-xl pb-16 px-4"
          style={{ backgroundColor: theme.colors.cardBackground }}
        >
          {/* Header row */}
          <View className="flex-row items-center justify-center py-4 px-4">
            <Text variant="lg" weight="semibold" color="text">
              Select Provider
            </Text>
            <TouchableOpacity
              className="absolute right-2"
              onPress={closeModal}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.secondaryText}
              />
            </TouchableOpacity>
          </View>

          {/* Provider options list */}
          {vendorOptions.map((vendor) => {
            const isSelected = vendor === selectedVendor;
            return (
              <TouchableOpacity
                key={vendor}
                className="flex-row items-center justify-between py-5 px-4 border-b"
                style={{ borderColor: theme.colors.border }}
                onPress={() => handleSelectVendor(vendor)}
              >
                <Text variant="md" color="text">
                  {vendor}
                </Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={22}
                    color={theme.colors.primary}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </View>
  );
};
