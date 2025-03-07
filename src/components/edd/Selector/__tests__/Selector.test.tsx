import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Selector } from '../Selector';
import { useNavigation } from '@react-navigation/native';
import { setOccupationCallback } from '@/pages/edd/SelectionListScreen';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/themes';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock setOccupationCallback
jest.mock('@/pages/edd/OccupationListScreen', () => ({
  setOccupationCallback: jest.fn(),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('OccupationSelector', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Selector onChange={mockOnChange} />
    );

    expect(getByText('Occupation')).toBeTruthy();
    expect(getByText('Your occupation')).toBeTruthy();
    expect(getByTestId('occupation-selector')).toBeTruthy();
  });

  it('renders with a selected value', () => {
    const { getByText } = renderWithTheme(
      <Selector value="Software Engineer" onChange={mockOnChange} />
    );

    expect(getByText('Software Engineer')).toBeTruthy();
  });

  it('shows required asterisk when required prop is true', () => {
    const { getByText } = renderWithTheme(
      <Selector onChange={mockOnChange} required />
    );

    expect(getByText('*')).toBeTruthy();
  });

  it('navigates to OccupationList and sets callback when pressed', () => {
    const { getByTestId } = renderWithTheme(
      <Selector value="Developer" onChange={mockOnChange} />
    );

    fireEvent.press(getByTestId('occupation-selector'));

    expect(setOccupationCallback).toHaveBeenCalledWith(mockOnChange);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('OccupationList', {
      currentValue: 'Developer',
    });
  });
});
