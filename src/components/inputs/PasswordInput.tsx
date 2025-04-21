import React, { useState } from "react";
import { TextInputBase } from "./TextInputBase";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { useTheme } from '@/contexts/ThemeContext';
import { useStyles } from "@/hooks/useStyles";
import { observer } from "mobx-react-lite";

export const PasswordInput: React.FC<
  React.ComponentProps<typeof TextInputBase>
> = observer((props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const styles = useInputIconStyles();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInputBase
        {...props}
        style={styles.input}
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
});

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
      width: '100%',
      paddingVertical: theme.spacing.m,
    },
    inputWithRightIcon: {
      paddingRight: theme.spacing.m,
    },
    passwordInput: {
      paddingRight: theme.spacing.xxl,
    },
  });
};
