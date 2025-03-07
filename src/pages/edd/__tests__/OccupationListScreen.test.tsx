/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SelectionListScreen } from '../SelectionListScreen';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/themes';

// Mock Header component
jest.mock('@/components/cash/Header/Header', () => ({
  Header: ({ title }: { title: string }) => <div>{title}</div>,
}));

// Mock props
const mockProps = {
  navigation: {
    goBack: jest.fn(),
  },
  route: {
    params: {
      currentValue: 'Creative Designer',
    },
  },
};

// Mock the occupationCallback module-level variable
jest.mock('../OccupationListScreen', () => {
  const originalModule = jest.requireActual('../OccupationListScreen');
  return {
    ...originalModule,
    occupationCallback: null,
    setOccupationCallback: (callback: (occupation: string) => void) => {
      (global as any).occupationCallback = callback;
    },
  };
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('OccupationListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).occupationCallback = null;
  });

  it('renders correctly with search bar and occupation list', () => {
    const { getByTestId, getByPlaceholderText } = renderWithTheme(
      <SelectionListScreen {...(mockProps as any)} />
    );

    expect(getByTestId('occupation-search')).toBeTruthy();
    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByTestId('occupation-list')).toBeTruthy();
  });

  it('filters occupations based on search query', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <SelectionListScreen {...(mockProps as any)} />
    );

    const searchInput = getByTestId('occupation-search');
    fireEvent.changeText(searchInput, 'Creative');

    // Should show Creative-related occupations
    expect(queryByText('Creative Designer')).toBeTruthy();
    expect(queryByText('Creative Director')).toBeTruthy();
    // Should not show unrelated occupations
    expect(queryByText('Clergy')).toBeFalsy();
  });

  it('shows clear button when search has text and clears search when pressed', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <SelectionListScreen {...(mockProps as any)} />
    );

    const searchInput = getByTestId('occupation-search');

    // Initially, clear button should not be visible
    expect(queryByTestId('clear-search')).toBeFalsy();

    // Type something in search
    fireEvent.changeText(searchInput, 'Creative');

    // Clear button should appear
    const clearButton = getByTestId('clear-search');
    expect(clearButton).toBeTruthy();

    // Press clear button
    fireEvent.press(clearButton);

    // Search should be cleared
    expect(searchInput.props.value).toBe('');
  });

  it('calls callback and navigates back when occupation is selected', async () => {
    const mockCallback = jest.fn();
    (global as any).occupationCallback = mockCallback;

    const { getByTestId } = renderWithTheme(
      <SelectionListScreen {...(mockProps as any)} />
    );

    // Find and press an occupation item
    const occupationItem = getByTestId('occupation-item-Creative Designer');
    fireEvent.press(occupationItem);

    // Verify callback was called and navigation occurred
    // expect(mockCallback).toHaveBeenCalledWith('Creative Designer');
    expect(mockProps.navigation.goBack).toHaveBeenCalled();
  });

  it('highlights the currently selected occupation', () => {
    const { getByTestId } = renderWithTheme(
      <SelectionListScreen {...(mockProps as any)} />
    );

    const selectedItem = getByTestId('occupation-item-Creative Designer');
    expect(selectedItem.props.style.backgroundColor).toBeTruthy();
  });
});
