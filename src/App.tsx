// src/App.tsx
import React from 'react';
import Header from './components/Header'; // Import the new Header component
import Footer from './components/Footer'; // Import the new Footer component
import { useTheme } from './context/ThemeContext';
import MoodWithIconSwitch from './components/theme/MoodWithIconSwitcher';
import ThemeSwitcher from './components/theme/ThemeSwitcher';

const App = () => {
  const { theme } = useTheme();

  const themeClass = {
    light: 'tw-bg-light-50 tw-text-black',
    dark: 'tw-bg-dark-500 tw-text-white',
    pink: 'tw-bg-pink-bg tw-text-pink-text',
    purple: 'tw-bg-purple-bg tw-text-purple-text',
    system: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'tw-bg-dark-500 tw-text-white' : 'tw-bg-light-50 tw-text-light-500'
  }[theme] || 'tw-bg-light-50 tw-text-light-500'; // Default to light theme

  return (
    <div className={` ${themeClass}`}>
      <MoodWithIconSwitch />
      <ThemeSwitcher />
      <Header />
      <main>
        <h2>💖 This is the main content!</h2>
        <p>Electron and React are now working together!</p>
      </main>

      <h1 className="tw-text-3xl tw-font-bold tw-underline">
        Hello world!
      </h1>
      <Footer />
    </div>
  );
};

export default App;

