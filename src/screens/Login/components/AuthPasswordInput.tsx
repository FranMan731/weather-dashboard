import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/authStyles';
import { AuthPasswordInputProps } from '@/types/auth';


const AuthPasswordInput: React.FC<AuthPasswordInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  editable = true
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          editable={editable}
        />
        <Pressable onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <Ionicons 
            name={secureTextEntry ? 'eye-off' : 'eye'} 
            size={20} 
            color="#666" 
          />
        </Pressable>
      </View>
    </View>
  );
};

export default AuthPasswordInput;