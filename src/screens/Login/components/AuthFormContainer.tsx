import React from 'react';
import { View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { styles } from '../styles/authStyles';
import { AuthFormContainerProps } from '@/types/auth';

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ children, title }) => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthFormContainer;