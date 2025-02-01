import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '@/styles/theme';

const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.transactionStatus, // greenish background from screenshot
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    bottom: 0,
    position: 'absolute',
    // If you like, you can add some padding or top margin
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
    marginBottom: height / 2 - 140,
  },
  tapToContinue: {
    marginBottom: 50,
    color: COLORS.text,
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },
});
