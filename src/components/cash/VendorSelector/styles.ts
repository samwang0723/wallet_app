import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background, // example dark background
  },
  selector: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  selectorText: {
    color: COLORS.text,
    paddingRight: SPACING.xs,
    fontSize: 12,
  },
  /* Modal backdrop */
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.modalBackground,
    // By default, tapping the overlay will close the modal in VendorSelector
  },

  /* Bottom sheet container */
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
    // Enough padding to accommodate items below
  },

  /* Header row */
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // center the title horizontally
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
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
  },
});
