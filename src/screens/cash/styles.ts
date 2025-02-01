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
    borderColor: COLORS.text,
  },
  accountText: {
    color: COLORS.text,
    fontSize: 14,
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
    color: COLORS.secondaryText,
    fontSize: 12,
  },
  balance: {
    color: COLORS.text,
    fontSize: 24,
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
    backgroundColor: COLORS.actionButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  plusMinus: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '300',
  },
  actionText: {
    color: COLORS.text,
    fontSize: 12,
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
  /* Option rows */
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border, // or any dark gray you prefer
  },
  optionText: {
    color: COLORS.text,
    fontSize: 13,
    paddingLeft: 6,
  },
  optionBoldText: {
    color: COLORS.text,
    fontSize: 13,
    paddingLeft: 6,
    fontWeight: 'bold'
  },
  optionBoldTextColor: {
    color: COLORS.primary,
    fontSize: 13,
    paddingLeft: 6,
    fontWeight: 'bold'
  },
  noteText: {
    color: COLORS.secondaryText, // Lighter gray
    fontSize: 11,
    marginTop: 20,
    paddingHorizontal: 22,
  },
  /* Withdraw info screen */
  // Big heading
  mainHeading: {
    marginTop: 2,
    fontSize: 17,
    color: COLORS.text,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Steps container
  stepsContainer: {
    marginTop: 16,
    // fill available space
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  iconContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    top: 30, // just below the icon
    left: '50%',
    width: 1,
    backgroundColor: COLORS.border,
  },
  textContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.secondaryText,
  },

  // Footer
  footerText: {
    fontSize: 11,
    color: COLORS.secondaryText,
    marginTop: 6,
    marginBottom: 12,
    textAlign: 'center',
  },
});
