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
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 14,
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
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  transactionSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    color: '#8E8E93',
    fontSize: 14,
  },
  dot: {
    color: '#8E8E93',
    marginHorizontal: 6,
  },
  transactionStatus: {
    color: '#58c5b5',
    fontSize: 14,
  },
  transactionAmount: {
    color: 'white',
    fontSize: 16,
  },
});
