import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 0,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
    flexWrap: 'wrap',
  },
  bulletIcon: {
    marginRight: SPACING.sm,
    color: COLORS.secondaryText,
  },
  bulletText: {
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    color: COLORS.secondaryText,
    fontSize: 12,
  },
  linkStyle: {
    color: COLORS.primary,
  },
});
