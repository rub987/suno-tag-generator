import { useLang } from '../../contexts/LangContext';

const LangToggle = () => {
  const { lang, toggleLang } = useLang();
  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 text-xs font-bold border border-white/10
                 hover:border-brand-cyan/30 px-3 py-1.5 rounded-full transition-colors"
      title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <span className={lang === 'fr' ? 'text-brand-cyan' : 'text-white/40'}>FR</span>
      <span className="text-white/80">|</span>
      <span className={lang === 'en' ? 'text-brand-cyan' : 'text-white/40'}>EN</span>
    </button>
  );
};

export default LangToggle;
