import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/theme/ThemeContext';

interface LinkButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  underline?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  title,
  onPress,
  disabled = false,
  underline = false,
}) => {
  const styles = useLinkButtonStyles();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.linkContainer}
      activeOpacity={0.6}
    >
      <Text style={[
        styles.linkText,
        underline && styles.underline,
        disabled && styles.disabled
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const useLinkButtonStyles = () => {
  const theme = useTheme();
  
  return useStyles().create({
    linkContainer: {
      padding: theme.spacing.s,
      alignSelf: 'flex-start',
    },
    linkText: {
      color: theme.colors.primary,
      fontSize: theme.typography.body.fontSize,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    disabled: {
      color: theme.colors.textDisabled,
      opacity: 0.6,
    },
  });
};