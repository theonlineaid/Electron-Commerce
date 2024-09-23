// src/App.tsx
import React from 'react';
import Header from './components/Header'; // Import the new Header component
import Footer from './components/Footer'; // Import the new Footer component

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>💖 This is the main content!</h2>
        <p>Electron and React are now working together!</p>
      </main>

      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Footer />
    </div>
  );
};

export default App;
