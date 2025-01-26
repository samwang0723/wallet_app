// styles/theme.ts
import { Dimensions } from 'react-native';

export const COLORS = {
  primary: '#007AFF',         // Keep the bright iOS blue for buttons
  background: '#0A0C12',      // Deeper navy/dark color
  cardBackground: '#1A1B1E',  // For table sections (optional)
  text: '#FFFFFF',            // White text
  secondaryText: '#8E8E93',   // Gray for labels
  border: '#2C2C2E',          // Dark border
  warning: '#FFA500',         // Orange for exclamation icons
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
