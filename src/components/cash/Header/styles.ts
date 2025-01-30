import { StyleSheet } from 'react-native';
import { COLORS } from '@/styles/theme';

export const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 0,
    marginBottom: 8,
  },
  // Left container: arrow or empty space
  leftContainer: {
    width: 56, // fixed width so center can truly be centered
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Center container: where the title is
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Right container: if you need something else on the right side
  rightContainer: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
