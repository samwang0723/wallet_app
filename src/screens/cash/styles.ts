// screens/DepositScreen/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

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
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 8,
  },
  eyeButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  transaction: {
    marginBottom: 16,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  positiveAmount: {
    color: '#34C759',
  },
});
