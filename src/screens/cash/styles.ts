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
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.md,
    borderTopWidth: 0,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  accountType: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  flag: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  accountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  balanceLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eyeButton: {
    padding: 4,  // This creates a larger touchable area
    marginLeft: 2,  // Space between text and icon
  },
  balanceLabel: {
    color: '#8E8E93',
    fontSize: 14,
  },
  balance: {
    color: 'white',
    fontSize: 26,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00254f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  plusMinus: {
    color: '#0A84FF',
    fontSize: 28,
    fontWeight: '300',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1C1C1E',
  },
  navItem: {
    alignItems: 'center',
  },
  tradeButton: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: -30,
  },
  navText: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
  },
  tradeText: {
    color: 'white',
  },
});
