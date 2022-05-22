import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translation/en';
import vi from './translation/vi';

// the translations
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
export default i18n;
