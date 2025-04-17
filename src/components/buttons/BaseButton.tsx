import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/theme/ThemeContext";

interface BaseButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const styles = useButtonStyles();

  return (
    <TouchableOpacity
      style={[styles.baseButton, style, { opacity: disabled ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.baseButtonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const useButtonStyles = () => {
  const theme = useTheme();

  return useStyles().create({
    baseButton: {
      alignItems: "center" as const,
      justifyContent: "center" as const,
      paddingVertical: theme.spacing.s,
      paddingHorizontal: theme.spacing.m,
      borderRadius: theme.borderRadius.medium,
      minWidth: 120,
    },
    baseButtonText: {
      fontWeight: "600" as const,
      fontSize: theme.typography.body.fontSize,
    },
  });
};