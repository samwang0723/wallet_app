// components/Header/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

export const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 0,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
