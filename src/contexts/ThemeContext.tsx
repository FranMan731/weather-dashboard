import React, { createContext, useContext } from 'react';
import { darkTheme } from '@/theme/darkTheme';

type Theme = typeof darkTheme;

const ThemeContext = createContext<Theme>(darkTheme);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={darkTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};