import React from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from '@/contexts/ThemeContext';

interface TextInputBaseProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const TextInputBase: React.FC<TextInputBaseProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  errorStyle,
  style,
  ...props
}) => {
  const styles = useInputStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={styles.placeholder.color}
        {...props}
      />

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const useInputStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();

  return create({
    container: {
      marginBottom: theme.spacing.m,
      width: '100%'
    },
    label: {
      color: theme.colors.text,
      fontSize: theme.typography.body.fontSize,
      marginBottom: theme.spacing.s,
    },
    input: {
      width: '100%',
      backgroundColor: theme.colors.input.background,
      color: theme.colors.input.text,
      borderWidth: 1,
      borderColor: theme.colors.input.border,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.m,
      paddingVertical: theme.spacing.l,
      fontSize: theme.typography.body.fontSize,
    },
    placeholder: {
      color: theme.colors.input.placeholder,
    },
    error: {
      color: theme.colors.error,
      fontSize: theme.typography.caption.fontSize,
      marginTop: theme.spacing.xs,
    },
  });
};
