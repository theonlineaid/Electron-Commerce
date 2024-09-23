import React from 'react';
import { IoSunny } from "react-icons/io5";
import { GiMoonBats } from "react-icons/gi";
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useTheme } from '../../context/ThemeContext';

const MoodWithIconSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="tw-p-4 tw-flex tw-items-center">
      <button
        onClick={() => setTheme('light')}
        className={`tw-mr-2 tw-flex tw-items-center tw-transition ${theme === 'light' ? 'tw-text-yellow-500 tw-font-bold' : 'tw-text-gray-500'}`}
      >
        <IoSunny  />
        <span className="tw-ml-1">Light</span>
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`tw-flex tw-items-center tw-transition ${theme === 'dark' ? 'tw-text-indigo-500 tw-font-bold' : 'tw-text-gray-500'}`}
      >
        <GiMoonBats />
        <span className="tw-ml-1">Dark</span>
      </button>


      <div className="tw-p-4 tw-flex tw-items-center">
      <button
        onClick={toggleTheme}
        className="tw-flex tw-items-center tw-transition"
      >
        {theme === 'light' ? (
          <MoonIcon className="tw-h-6 tw-w-6 tw-text-indigo-500" />
        ) : (
          <SunIcon className="tw-h-6 tw-w-6 tw-text-yellow-500" />
        )}
        <span className="tw-ml-1 tw-font-bold">
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      </button>
    </div>

    </div>
  );
};

export default MoodWithIconSwitch;