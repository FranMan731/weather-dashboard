import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/contexts/ThemeContext";

interface BaseButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onPress,
  style,
  textStyle,
  isLoading = false,
  disabled = false,
}) => {
  const styles = useButtonStyles();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.baseButton,
        style,
        { opacity: disabled ? 0.6 : 1 },
        pressed && styles.buttonPressed,
        isLoading && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.baseButtonText, textStyle]}>{children}</Text>
      )}
    </Pressable>
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
    buttonPressed: {
      backgroundColor: theme.colors.button.pressed,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.button.disabled,
    },
  });
};
