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
  bankInfoCard: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: 8,
    overflow: 'hidden',           // So corners stay rounded
    backgroundColor: COLORS.cardBackground || COLORS.background,
  },
  infoNote: {
    color: COLORS.text,
    fontSize: 12,
    marginHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  bottomButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderTopWidth: 0,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
});
