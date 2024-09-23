import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="tw-p-4">
      <button onClick={() => setTheme('light')} className={`tw-mr-2 ${theme === 'light' ? 'tw-font-bold' : ''}`}>Light</button>
      <button onClick={() => setTheme('dark')} className={`tw-mr-2 ${theme === 'dark' ? 'tw-font-bold' : ''}`}>Dark</button>
      <button onClick={() => setTheme('system')} className={`tw-mr-2 ${theme === 'system' ? 'tw-font-bold' : ''}`}>System</button>
      <button onClick={() => setTheme('pink')} className={`tw-mr-2 ${theme === 'pink' ? 'tw-font-bold' : ''}`}>Pink</button>
      <button onClick={() => setTheme('purple')} className={`${theme === 'purple' ? 'tw-font-bold' : ''}`}>Purple</button>
    </div>
  );
};

export default ThemeSwitcher;