import React from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/hooks/useAuth";
import { config } from "@/constants/config";
import AuthFormContainer from "./components/AuthFormContainer";
import AuthInput from "./components/AuthInput";
import AuthPasswordInput from "./components/AuthPasswordInput";
import AuthButton from "./components/AuthButton";
import AuthErrorBanner from "./components/AuthErrorBanner";
import { useStore } from "@/stores/storeContext";

const LoginScreen = observer(() => {
  const { authSignIn, isLoading, error, clearError } = useAuth();

  const {
    authStore: { username, password, setUsername, setPassword },
  } = useStore();

  const handleLogin = async () => {
    try {
      await authSignIn();
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <AuthFormContainer title="Weather Dashboard">
      <AuthErrorBanner error={error} onDismiss={clearError} />

      <AuthInput
        label="Email"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter email"
        keyboardType="email-address"
        editable={!isLoading}
      />

      <AuthPasswordInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        editable={!isLoading}
      />

      <AuthButton onPress={handleLogin} isLoading={isLoading} text="Sign In" />
    </AuthFormContainer>
  );
});

export default LoginScreen;
