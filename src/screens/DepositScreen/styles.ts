// screens/DepositScreen/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  bottomButton: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  infoNote: {
    color: COLORS.text,
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
});
