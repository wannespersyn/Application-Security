// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import OptionsOverview from '../component/optionsOverview';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const HomePage: React.FC = () => {
  const [name, setName] = useState<String | null>(null);
  const { t } = useTranslation();
  
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
            <h2 className='text-3xl'>{t("home.greeting")} {name}!</h2>
          </div>
          <h2 className='text-xl'>{t("home.title")}</h2>
          <p className='italic'>{t("home.info")}</p>
          <div className='grid subgrid-col-3 my-12 gap-8 mx-16'>
          <OptionsOverview />
        </div>
      </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};


export default HomePage;
