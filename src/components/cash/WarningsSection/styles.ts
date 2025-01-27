import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 0,
    borderBottomColor: COLORS.border,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  warningIcon: {
    marginRight: SPACING.sm,
  },
  warningText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 12,
  },
});
