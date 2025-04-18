import React from "react";
import { View, Text, Pressable } from "react-native";
import { AuthErrorBannerProps } from "@/types/auth";
import { useTheme } from "@/contexts/ThemeContext";
import { useStyles } from "@/hooks/useStyles";

export const ErrorBanner: React.FC<AuthErrorBannerProps> = ({
  error,
  onDismiss,
}) => {
    const styles = useBannerStyles();

  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error.message}</Text>
      <Pressable onPress={onDismiss} style={styles.dismissButton}>
        <Text style={styles.dismissText}>×</Text>
      </Pressable>
    </View>
  );
};

const useBannerStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();

  return create({
    container: {
        backgroundColor: theme.colors.banner.error.background,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      text: {
        color: theme.colors.banner.error.text,
        flex: 1,
      },
      dismissButton: {
        marginLeft: 10,
      },
      dismissText: {
        color: theme.colors.banner.error.text,
        fontSize: 20,
        fontWeight: 'bold',
      },
  });
};
