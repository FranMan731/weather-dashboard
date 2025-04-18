import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useStyles = () => {
  const theme = useTheme();
  
  const create = <T extends NamedStyles<T>>(styles: T): T => {
    return StyleSheet.create(styles);
  };
  
  return {
    create,
    theme,
  };
};