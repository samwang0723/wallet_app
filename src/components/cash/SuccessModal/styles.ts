// styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.transactionStatus,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xl, // Adjust as needed
    paddingHorizontal: SPACING.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  subheadingText: {
    color: COLORS.text,
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  headingText: {
    color: COLORS.text,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tapToContinue: {
    color: COLORS.text,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20, // Adjust as needed
  },
});
