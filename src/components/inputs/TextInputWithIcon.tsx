import React from 'react';
import { View } from 'react-native';
import { TextInputBase } from './TextInputBase';
import { useTheme } from '@/theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useStyles } from '@/hooks/useStyles';

interface TextInputWithIconProps extends React.ComponentProps<typeof TextInputBase> {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconPosition?: 'left' | 'right';
}

export const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
  iconName,
  iconPosition = 'left',
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = useInputIconStyles();
  
  return (
    <View style={styles.container}>
      {iconPosition === 'left' && (
        <Ionicons
          name={iconName}
          size={20}
          color={theme.colors.textSecondary}
          style={styles.iconLeft}
        />
      )}
      
      <TextInputBase
        style={[
          styles.input,
          iconPosition === 'left' && styles.inputWithLeftIcon,
          iconPosition === 'right' && styles.inputWithRightIcon,
          style,
        ]}
        {...props}
      />
      
      {iconPosition === 'right' && (
        <Ionicons
          name={iconName}
          size={20}
          color={theme.colors.textSecondary}
          style={styles.iconRight}
        />
      )}
    </View>
  );
};

const useInputIconStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();
  
  return create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconLeft: {
      marginRight: theme.spacing.s,
    },
    iconRight: {
      marginLeft: theme.spacing.s,
    },
    input: {
      flex: 1,
    },
    inputWithLeftIcon: {
      paddingLeft: theme.spacing.m,
    },
    inputWithRightIcon: {
      paddingRight: theme.spacing.m,
    },
  });
};