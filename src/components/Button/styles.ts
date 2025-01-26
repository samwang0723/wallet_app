import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.sm,
    borderRadius: SPACING.xs,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    color: COLORS.text,
  },
});
