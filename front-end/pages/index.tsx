import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import OptionsOverview from '../component/optionsOverview';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DOMPurify from 'dompurify';

const HomePage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const { t } = useTranslation();
  
  useEffect(() => {
    const sessionDataString = sessionStorage.getItem('loggedInUser');
    setName(DOMPurify.sanitize(name));

    if (!sessionDataString) {
      return;
    }
    const loginData = JSON.parse(sessionDataString);
    setName(loginData.token.name);
  }, []);


  return (
      <>
          <Header />
          <main className="min-h-screen bg-gray-200">
              <section className="text-center ">
                  <h1 className="text-5xl pt-12 font-bold">{t(("home.title"), { name: name })}!</h1>
                  <OptionsOverview />
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
