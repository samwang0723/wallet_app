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
    alignItems: 'flex-start',
    marginVertical: SPACING.xs,
  },
  warningIcon: {
    marginRight: SPACING.sm,
  },
  warningText: {
    color: COLORS.text,
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  linkStyle: {
    color: COLORS.primary,
  },
});
