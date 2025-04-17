import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/authStyles';
import { AuthErrorBannerProps } from '@/types/auth';

const AuthErrorBanner: React.FC<AuthErrorBannerProps> = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error.message}</Text>
      <Pressable onPress={onDismiss} style={styles.errorDismissButton}>
        <Text style={styles.errorDismissText}>×</Text>
      </Pressable>
    </View>
  );
};

export default AuthErrorBanner;