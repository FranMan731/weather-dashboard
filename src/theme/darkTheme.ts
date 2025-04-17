export const darkTheme = {
    colors: {
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#f59e0b',
      
      // Background
      background: '#121212',
      surface: '#1e1e1e',
      surfaceVariant: '#252525',
      
      // Text
      text: '#f0f0f0',
      textSecondary: '#aaaaaa',
      textDisabled: '#666666',
      
      // States and feedbacks
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
      info: '#3b82f6',
      
      // UI Elements
      border: '#333333',
      divider: '#252525',
      overlay: 'rgba(0, 0, 0, 0.8)',
      
      // Buttons
      button: {
        primary: '#3b82f6',
        primaryText: '#ffffff',
        secondary: '#1e1e1e',
        secondaryText: '#f0f0f0',
        disabled: '#252525',
        disabledText: '#666666',
      },
      
      // Inputs
      input: {
        background: '#1e1e1e',
        text: '#f0f0f0',
        placeholder: '#999999',
        border: '#333333',
        borderFocused: '#3b82f6',
      },
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      xxl: 40,
    },
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
      xlarge: 16,
    },
    typography: {
      h1: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 40,
      },
      h2: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32,
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
      },
    },
  } as const;