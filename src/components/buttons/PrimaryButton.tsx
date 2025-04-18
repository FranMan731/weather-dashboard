// Versión simplificada de PrimaryButton.tsx
import React from 'react';
import { BaseButton } from './BaseButton';
import { useTheme } from '@/contexts/ThemeContext';
import { ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  isLoading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const theme = useTheme();
  
  return (
    <BaseButton
      onPress={onPress}
      disabled={disabled}
      isLoading={isLoading}
      style={{
        ...style,
        backgroundColor: theme.colors.primary,
        width: fullWidth ? '100%' : undefined,
      }}
      textStyle={{
        color: theme.colors.button.primaryText,
      }}
    >
      {title}
    </BaseButton>
  );
};