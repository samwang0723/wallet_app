import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/styles/theme';

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
    <View style={styles.container}>
      {/* Main "option" button */}
      <TouchableOpacity style={styles.selector} onPress={openModal}>
        <Text style={styles.selectorText}>{selectedVendor}</Text>
        <Ionicons name="chevron-down" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Bottom sheet–style modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        {/* Pressable backdrop (tapping outside closes the modal) */}
        <Pressable style={styles.modalOverlay} onPress={closeModal} />

        <View style={styles.modalContainer}>
          {/* Header row */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Provider</Text>
            <TouchableOpacity
              onPress={closeModal}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={24} color={COLORS.secondaryText} />
            </TouchableOpacity>
          </View>

          {/* Provider options list */}
          {vendorOptions.map((vendor) => {
            const isSelected = vendor === selectedVendor;
            return (
              <TouchableOpacity
                key={vendor}
                style={styles.optionRow}
                onPress={() => handleSelectVendor(vendor)}
              >
                <Text style={styles.optionText}>{vendor}</Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color="#0A84FF"
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
