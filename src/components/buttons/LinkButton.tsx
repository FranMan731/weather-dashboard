import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from '@/components/texts/Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface LinkButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  style?: ViewStyle;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  onPress,
  disabled = false,
  icon,
  style,
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.6 : 1,
      }, style]}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={theme.colors.primary}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={{ color: theme.colors.primary }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};