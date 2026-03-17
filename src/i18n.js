import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import kyTranslation from './locales/ky/translation.json';
import ruTranslation from './locales/ru/translation.json';
import trTranslation from './locales/tr/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ky: {
    translation: kyTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  tr: {
    translation: trTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
