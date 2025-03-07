/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from '@/themes';
import { ThemeStyleUtilProps, themeStyle } from '@/utils';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import styled from 'styled-components/native';

type TextProps = {
  variant?: string;
  weight?: string;
  color?: string;
} & RNTextProps &
  ThemeStyleUtilProps;

export const Text = styled(RNText)<TextProps>`
  font-size: ${({ variant }: { variant?: string }) =>
    theme.fontSizes[variant || 'base']}px;
  font-weight: ${({ weight }: { weight?: string }) =>
    theme.weights[weight || 'regular']};
  color: ${({ color }: { color?: string }) => theme.colors[color || 'text']};

  ${({ theme, ...props }: { theme: any } & TextProps) =>
    themeStyle({ ...props, theme })};
`;
