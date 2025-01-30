// styles/theme.ts
import { Dimensions } from 'react-native';

export const COLORS = {
  primary: '#1099f9',         // Keep the bright iOS blue for buttons
  background: '#0b1326',      // Deeper navy/dark color
  cardBackground: '#151d30',  // For table sections (optional)
  text: '#FFFFFF',            // White text
  secondaryText: '#8a92a5',   // Gray for labels
  border: '#222a3d',          // Dark border
  warning: '#FFA500',         // Orange for exclamation icons
  disabledBackground: '#666', // Lighter grey for disabled buttons
  disabledText: '#ccc',       // Lighter grey for disabled text
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
