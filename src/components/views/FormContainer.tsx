import React from "react";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import { AuthFormContainerProps } from "@/types/auth";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/contexts/ThemeContext";

export const FormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  title,
}) => {
  const styles = useViewStyles();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const useViewStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();

  return create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.blueVariant,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    formContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 15,
      padding: theme.spacing.l,
      shadowColor: theme.colors.surface,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.colors.text,
      marginBottom: 30
    },
  });
};
