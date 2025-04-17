import { darkTheme } from '@/theme/darkTheme';

export type Theme = typeof darkTheme;
export type ThemeColors = keyof Theme['colors'];
export type ThemeSpacing = keyof Theme['spacing'];