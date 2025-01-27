import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    color: COLORS.text,
  },
});
