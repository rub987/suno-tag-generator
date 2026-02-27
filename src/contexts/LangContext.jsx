import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('suno_lang') || 'fr'
  );

  const toggleLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('suno_lang', next);
    setLang(next);
  };

  const t = (key, params) => {
    let str = translations[lang]?.[key] ?? translations.fr?.[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, v);
      });
    }
    return str;
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
