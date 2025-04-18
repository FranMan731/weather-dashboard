import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface TextProps extends React.ComponentProps<typeof RNText> {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  style?: TextStyle;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  
  const textStyle = {
    color: theme.colors.text,
    ...theme.typography[variant],
    ...style,
  };
  
  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};