import { COLORS, SPACING } from '@/styles/theme';
import {
  StyleSheet,
  Platform,
} from 'react-native';

export const styles = StyleSheet.create({
  // ============== AMOUNT INPUT STYLES ==============
  amountContainer: {
    padding: SPACING.md,
    marginBottom: 16,
  },
  label: {
    color: COLORS.secondaryText, // Lighter gray
    fontSize: 12,
    marginBottom: 8,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.primary, // Approx. bluish border
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
  },
  amountInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    color: COLORS.text,
    fontSize: 13,
  },
  feeText: {
    color: COLORS.secondaryText, // Lighter gray
    fontSize: 12,
    marginTop: 6,
  },
  flag: {
    width: 16,
    height: 16,
    borderRadius: 10,
    marginRight: 4,
    borderWidth: 1,
    borderColor: COLORS.text,
  },
});
