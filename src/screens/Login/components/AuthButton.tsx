import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { styles } from '../styles/authStyles';
import { AuthButtonProps } from '@/types/auth';

const AuthButton: React.FC<AuthButtonProps> = ({ onPress, isLoading = false, text }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.loginButton,
        pressed && styles.loginButtonPressed,
        isLoading && styles.loginButtonDisabled
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.loginButtonText}>{text}</Text>
      )}
    </Pressable>
  );
};

export default AuthButton;