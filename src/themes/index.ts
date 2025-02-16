import { DefaultTheme } from 'styled-components/native';

export const theme: DefaultTheme = {
  colors: {
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
    error: '#FF0000', // Red for errors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  fontSizes: {
    xs: 9,
    sm: 11,
    base: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
