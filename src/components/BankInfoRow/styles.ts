import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    // If you want each row a *slightly lighter* color than the screen background:
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: 12,
    color: COLORS.secondaryText,
    // textTransform: 'uppercase',
    marginTop: SPACING.xs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    flexShrink: 1,
    marginRight: SPACING.sm,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  copyButton: {
    padding: SPACING.xs,
  },
});
