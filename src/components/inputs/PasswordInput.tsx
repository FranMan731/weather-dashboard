import React, { useState } from "react";
import { TextInputBase } from "./TextInputBase";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useStyles } from "@/hooks/useStyles";

export const PasswordInput: React.FC<
  React.ComponentProps<typeof TextInputBase>
> = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const styles = useInputIconStyles();

  return (
    <View style={styles.container}>
      <TextInputBase
        secureTextEntry={secureTextEntry}
        {...props}
        style={[styles.input, styles.inputWithRightIcon, props.style]}
        {...props}
      />
      <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
        <Ionicons
          name={secureTextEntry ? "eye-off" : "eye"}
          size={20}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>
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
      marginLeft: theme.spacing.s,
    },
    input: {
      flex: 1,
    },
    inputWithRightIcon: {
      paddingRight: theme.spacing.m,
    },
  });
};
