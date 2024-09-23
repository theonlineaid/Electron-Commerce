import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system' | 'pink' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) return savedTheme;

  const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
  return userMedia.matches ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.remove('tw-light', 'tw-dark', 'tw-pink', 'tw-purple');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'tw-dark' : 'tw-light';
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.add(`tw-${theme}`);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};