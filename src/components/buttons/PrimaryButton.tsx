// Versión simplificada de PrimaryButton.tsx
import React from 'react';
import { BaseButton } from './BaseButton';
import { useTheme } from '@/contexts/ThemeContext';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  fullWidth = false,
}) => {
  const theme = useTheme();
  
  return (
    <BaseButton
      onPress={onPress}
      disabled={disabled}
      style={{
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