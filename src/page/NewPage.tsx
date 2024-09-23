// src/NewPage.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const NewPage = () => {
  return (
    <div>
       <Helmet>
        <title>New page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h1 className='tw-text-black'>This is a new popup window!</h1>
      <p className='tw-text-black'>Here you can add any content you want.</p>
    </div>
  );
};

export default NewPage;
