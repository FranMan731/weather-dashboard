import React from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/contexts/StoreContext";
import { PrimaryButton } from "@/components/buttons";
import { FormContainer } from "@/components/views/FormContainer";
import { ErrorBanner } from "@/components/banners/ErrorBanner";
import { PasswordInput, TextInputStandard } from "@/components/inputs";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

const LoginScreen = observer(() => {
  const { authSignIn, isLoading, error, clearError } = useAuth();

  const {
    authStore,
  } = useStore();

  const theme = useTheme();

  const handleLogin = async () => {
    try {
      await authSignIn();
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <FormContainer title="Weather Dashboard">
      <ErrorBanner error={error} onDismiss={clearError} />

      <View style={{ marginBottom: 30 }}>
        <TextInputStandard
          label="Email"
          value={authStore.username}
          onChangeText={(text) => authStore.setUsername(text)}
          placeholder="Enter email"
          keyboardType="email-address"
          editable={!isLoading}
          style={{ paddingVertical: theme.spacing.m }}
        />

        <PasswordInput
          label="Password"
          value={authStore.password}
          onChangeText={(text) => authStore.setPassword(text)}
          placeholder="Enter password"
          editable={!isLoading}
        />
      </View>

      <PrimaryButton
        onPress={handleLogin}
        isLoading={isLoading}
        title="Sign In"
      />
    </FormContainer>
  );
});

export default LoginScreen;
