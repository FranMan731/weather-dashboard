import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/texts/Text";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme } from "@/theme/darkTheme";
import { Ionicons } from "@expo/vector-icons";

interface ErrorScreenProps {
  error: Error;
  onRetry?: () => void;
}

export const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Ionicons
        name="warning-outline"
        size={48}
        color={theme.colors.error}
        style={styles.icon}
      />
      <Text style={styles.title}>Application Error</Text>
      <Text style={styles.errorMessage}>{error.message}</Text>

      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Ionicons name="reload" size={20} color={theme.colors.text} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (theme: typeof darkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      padding: theme.spacing.xl,
    },
    icon: {
      marginBottom: theme.spacing.m,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.error,
      marginBottom: theme.spacing.s,
      textAlign: "center",
    },
    errorMessage: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    retryButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: theme.spacing.m,
      paddingVertical: theme.spacing.s,
      borderRadius: theme.borderRadius.medium,
      marginTop: theme.spacing.m,
    },
    retryText: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginLeft: theme.spacing.s,
    },
  });
