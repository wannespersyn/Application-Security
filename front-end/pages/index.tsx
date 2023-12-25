// pages/index.tsx

import React from 'react';
import Header from '../component/header';

const HomePage: React.FC = () => {
  return (
    <>
      <Header></Header>
      <div>
        <h1>Welcome to My App</h1>
      </div>
    </>
  );
};

export default HomePage;
