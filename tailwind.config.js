/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2e3192',

        // Dark Theme
        'dark-50': '#131B2E',
        'dark-100': '#2B3037',
        'dark-200': '#141C26',
        'dark-300': '#15202F',
        'dark-400': '#1E293B',
        'dark-500': '#293548',
        'dark-border': '#1d2d40',
        'dark-text': '#00000',
        
        // Light Theme
        'light-50': '#f7f9fc',
        'light-100': '#edf0f5',
        'light-200': '#e1e5ec',
        'light-300': '#d7dce3',
        'light-400': '#cfd3da',
        'light-500': '#ffffff',
        'light-border': '#aeb8c0',
        'light-text': '#ffffff',

        // Pink Theme
        'pink-bg': '#ffe0e9',
        'pink-100': '#ffccd6',
        'pink-200': '#ffb3bf',
        'pink-300': '#ff99a6',
        'pink-400': '#ff7382',
        'pink-500': '#ff4c5e',
        'pink-text': '#912d3f',

        // Purple Theme
        'purple-bg': '#f3e8fd',
        'purple-100': '#e0c1fc',
        'purple-200': '#ce9bfb',
        'purple-300': '#b75df9',
        'purple-400': '#9f00f7',
        'purple-500': '#8500c4',
        'purple-text': '#4c006e',

        // Additional Accent Colors
        'light-green': "#c8f4e0",
        'dark-green': '#0a3d31',
        'darker-green': '#0c523e',
        'light-red': '#fde2e2',
        'dark-red': '#710909',
        'darker-red': '#470505',
        'dark-gray': '#a5a5a5',
        orange: '#e67e22',
      },
    },
  },
  plugins: [],
  prefix: 'tw-',
  darkMode: 'class', // Use class-based dark mode
};