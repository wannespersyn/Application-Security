// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import OptionsOverview from '../component/optionsOverview';

const HomePage: React.FC = () => {
  const [name, setName] = useState<String | null>(null);
  
  useEffect(() => {
    const sessionDataString = sessionStorage.getItem('loggedInUser');
    if (!sessionDataString) {
      return;
    }
    const loginData = JSON.parse(sessionDataString);
    setName(loginData.token.name);
  }, []);


  return (
    <>
      <Header />
      <main className='grid grid-cols-5 my-5'>
        <section className='col-start-2 col-span-3 text-center bg-gray-200 py-8'>
          <div>
            <h2 className='text-3xl'>Hey {name}!</h2>
          </div>
          <h2 className='text-xl'>Welcome to the Home control app.</h2>
          <p className='italic'>In this app you can conrol the lights and scenes in your home.</p>
          <div className='grid subgrid-col-3 my-12 gap-8 mx-16'>
          <OptionsOverview />
        </div>
      </section>
      </main>
    </>
  );
};

export default HomePage;
