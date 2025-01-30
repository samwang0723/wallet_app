import { Dimensions } from 'react-native';

export const COLORS = {
  primary: '#1099f9', // Keep the bright iOS blue for buttons
  primaryDisable: '#0e5790', // Slightly darker blue for disabled buttons
  background: '#0b1326', // Deeper navy/dark color
  cardBackground: '#151d30', // For table sections (optional)
  text: '#FFFFFF', // White text
  textDisabled: '#858992', // Lighter grey for disabled text
  secondaryText: '#8a92a5', // Gray for labels
  border: '#222a3d', // Dark border
  warning: '#FFA500', // Orange for exclamation icons
  actionButtonBackground: '#00254f', // Dark blue for action buttons
  transactionStatus: '#58c5b5', // Green for transaction status
  modalBackground: 'rgba(0, 0, 0, 0.5)', // Dark overlay for modals
  toastBackground: '#333', // Dark grey for toasts
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const DIMENSIONS = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};
