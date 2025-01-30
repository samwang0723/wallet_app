import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

export const styles = StyleSheet.create({
  transactionsContainer: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: 8,
    overflow: 'hidden',           // So corners stay rounded
    backgroundColor: COLORS.cardBackground || COLORS.background,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  transactionsTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingLeft: 20,
  },
  transactionTitle: {
    color: COLORS.text,
    fontSize: 12,
    marginBottom: 4,
  },
  transactionSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    color: COLORS.secondaryText,
    fontSize: 12,
  },
  dot: {
    color: COLORS.secondaryText,
    marginHorizontal: 6,
  },
  transactionStatus: {
    color: COLORS.transactionStatus,
    fontSize: 12,
  },
  transactionAmount: {
    color: COLORS.text,
    fontSize: 14,
  },
});
