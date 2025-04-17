import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { config } from '@/constants/config';
import AuthFormContainer from './components/AuthFormContainer';
import AuthInput from './components/AuthInput';
import AuthPasswordInput from './components/AuthPasswordInput';
import AuthButton from './components/AuthButton';
import AuthErrorBanner from './components/AuthErrorBanner';
import { RootStackParamList } from '@/types/navigation';

const LoginScreen = () => {
  const [username, setUsername] = useState(config.testUser.email);
  const [password, setPassword] = useState(config.testUser.password);
  const { user, authSignIn, isLoading, error, clearError } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [user])
  
  const handleLogin = async () => {
    try {
      await authSignIn(username, password);
    } catch (err) {
      console.error('Login error', err);
      // Error handled by useAuth
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
      
      <AuthButton
        onPress={handleLogin}
        isLoading={isLoading}
        text="Sign In"
      />
    </AuthFormContainer>
  );
};

export default LoginScreen;