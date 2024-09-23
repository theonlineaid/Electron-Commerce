import React from 'react';
import Header from './components/Header'; 
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';
import ProductList from './components/ProductList';
// const { ipcRenderer } = window.require('electron');

const App = () => {
  const { theme } = useTheme();

  const themeClass = {
    light: 'tw-bg-light-50 tw-text-black',
    dark: 'tw-bg-dark-500 tw-text-white',
    pink: 'tw-bg-pink-bg tw-text-pink-text',
    purple: 'tw-bg-purple-bg tw-text-purple-text',
    system: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'tw-bg-dark-500 tw-text-white' : 'tw-bg-light-50 tw-text-light-500'
  }[theme] || 'tw-bg-light-50 tw-text-light-500'; // Default to light theme

  // Function to open a new window with the 'new' route
  // const openNewWindow = (route: 'new' | 'settings') => {
  //   ipcRenderer.send('open-new-window', route); // Pass the route as a second argument
  // };

  return (
    <div className={` ${themeClass}`}>
      <Header />
      <main>


      <ProductList />
        {/* <h2>💖 This is the main content!</h2>
        <p>Electron and React are now working together!</p>

 
        <button onClick={() => openNewWindow('new')} className="tw-bg-blue-500 tw-text-white tw-p-2 tw-rounded">
          Open New Window
        </button>

  
        <button onClick={() => openNewWindow('settings')} className="tw-bg-green-500 tw-text-white tw-p-2 tw-rounded tw-ml-2">
          Open Settings Window
        </button> */}
      </main>

      {/* <h1 className="tw-text-3xl tw-font-bold tw-underline">
        Hello world!
      </h1> */}
      <Footer />
    </div>
  );
};

export default App;
