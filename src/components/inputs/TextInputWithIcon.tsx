import React from 'react';
import { View, StyleSheet, TextInputProps } from 'react-native';
import { TextInputBase } from './TextInputBase';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';

interface TextInputWithIconProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconPosition?: 'left' | 'right';
}

export const TextInputWithIcon: React.FC<TextInputWithIconProps> = observer(({
  iconName,
  iconPosition = 'left',
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = useInputIconStyles(theme);

  return (
    <View style={styles.container}>
      {iconPosition === 'left' && (
        <Ionicons
          name={iconName}
          size={20}
          color={theme.colors.textSecondary}
          style={styles.iconLeft}
        />
      )}

      <TextInputBase
        style={[
          styles.input,
          iconPosition === 'left' && styles.inputWithLeftIcon,
          iconPosition === 'right' && styles.inputWithRightIcon,
          style,
        ]}
        {...props}
      />

      {iconPosition === 'right' && (
        <Ionicons
          name={iconName}
          size={20}
          color={theme.colors.textSecondary}
          style={styles.iconRight}
        />
      )}
    </View>
  );
});

const useInputIconStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      justifyContent: 'center',
    },
    iconLeft: {
      position: 'absolute',
      left: theme.spacing.m,
      zIndex: 1,
    },
    iconRight: {
      position: 'absolute',
      right: theme.spacing.m,
      zIndex: 1,
      top: 10
    },
    input: {
      paddingVertical: 10,
      paddingHorizontal: theme.spacing.m,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.background,
    },
    inputWithLeftIcon: {
      paddingLeft: theme.spacing.xxl, // espacio para el ícono
    },
    inputWithRightIcon: {
      paddingRight: theme.spacing.xxl,
    },
  });
