import { COLORS, SPACING } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ============== DAILY LIMIT STYLES ==============
  dailyLimitContainer: {
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    color: COLORS.secondaryText,
    fontSize: 12,
    marginVertical: 12,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  limitText: {
    color: '#a0a9be',
    fontSize: 12,
    marginBottom: 10,
  },
  progressBarBackground: {
    backgroundColor: '#1f283c',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: COLORS.transactionStatus, // green fill
  },
  limitNote: {
    color: COLORS.secondaryText,
    fontSize: 12,
    marginTop: 4,
  },
});
