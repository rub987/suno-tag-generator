const Header = ({ onRefresh }) => (
  <header className="border-b border-white/10 bg-brand-darker/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan
                        flex items-center justify-center text-lg shadow-lg shadow-brand-cyan/20">
          🎵
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-white tracking-tight">SUNO</span>
            <span className="text-lg font-black bg-gradient-to-r from-brand-cyan to-brand-blue
                             bg-clip-text text-transparent tracking-tight">TAG</span>
            <span className="text-xs font-bold text-white/40 ml-1">AI</span>
          </div>
          <p className="text-xs text-white/40 leading-none">
            by <span className="text-brand-cyan/70">REDSOYU AI</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
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
          🔄 Sync tags
        </button>
      </div>
    </div>
  </header>
);

export default Header;
