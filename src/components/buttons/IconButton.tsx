import React from 'react';
import { BaseButton } from './BaseButton';
import { Ionicons } from '@expo/vector-icons';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/theme/ThemeContext';

interface IconButtonProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  size?: number;
  color?: string;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  size = 24,
  color,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = useIconButtonStyles();
  
  return (
    <BaseButton
      onPress={onPress}
      disabled={disabled}
      style={styles.iconButton}
    >
      <Ionicons
        name={iconName}
        size={size}
        color={color || (disabled ? theme.colors.textDisabled : theme.colors.primary)}
      />
    </BaseButton>
  );
};

const useIconButtonStyles = () => {
  return useStyles().create({
    iconButton: {
      backgroundColor: 'transparent',
      padding: 0,
      minWidth: 0,
    },
  });
};