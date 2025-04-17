import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../styles/authStyles';
import { AuthInputProps } from '@/types/auth';

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  editable = true,
  autoCapitalize = 'none'
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={editable}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default AuthInput;