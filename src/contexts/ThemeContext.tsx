import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme } from '@/types';

interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextState | null>(null);

export const useTheme = (): ThemeContextState => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('sir-sarcasm-theme');
    if (stored === 'dark' || stored === 'light') return stored as Theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('sir-sarcasm-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
