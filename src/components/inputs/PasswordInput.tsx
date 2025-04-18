import React, { useState } from "react";
import { TextInputBase } from "./TextInputBase";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useTheme } from '@/contexts/ThemeContext';
import { useStyles } from "@/hooks/useStyles";

export const PasswordInput: React.FC<
  React.ComponentProps<typeof TextInputBase>
> = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const styles = useInputIconStyles();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInputBase
        style={[styles.input, styles.passwordInput]}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        editable={props.editable}
        label={props.label}
      />
      <Pressable onPress={toggleSecureEntry}>
        <Ionicons
          name={secureTextEntry ? "eye-off" : "eye"}
          size={20}
          color={theme.colors.textSecondary}
          style={styles.iconRight}
        />
      </Pressable>
    </View>
  );
};

const useInputIconStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();

  return create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconRight: {
      position: 'absolute',
      right: theme.spacing.m,
      zIndex: 1,
      top: -5
    },
    input: {
      flex: 1,
      paddingVertical: theme.spacing.l,
    },
    inputWithRightIcon: {
      paddingRight: theme.spacing.m,
    },
    passwordInput: {
      paddingRight: theme.spacing.xxl,
    },
  });
};
