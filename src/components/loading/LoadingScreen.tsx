import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "@/components/texts/Text";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme } from "@/theme/darkTheme";

export const LoadingScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.text}>Loading application data...</Text>
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
    text: {
      marginTop: theme.spacing.m,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
  });
