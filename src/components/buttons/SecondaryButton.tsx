import React from 'react';
import { BaseButton } from './BaseButton';
import { useTheme } from '@/contexts/ThemeContext';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        width: fullWidth ? '100%' : undefined,
      }}
      textStyle={{
        color: theme.colors.textSecondary,
      }}
    >
      {title}
    </BaseButton>
  );
};