import LangToggle from './LangToggle';
import { useLang } from '../../contexts/LangContext';

const Header = ({ onRefresh }) => {
  const { t } = useLang();
  return (
    <header className="border-b border-white/10 bg-brand-darker/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <img
          src="/logo.svg"
          alt="REDSOYU AI"
          className="h-9 w-auto"
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="https://ai.redsoyu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-white transition-colors
                       border border-white/10 hover:border-white/30
                       px-3 py-1.5 rounded-full"
          >
            redsoyu.com ↗
          </a>
          <button
            onClick={onRefresh}
            className="text-xs text-white/50 hover:text-brand-cyan transition-colors
                       border border-white/10 hover:border-brand-cyan/30
                       px-3 py-1.5 rounded-full"
          >
            {t('header.sync')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
