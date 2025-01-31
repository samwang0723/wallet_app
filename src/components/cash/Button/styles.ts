import { COLORS, SPACING } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryDisable,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 13,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: COLORS.textDisabled,
  },
});
