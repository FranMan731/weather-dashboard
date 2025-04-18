import { useStore } from '@/contexts/StoreContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const { authStore } = useStore();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (authStore.user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [authStore.user, navigation]);

  return {
    user: authStore.user,
    authSignIn: authStore.signIn,
    authSignOut: authStore.signOut,
    isLoading: authStore.isLoading,
    error: authStore.error,
    clearError: authStore.clearError,
  };
};