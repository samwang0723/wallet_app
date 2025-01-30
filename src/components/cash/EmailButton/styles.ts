import { COLORS, SPACING } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 6,
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  instructionContainer: {
    flex: 1,
    marginRight: 6,
  },
  instructionText: {
    color: COLORS.secondaryText,
    fontSize: 12,
  },
  codeContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  codeText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabledBackground
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 13,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: COLORS.disabledText
  },
});
