import { initReactI18next } from 'react-i18next';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import i18n from 'i18next'
import { useState } from 'react';
import { LanguageProvider } from '@/component/languageProvider';

const resources = {
    nl: {
      translation: {
        'lights': 'Lichten',
        'system.management': 'Systeembeheer',
        'delete': 'Verwijderen',
        'user.overview': 'Gebruikersoverzicht',
        'info': 'Info',
        'add.light': 'Licht toevoegen',
        'add.scene': 'Scene toevoegen',
        'delete.light': 'Licht verwijderen',
        'delete.scene': 'Scene verwijderen'
      }
    },
    en: {
      translation: {
        'lights': 'Lights',
        'system.management': 'System Management',
        'delete': 'Delete',
        'user.overview': 'User Overview',
        'info': 'Info',
        'add.light': 'Add light',
        'add.scene': 'Add scene',
        'delete.light': 'Delete light',
        'delete.scene': 'Delete scene'
      }
    },
    de: {
      translation: {
        'lights': 'Lichter',
        'system.management': 'Systemverwaltung',
        'delete': 'Löschen',
        'user.overview': 'Benutzerübersicht',
        'info': 'Info',
        'add.light': 'Licht hinzufügen',
        'add.scene': 'Szene hinzufügen',
        'delete.light': 'Licht löschen',
        'delete.scene': 'Szene löschen'
      }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'nl',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default function App({ Component, pageProps }: AppProps) {
    return (
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    )
  
}
